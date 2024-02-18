import request from '@/utils/request'

export function userList (parameter) {
    return request({
        url: '/system/user',
        method: 'get',
        params: parameter
    })
}

export function userDetail (parameter) {
    return request({
        url: '/system/user/' + parameter.id,
        method: 'get'
    })
}

export function saveUser (parameter) {
    return request({
        url: '/system/user/save',
        method: 'post',
        data: parameter
    })
}

export function userModalList (parameter) {
    return request({
        url: '/system/role',
        method: 'get',
        params: parameter
    })
}

export function deleteUser(parameter) {
    return request({
        url: '/system/user/delete',
        method: 'delete',
        params: parameter
    })
}

export function getUserList(parameter) {
  return request({
      url: '/system/user/userListPage',
      method: 'get',
      params: parameter
  })
}

export function updateFlag(parameter) {
  return request({
      url: '/system/user/updateFlag',
      method: 'get',
      params: parameter
  })
}

export function searchEmployee(parameter) {
  return request({
      url: '/mdm/searchEmployee',
      method: 'post',
      data: parameter
  })
}

export function listShowTabRole (parameter) {
    return request({
        url: '/system/role/listShowTabRole',
        method: 'post',
        data: parameter
    })
}

//获取员工姓名和工号
export function getNameCodeList (parameter) {
    return request({
        url: '/system/user/getEmpByNameOrCode',
        method: 'get',
        params: parameter
    })
}