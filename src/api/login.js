import request from '@/utils/request'

const userApi = {
    Login: '/login',
    Logout: '/sys/logout',
    UserInfo: '/system/user/getCurrentUserInfo',
    UpdatePassword: '/employee/resetPssword',
    tokenByCode : '/sys/getTokenByCode',
}

export function login (parameter) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}
export function logout () {
    return request({
        url: userApi.Logout,
        method: 'get',
        //baseURL: '/mgmt'
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8'
        // }
    })
}

export function userInfo () {
    return request({
        url: userApi.UserInfo,
        method: 'get'
    })
}

export function password (parameter) {
    return request({
        url: userApi.UpdatePassword,
        method: 'post',
        data: parameter
    })
}
export function workingCalendar(parameter) {
  return request({
    url: '/calendarEvent/workingCalendar',
    method: 'get',
    params: parameter
})
}

export function getTokenByCode(parameter){
    return request({
        url: userApi.tokenByCode,
        method: 'post',
        headers : {
            'Content-Type': 'multipart/form-data',
        },
        data: parameter,
    })
  }