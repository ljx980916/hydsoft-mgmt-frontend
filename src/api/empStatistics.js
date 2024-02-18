import request from '@/utils/request'

export function exportEmpExcel(parameter) {
    return request({
        url: '/empStatistics/exportEmpExcel',
        method: 'get',
        params:parameter,
        responseType : 'blob'
    })
}

export function queryDeptCostDetail (parameter) {
    return request({
        url: '/empStatistics/queryDeptCostDetail',
        method: 'get',
        params: parameter
    })
}
export function queryDeptsCostData (parameter) {
    return request({
        url: '/empStatistics/queryDeptsCostData',
        method: 'get',
        params: parameter
    })
}
