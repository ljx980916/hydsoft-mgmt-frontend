export const staffDetailList = [
  {
   
    title: '部门名称',
    dataIndex: 'deptName',
    width: 158,
    slotName:'deptName'
  },
  {
    title: () => {
      return (
        <div>
          <p>部门<br/>负责人</p>
        </div>
      )
    },
    dataIndex: 'deptLeaderName',
    align: 'center',
    width:74
  },
  {
    title: () => {
      return (
        <div>
          <p>在职人员<br/>总数</p>
        </div>
      )
    },
    dataIndex: 'total',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:90
  },
  {
    title: () => {
      return (
        <div>
          <p>在职<br/>C1人数</p>
        </div>
      )
    },
    dataIndex: 'c1',
    width: 78,
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
  },
  {
    title: () => {
      return (
        <div>
          <p>在职<br/>G人数</p>
        </div>
      )
    },
    dataIndex: 'g',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width: 72,
  },
  {
    title: () => {
      return (
        <div>
          <p>在职<br/>C2人数</p>
        </div>
      )
    },
    dataIndex: 'c2',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width: 78,
  },
  {
    title: () => {
      return (
        <div>
          <p>在职<br/>S人数</p>
        </div>
      )
    },
    dataIndex: 's',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:72
  },
  {
    title: () => {
      return (
        <div>
          <p>在职<br/>R人数</p>
        </div>
      )
    },
    dataIndex: 'r',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:72
  },
  {
    title: () => {
      return (
        <div>
          <p>在职人员<br/>正式人数</p>
        </div>
      )
    },
    dataIndex: 'official',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:90
  },
  {
    title: () => {
      return (
        <div>
          <p>在职人员<br/>兼职人数</p>
        </div>
      )
    },
    dataIndex: 'pluralistic',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:90
  },
  {
    title: () => {
      return (
        <div>
          <p>在职人员<br/>实习人数</p>
        </div>
      )
    },
    dataIndex: 'practice',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:90
  },
  {
    title: () => {
      return (
        <div>
          <p>入职<br/>人数</p>
        </div>
      )
    },
    dataIndex: 'entry',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:60
  },
  {
    title: () => {
      return (
        <div>
          <p>离职<br/>人数</p>
        </div>
      )
    },
    dataIndex: 'dimission',
    headerCellStyle:{'text-align' : 'center'},
    bodyCellStyle : {'text-align' : 'right'},
    width:60
  }
]