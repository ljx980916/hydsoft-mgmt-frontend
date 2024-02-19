import { defineStore } from 'pinia'
import { login, userInfo,logout,} from '@/api/login'
import { menuSideBar } from '@/api/menu'
import { tagColumnList } from '@/api/drillAnalyze'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export const useUserInfoStore = defineStore('userInfo',{
    state : ()=>{
        return {
            info : {}
        }
    },
    getters : {
        getUserInfo(state){
            return state.info
        },
        getRoles(state){
            return state.roles
        }
    },
    actions : {
        async Login(values){
            try {
                let loginRes = await login(values)
                if (loginRes.code === '000000000000') {
                    storage.set(ACCESS_TOKEN, loginRes.data.token, 7 * 24 * 60 * 60 * 1000);
                    return Promise.resolve(loginRes)
                }else {
                    return Promise.reject(loginRes.message)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async userInfo(){
            try {
                let userInfoRes = await userInfo()
                if(userInfoRes.code === '000000000000'){
                    this.info = userInfoRes.data
                    return Promise.resolve(userInfoRes)
                }else {
                    return Promise.reject(userInfoRes.message)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async Logout(){
            try {
                let logoutRes = await logout()
                if(logoutRes.code === '000000000000'){
                    storage.remove(ACCESS_TOKEN)
                    //退出时所需要清除的缓存数据
                    const logoutCache = [useUserInfoStore,useMenuStore,useBreadListStore]
                    logoutCache.forEach(fn=>{
                        fn().$reset()
                    })
                    return Promise.resolve(logoutRes)
                }else {
                    return Promise.reject(logoutRes.message)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
})

export const useBreadListStore = defineStore('breadList',{
    state : ()=>{
        return {
            breadList : [ 
               { name: '系统设置'},
               { name: '菜单管理'}
             ]
        }
    },
    actions: {
        setBreadList( breadList ){
            this.breadList = breadList
        },
    },
    persist: {
        enabled: true, // 开启数据缓存 +++++++
    }
})

export const useMenuStore = defineStore('menu',{
    state : ()=>{
        return {
            menuList : [],
            permissions : []
         
        }
    },
    getters : {
        getMenuList(state){
            return state.menuList
        },
        getPermission(state){
            return state.permissions
        }
    },
    actions : {
        async menuSideBar(){
            try {
                let menuListRes = await menuSideBar()
                if(menuListRes.code === '000000000000'){
                    this.menuList = menuListRes.data.menuList
                    this.permissions = menuListRes.data.permissions
                    return Promise.resolve(menuListRes)
                }else {
                    return Promise.reject(menuListRes.message)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        }
            
    }
})

export const useTagColumnListStore = defineStore('tagColumnList',{
    state : ()=>{
        return {
            tagColumnList : []
        }
    },
    getters : {
        getTagColumnList(state){
            return state.tagColumnList
        }
    },
    actions : {
        async tagColumnListBar(){
            try {
                let tagColumnListRes = await tagColumnList()
                if(tagColumnListRes.code === '200'){
                    this.tagColumnList = tagColumnListRes.data
                    return Promise.resolve(tagColumnListRes.data)
                }else {
                    return Promise.reject(tagColumnListRes.message)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
})