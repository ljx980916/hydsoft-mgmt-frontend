import request from '@/utils/request'

export function getLineChart(parameter) {
    return request({
        url: '/analysis/getLineChart',
        method: 'post',
        data:parameter,
    })
}
