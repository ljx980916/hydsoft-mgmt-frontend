import request from '@/utils/request'

export function queryCoreData (parameter) {
    return request({
        url: '/analysis/queryCoreData',
        method: 'get',
        params: parameter
    })
}

export function queryDownDrillSecond (parameter) {
    return request({
        url: '/analysis/queryDownDrillSecond',
        method: 'get',
        params: parameter
    })
}

export function queryDownDrillThird (parameter) {
    return request({
        url: '/analysis/queryDownDrillThird',
        method: 'get',
        params: parameter
    })
}

export function tagColumnList (parameter) {
    return request({
        url: '/columnConf/tagColumnList',
        method: 'get',
        params: parameter
    })
}

export function countWorkdaysByMonth (parameter) {
    return request({
        url: '/calendarEvent/countWorkdaysByMonth',
        method: 'get',
        params: parameter
    })
}
// 获取散点图数据
export function queryScatterDiagram (parameter) {
  return request({
      url: '/analysis/queryScatterDiagram',
      method: 'get',
      params: parameter
  })
}
/*******************项目、人员、角色关系相关接口 ***************/
export function listByProjectNo (parameter) {
    return request({
        url: '/projectEmpRole/ListByProjectNo',
        method: 'get',
        params: parameter
    })
}

export function queryLikeDept (parameter) {
    return request({
        url: '/projectEmpRole/queryLikeDept',
        method: 'get',
        params: parameter
    })
}

export function save (parameter) {
    return request({
        url: '/projectEmpRole/save',
        method: 'post',
        data: parameter
    })
}
/*******************项目、人员、角色关系相关接口 ***************/

/********************* 导出相关接口*************************** */

export function empExportExcel (parameter) {
    return request({
        url: '/analysis/empExportExcel',
        method: 'get',
        params: parameter,
        responseType: 'blob'
    })
}

export function bgExportExcel (parameter) {
    return request({
        url: '/analysis/bgExportExcel',
        method: 'get',
        params: parameter,
        responseType: 'blob'
    })
}

export function cuPoExportExcel (parameter) {
    return request({
        url: '/analysis/cuPoExportExcel',
        method: 'get',
        params: parameter,
        responseType: 'blob'
    })
}

export function downAllExcel (parameter) {
    return request({
        url: '/analysis/downAllExcel',
        method: 'get',
        params: parameter,
        responseType: 'blob',
        timeout : 1000*60*5
    })
}

/********************* 导出相关接口*************************** */