import request from '@/utils/request'

export function empInfo (parameter) {
    return request({
        url: '/empInfo',
        method: 'get',
        params: parameter
    })
}

export function exportExcel (parameter) {
    return request({
        url: '/empInfo/exportExcel',
        method: 'get',
        params: parameter,
        responseType : 'blob'
    })
}