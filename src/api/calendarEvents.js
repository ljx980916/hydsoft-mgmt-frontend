import request from '@/utils/request'
// 获取列表数据
export function postCalendarEventList () {
    return request({
      url: '/calendarEvent/fetchList',
      method: 'get',
    })
}
// 获取可见角色
export function postSelectRoleList () {
  return request({
    url: '/system/role/selectRole',
    method: 'post',
  })
}
// 获取关联部门
export function getSelectDeptList () {
  return request({
    url: '/calendarEvent/getDeptTree',
    method: 'get',
  })
}
// 新建日历事件
export function postAddInsertEvent (parameter) {
  return request({
    url: '/calendarEvent/insertEvent',
    method: 'post',
    data:parameter
  })
}
// 编辑日历事件
export function postUpdateInsertEvent (parameter) {
  return request({
    url: '/calendarEvent/editEvent',
    method: 'post',
    data:parameter
  })
}
// 删除日历事件
export function deleteInsertEvent (parameter) {
  return request({
    url: '/calendarEvent/deleteEvent',
    method: 'delete',
    params: parameter
  })
}