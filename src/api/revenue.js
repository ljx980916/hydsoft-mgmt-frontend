import request from '@/utils/requestMock';
//折叠表格
export function revenueList (parameter) {
  return request({
      url: '/list',
      method: 'get',
      params: parameter
  })
}
// 收入---营业收入
export function getRevenueList (parameter) {
  return request({
      url: '/revenueList',
      method: 'get',
      params: parameter
  })
}
//收入---外币
export function getForeignCurrency (parameter) {
  return request({
      url: '/foreignCurrency',
      method: 'get',
      params: parameter
  })
}

