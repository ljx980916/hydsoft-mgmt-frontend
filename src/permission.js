import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import { LOGIN_TOKEN } from '@/store/mutation-types'
import { useUserInfoStore,useMenuStore,useTagColumnListStore } from './store/index'
import { Message } from "@arco-design/web-vue";
import { getURLParams, goLogin } from '@/utils/getToken'
import { getTokenByCode } from "@/api/login";
import { addSSOEncrypt,getCookie,saveTokenCookie,clearCookie } from '@/utils/util.js'
import { LOGIN_PATH } from '@/store/mutation-types.js'
import { userInfo} from '@/api/login'
let isDev = !LOGIN_PATH.split('//')[1].startsWith('test')
let paramsCode = getURLParams().code;

let isInCodeFn = true
// 递归取出当前账号下所有菜单的url，路由跳转做校验，防止手动敲url跳转到没有权限的页面。
let menuListArr = new Set()
menuListArr.clear()
router.options.routes[1].children.forEach(item => {
  if (item.meta?.hidden) {
    menuListArr.add(item.path)
  }
})
function flatMenu(arr){
    Array.isArray(arr) && arr.forEach(item=>{
        menuListArr.add(item.url)
        if(item.children && item.children.length){
            flatMenu(item.children)
        }
    })
}
menuListArr.add('/')

function logoutFn(){
    const userStore = useUserInfoStore()
    userStore.Logout().then(res=>{
        clearCookie(LOGIN_TOKEN)
        setTimeout(() => {
            goLogin();
        }, 60);
    }).catch(()=>{
        clearCookie(LOGIN_TOKEN)
        setTimeout(() => {
            goLogin();
        }, 60);
    })
}   
let result
async function loginAfterData(){
const menuStore = useMenuStore()
const tagColumnListStore = useTagColumnListStore()
    try {
        let resArr =  await Promise.all([menuStore.menuSideBar(),tagColumnListStore.tagColumnListBar()])
        result = Promise.resolve(resArr)
        flatMenu(resArr[0].data.menuList)
    } catch (error) {
        result = Promise.reject(error)
    }
    return result
}

NProgress.configure({ showSpinner: false })
const loginRoutePath = '/login'
const defaultRoutePath = '/'
router.beforeEach((to,from,next)=>{
    NProgress.start()
    if(getCookie(LOGIN_TOKEN)){
        if(to.path == '/pageError'){
            next()
        }else if (to.path === loginRoutePath) {
            next({ path: defaultRoutePath })
            NProgress.done()
        }else {
            const userStore = useUserInfoStore();
            let Info = userStore.getUserInfo;
            if (Info.roles === undefined) {
                userInfo().then(res=>{
                    if(res.code == "000000000000"){
                        userStore.info = res.data;
                        loginAfterData().then(()=>{
                            next()
                            NProgress.done();
                        }).catch(()=>{
                            Message.error('数据加载失败');
                        })
                    }else{
                        Message.error(res.message);
                        next({ path: '/pageError'});
                    }
                }).catch(err=>{
                    Message.error(err)
                })
            }else {
               if(menuListArr.has(to.path)){
                    next()
                }else {
                    next({ path: defaultRoutePath})
                }
                NProgress.done()
            }
        }
    }else if(paramsCode && isInCodeFn){
        let formData = new FormData();
        formData.append("code", paramsCode);
        getTokenByCode(formData).then(res => {
            if (res.code === "000000000000") {
                let { accessToken,loginInfo } = res.data;
                saveTokenCookie(accessToken)
                loginInfo && addSSOEncrypt(isDev?'development':'test',loginInfo)
                isInCodeFn = false
                const userStore = useUserInfoStore();
                let Info = userStore.getUserInfo;
                if (Info.roles === undefined) {
                    userInfo().then(res=>{
                        if(res.code == "000000000000"){
                            userStore.info = res.data;
                            loginAfterData().then(()=>{
                                if(menuListArr.has(to.path)){
                                    next()
                                }else {
                                    next({ path: defaultRoutePath})
                                }
                                NProgress.done();
                            }).catch(()=>{
                                Message.error('数据加载失败');
                            })
                        }else{
                            Message.error(res.message);
                            next({ path: '/pageError'});
                        }
                    }).catch(err=>{
                        Message.error(err)
                    })
                }else {
                    if(menuListArr.has(to.path)){
                        next()
                    }else {
                        next({ path: defaultRoutePath})
                    }
                    NProgress.done()
                }
            }  else {
                Message.error(res.message)
                logoutFn()
            }
        });
    }else{
        //没有token跳统一登录页
        logoutFn()
    }
})

router.afterEach(() => {
    NProgress.done()
})
