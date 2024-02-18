// 用户管理表头
export const userListColumns = [
  {
    title: '工号',
    dataIndex: 'workNo',
  }, 
  {
    title: '姓名',
    dataIndex: 'name',
    slotName : 'name',
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  }, 
  {
    title: '账户状态',
    dataIndex: 'flag',
    slotName:'flag_view',
        
  },
  {
    title: '操作',
    dataIndex: 'action',
    slotName : 'action',
  }
];
// 菜单管理表头
export const menuListColumns= [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      slotName : 'type_view'
    },
    {
      title: '排序号',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '授权标识',
      dataIndex: 'perms',
      key: 'perms',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',

      slotName : 'action'
    }
  ]
// 角色管理表头
export const roleListColumns = [
    {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        
      },
      {
        title: '角色编码',
        dataIndex: 'code',
        
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width : 200
      },
      {
        title: '操作',
        dataIndex: 'action',
        slotName : 'action'
      }
]