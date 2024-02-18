import request from '@/utils/request'

export function queryYoyAnalysisDept(parameter) {
    return request({
        url: '/yoyAnalysis/queryYoyAnalysisDept',
        method: 'post',
        data: parameter
    })
}

export function queryYoyAnalysisChart(parameter) {
    return request({
        url: '/yoyAnalysis/queryYoyAnalysisChart',
        method: 'post',
        data: parameter
    })
}

//部门维度环比分析看图
export function getDeptEcharts(parameter) {
    return request({
        url: '/LinkAnalysis/getDeptEcharts',
        method: 'post',
        data: parameter
    })
}

//客户维度环比分析看图
export function getCustomerEcharts(parameter) {
    return request({
        url: '/LinkAnalysis/getCustomerEcharts',
        method: 'post',
        data: parameter
    })
}

//项目维度环比分析看图
export function getProjectEchartsUsingPOST(parameter) {
    return request({
        url: '/LinkAnalysis/getProjectEcharts',
        method: 'post',
        data: parameter
    })
}
// 同比分析客户维度看图
export function queryCustomerYoyAnalysisChart(parameter) {
    return request({
        url: '/yoyAnalysis/queryCustomerYoyAnalysisChart',
        method: 'post',
        data: parameter
    })
}
// 同比分析项目维度看图
export function getProjectEcharts(parameter) {
    return request({
        url: '/yoyAnalysis/getProjectEcharts',
        method: 'post',
        data: parameter
    })
}

//查询客户
export function getCustomer(parameter) {
    return request({
        url: '/LinkAnalysis/getCustomer',
        method: 'post',
        data: parameter
    })
}

//查询项目
export function getProject(parameter) {
    return request({
        url: '/LinkAnalysis/getProject',
        method: 'post',
        data: parameter
    })
}
