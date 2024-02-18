
//折叠/不折叠表格表头
export const revenueColumns = [
  {
    title: '分析项',
    dataIndex: 'analysis',
    fixed:'left',
  },
  {
    title: '1月',
    dataIndex: 'month1',
  },
  {
    title: '2月',
    dataIndex: 'month2',
  },
  {
    title: '3月',
    dataIndex: 'month3',
  },
  {
    title: '4月',
    dataIndex: 'month4',
  },
  {
    title: '5月',
    dataIndex: 'month5',
  },
  {
    title: '6月',
    dataIndex: 'month6',
  },
  {
    title: '7月',
    dataIndex: 'month7',
  },
  {
    title: '8月',
    dataIndex: 'month8',
  },
  {
    title: '9月',
    dataIndex: 'month9',
  },
  {
    title: '10月',
    dataIndex: 'month10',
  },
  {
    title: '11月',
    dataIndex: 'month11',
  },
  {
    title: '12月',
    dataIndex: 'month12',
  },
  {
    title: '累计',
    dataIndex: 'total',
  } 
]
//环差比表头
export const differentColumns =[
  {
    title: '分析项',
    dataIndex: 'analysis',
    fixed:'left',
  },
  {
      title:'10月',
      dataIndex: 'month10',
      titleSlotName:'monthBefore',
  },
  {
      title:'11月',
      dataIndex: 'month11',
      titleSlotName:'monthAfter',
  },
  {
    title:"11-10月",
    dataIndex: 'monthDifferent',
    headerCellStyle : {'backgroundColor' : 'rgb(229, 247, 247)'},
  },
  {
    title:"月环比",
    dataIndex: 'MonthonMonth',
    headerCellStyle : {'backgroundColor' : 'rgb(229, 247, 247)'},
  },
  {
    title:"Q2",
    dataIndex: 'Q2',
    titleSlotName:'QBefore',
  },
  {
    title:"Q3",
    dataIndex: 'Q3',
    titleSlotName:'QAfter',
  },
  {
    title:"Q3-Q2",
    dataIndex: 'QDifferent',
    headerCellStyle : {'backgroundColor' : 'rgb(229, 247, 247)'},
  },
  {
    title:"Q环比",
    dataIndex: 'QonQ',
    headerCellStyle : {'backgroundColor' : 'rgb(229, 247, 247)'},
  },
 
]

export const tableHeadTopColumns = [
  {
    title: '分析项',
    dataIndex: 'analysis',
    fixed:'left',
    width: 140
  },
  {
    title: '1月',
    dataIndex: 'month1',
    width: 140
  },
  {
    title: '2月',
    dataIndex: 'month2',
    width: 140
  },
  {
    title: '3月',
    dataIndex: 'month3',
    width: 140
  },
  {
    title: '4月',
    dataIndex: 'month4',
    width: 140
  },
  {
    title: '5月',
    dataIndex: 'month5',
    width: 140
  },
  {
    title: '6月',
    dataIndex: 'month6',
    width: 140
  },
  {
    title: '7月',
    dataIndex: 'month7',
    width: 140
  },
  {
    title: '8月',
    dataIndex: 'month8',
    width: 140
  },
  {
    title: '9月',
    dataIndex: 'month9',
    width: 140
  },
  {
    title: '10月',
    dataIndex: 'month10',
    width: 140
  },
  {
    title: '11月',
    dataIndex: 'month11',
    width: 140
  },
  {
    title: '12月',
    dataIndex: 'month12',
    width: 140
  },
  {
    title: '累计',
    dataIndex: 'total',
    width: 140,
  } 
]
