// 日历事件
export const calendarColumns = [
  {
    title: 'NO.',
    dataIndex: 'NO',
    align:'center',
    width:80
  },
  {
    title: '事件描述',
    dataIndex: 'eventDescription',
  },
  {
    title: '周期规则',
    dataIndex: 'period',
    slotName:'period'
  },
  {
    title: '可见角色',
    dataIndex: 'visibleRole',
  },
  {
    title: '关联部门',
    dataIndex: 'relationDept',
  },
  {
    title: '定义人',
    dataIndex: 'createOperator',
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    slotName: 'action',
    align:'center',
    fixed: 'right',
  }
]