import request from '@/utils/request'
// 环状图 
export function getPieChartData (parameter) {
    return request({
        url: '/mdm/listPieChartStatistics',
        method: 'post',
        data: parameter
    })
}
// 事业部
export function getCauseGroup (parameter) {
  return request({
      url: '/mdm/listCauseGroupStatistics',
      method: 'post',
      data: parameter
  })
}
// 柱状折线图 
export function getPostChartData (parameter) {
  return request({
      url: '/mdm/listHistogramStatistics',
      method: 'post',
      data: parameter
  })
}
// 明细
export function getDetailData (parameter) {
  return request({
      url: '/mdm/listStatisticsDetail',
      method: 'post',
      data: parameter
  })
}