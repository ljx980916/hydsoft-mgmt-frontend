import request from '@/utils/request'
export function querytDeptConfigData (parameter) {
    return request({
        url: '/tDeptConfig/list',
        method: 'get',
        params: parameter
    })
}
export function updateConfig(parameter) {
  return request({
    url: '/tDeptConfig/update',
    method: 'post',
    data:parameter
  })
}
