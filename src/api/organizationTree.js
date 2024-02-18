import request from '@/utils/request'

export function getDeptTree (parameter) {
    return request({
        url: '/calendarEvent/getDeptTree',
        method: 'get',
        params: parameter
    })
}