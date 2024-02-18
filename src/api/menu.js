import request from '@/utils/request'

export function list () {
    return request({
        url: '/system/menu/list',
        method: 'get'
    })
}

export function addList (parameter) {
    return request({
        url: '/system/menu/save',
        method: 'post',
        data: parameter
    })
}

export function editMenu (parameter) {
    return request({
        url: '/system/menu/update',
        method: 'put',
        data: parameter
    })
}

export function delMenu (parameter) {
    return request({
        url: '/system/menu/delete?id=' +  parameter.id,
        method: 'delete'
    })
}

export function menuSideBar () {
    return request({
        url: '/system/menu/getMenuByUserId',
        method: 'get'
    })
}

export function getDetailList(parameter) {
    return request({
        url: '/passwordPolicy/selectInfo',
        method: 'post',
        data: parameter
    })
}