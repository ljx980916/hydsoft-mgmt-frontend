//统一登录逻辑
import storage from 'store'
import { ACCESS_TOKEN,LOGIN_PATH } from '@/store/mutation-types'

if(!storage.get(ACCESS_TOKEN)){
    if(getURLParams().token === undefined){
        let a = document.createElement('a')
        a.href = LOGIN_PATH
        a.click()
      }else {
        let token = getURLParams().token
        storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000);
      }
}else {
    // 根据token获取用户信息、菜单信息
}