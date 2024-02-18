import request from '@/utils/request'

export function roleList (parameter) {
    return request({
        url: '/system/role/list?code=' + parameter.code + '&pageNum=' + parameter.pageNum + '&pageSize=' + parameter.pageSize,
        method: 'get'
    })
}

export function addRole (parameter) {
    return request({
        url: '/system/role/save',
        method: 'post',
        data: parameter
    })
}

export function editRole (parameter) {
    return request({
        url: '/system/role/update',
        method: 'put',
        data: parameter
    })
}

export function delRole (parameter) {
    return request({
        url: '/system/role/delete?roleId=' + parameter.id,
        method: 'delete'
    })
}

export function roleInfo (parameter) {
    return request({
        url: '/system/role/info?roleId=' + parameter.id,
        method: 'get'
    })
}