import request from '@/utils/request'
// 环比分析部门级别查询接口
export function getDepartmentRingList (parameter) {
    return request({
        url: '/LinkAnalysis/queryLinkAnalysisList',
        method: 'post',
        data: parameter,
        timeout : 1000 * 60 * 3
    })
}
// 环比分析客户级别查询接口
export function getCustomerRingList (parameter) {
  return request({
      url: '/LinkAnalysis/getCustomerLink',
      method: 'post',
      data: parameter,
      timeout : 1000 * 60 * 3
  })
}
// 环比分析项目级别查询接口
export function getProjectRingList (parameter) {
  return request({
      url: '/LinkAnalysis/getProjectLink',
      method: 'post',
      data: parameter,
      timeout : 1000 * 60 * 3
  })
}

export function queryYoyAnalysis (parameter) {
  return request({
      url: '/yoyAnalysis/queryYoyAnalysis',
      method: 'post',
      data: parameter,
      timeout : 1000 * 60 * 3
  })
}
//客户环同同比分析项集团客户维度查询接口
export function getCustomerYoyAnalysis (parameter) {
  return request({
      url: '/yoyAnalysis/getCustomerYoyAnalysis',
      method: 'post',
      data: parameter,
      timeout : 1000 * 60 * 3
  })
}
//客户环同同比分析项目维度查询接口
export function getProjectYoyAnalysis (parameter) {
  return request({
      url: '/yoyAnalysis/getProjectYoyAnalysis',
      method: 'post',
      data: parameter,
      timeout : 1000 * 60 * 3
  })
}