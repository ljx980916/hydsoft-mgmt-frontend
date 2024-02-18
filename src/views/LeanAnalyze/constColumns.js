import { number2percentage,toInteger } from '../../utils/util'


export const hexinshujuColumns = [
    {
        title: '部门名称',
        dataIndex: 'lastDeptName',
        fixed: 'left',
        width: 190,
        slotName : 'lastDeptName',
    },
    {
        title: '部门负责人',
        dataIndex: 'leaderName',
        width: 110,
    },
    {
        title: '发薪人数',
        dataIndex: 'colNo1',
        width: 90,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo1) 
        },
    },
    {
        title: '销售收入',
        dataIndex: 'colNo2',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo2)
        },
    },
    {
        title: '增值税',
        dataIndex: 'colNo3',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo3)
        },
    },
    {
        title: '营业收入',
        dataIndex: 'colNo4',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo4)
        },
    },
    {
        title: '税金及附加',
        dataIndex: 'colNo5',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo5)
        },
    },
    {
        title: '直接成本',
        dataIndex: 'colNo6',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo6) 
        },
    },
    {
        title: '销售毛利',
        dataIndex: 'colNo7',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo7)
        },
    },
    {
        title: '销售毛利率',
        dataIndex: 'colNo8',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo8) + '%'
        },
    },
    {
        title: '招聘成本',
        dataIndex: 'colNo9',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo9)
        },
    },
    {
        title: '经营毛利',
        dataIndex: 'colNo10',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo10)
        },
    },
    {
        title: '经营毛利率',
        dataIndex: 'colNo11',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo11)+ '%'
        },
    },
    {
        title: '销管人数',
        dataIndex: 'colNo12',
        width: 90,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo12)
        },
    },
    {
        title: '销售费用',
        dataIndex: 'colNo13',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo13)
        },
    },
    {
        title: '管理费用',
        dataIndex: 'colNo14',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo14)
        },
    },
    {
        title: '考核经营净利润',
        dataIndex: 'colNo15',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo15)
        },
    },
    {
        title: '考核经营净利润率',
        dataIndex: 'colNo16',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo16)+ '%'
        },
    },
    {
        title: '未完工项目成本',
        dataIndex: 'colNo17',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo17)
        },
    },
    {
        title: '人均营收',
        dataIndex: 'colNo18',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo18)
        },
    },
    {
        title: '直接成本/营收',
        dataIndex: 'colNo19',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo19)+ '%'
        },
    },
    {
        title: '招聘成本/营收',
        dataIndex: 'colNo20',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo20)+ '%'
        },
    },
    {
        title: '招聘费效比',
        dataIndex: 'colNo21',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo21)+ '%'
        },
    },
    {
        title: '销管费用',
        dataIndex: 'colNo22',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return toInteger(record.colNo22)
        },
    },
    {
        title: '销管费用/营收',
        dataIndex: 'colNo23',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo23)+ '%'
        },
    },
    {
        title: '销管费效比',
        dataIndex: 'colNo24',
        width: 110,
        align: 'right',
        cellStyle : {'text-align' : 'right'},
        render:({record})=>{
            return number2percentage(record.colNo24)+ '%'
        },
    },
]

export const faxinrenshuColumns = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: '发薪人数',
        dataIndex: 'faxinrenshu',
        width: 110
    },
    {
        title: 'C1人数',
        dataIndex: 'c1renshu',
        width: 110
    },
    {
        title: 'C2人数',
        dataIndex: 'c2renshu',
        width: 110
    },
    {
        title: 'R人数',
        dataIndex: 'rrenshu',
        width: 110
    },
    {
        title: 'S人数',
        dataIndex: 'srenshu',
        width: 110
    },
    {
        title: 'G人数',
        dataIndex: 'grenshu',
        width: 110
    },
]

export const yingyeshouruColums = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: '营业收入',
        dataIndex: 'yingyeshouru',
        width: 110
    },
    {
        title: '核心收入',
        dataIndex: 'hexinshouru',
        width: 110
    },
    {
        title: '其他收入',
        dataIndex: 'qitashouru',
        width: 110
    },
    {
        title: '转包收入',
        dataIndex: 'zhuanbaoshouru',
        width: 110
    },
]

export const zhijiechengbenColumns = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: '直接成本',
        dataIndex: 'zhijiechengben',
        width: 110
    },
    {
        title: '人力成本',
        dataIndex: 'renlichengben',
        width: 110
    },
    {
        title: '工资',
        dataIndex: 'gongzi',
        width: 110
    },
    {
        title: '社会保险及公积金',
        dataIndex: 'shehuibaoxianjigongjijin',
        width: 110
    },
    {
        title: '残保金及工会经费',
        dataIndex: 'canbaojinjigonghuijingfei',
        width: 110
    },
    {
        title: '员工福利',
        dataIndex: 'yuangongfuli',
        width: 110
    },
    {
        title: '奖金',
        dataIndex: 'jingjin',
        width: 110
    },
    {
        title: '其他人力成本',
        dataIndex: 'qitarenlichengben',
        width: 110
    },
    {
        title: '非人力成本',
        dataIndex: 'feirenlichengben',
        width: 110
    },
    {
        title: '业务转包费',
        dataIndex: 'yewuzhuanbaofei',
        width: 110
    },
    {
        title: '其他成本',
        dataIndex: 'qitachengben',
        width: 110
    },
    {
        title: '人力成本（差异）',
        dataIndex: 'renlichengbenchayi',
        width: 110
    }
]

export const zhaopinchengbenColumns = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: 'R人数',
        dataIndex: 'rrenshu',
        with: 110
    },
    {
        title: '招聘成本',
        dataIndex: 'zhaopinchengben',
        with: 110
    },
    {
        title: '人力成本',
        dataIndex: 'renlichengben',
        with: 110
    },
    {
        title: '非人力成本',
        dataIndex: 'feirenlichengben',
        with: 110
    },
    {
        title: '渠道费',
        dataIndex: 'qudaofei',
        with: 110
    },
    {
        title: '招聘外包费',
        dataIndex: 'zhaopinwaibaofei',
        with: 110
    },
    {
        title: '招聘成本/营收',
        dataIndex: 'zhaopinchengbenyingshou',
        with: 110
    },
    {
        title: '招聘费效比',
        dataIndex: 'zhaopinfeixiaobi',
        with: 110
    }
]

export const xiaoshoufeiyongColumns = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: 'S人数',
        dataIndex: 'srenshu',
        width: 110
    },
    {
        title: '销售费用',
        dataIndex: 'xiaoshoufeiyong',
        width: 110
    },
    {
        title: '-人力成本',
        dataIndex: 'renlichengben',
        width: 110
    },
    {
        title: '-非人力成本',
        dataIndex: 'feirenlichengben',
        width: 110
    },
    {
        title: ' --交通差旅通讯费',
        dataIndex: 'jiaotongchailvtongxunfei',
        width: 110
    },
    {
        title: '- -招待费',
        dataIndex: 'zhaodaifei',
        width: 110
    },
]
export const guanlifeiyongColumns = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: 'G人数',
        dataIndex: 'grenshu',
        width: 110
    },
    {
        title: '管理费用',
        dataIndex: 'guanlifeiyong',
        width: 110
    },
    {
        title: '-人力成本',
        dataIndex: 'renlichengben',
        width: 110
    },
    {
        title: '-非人力成本',
        dataIndex: 'feirenlichengben',
        width: 110
    },
    {
        title: '- -交通差旅通讯费',
        dataIndex: 'jiaotongchailvtongxunfei',
        width: 110
    },
    {
        title: '-其他费用',
        dataIndex: 'qitafeiyong',
        width: 110
    }
]
export const caiwuguanliColumns = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: '财务费用',
        dataIndex: 'caiwufeiyong',
        width: 110
    },
    {
        title: '-资金成本',
        dataIndex: 'zijinchengben',
        width: 110
    },
    {
        title: '-汇兑损益',
        dataIndex: 'huiduisunyi',
        width: 110
    },
    {
        title: '-银行费用',
        dataIndex: 'yinhangfeiyong',
        width: 110
    },
    {
        title: '坏账计提',
        dataIndex: 'huaizhangjiti',
        width: 110
    },
    {
        title: '总部管理',
        dataIndex: 'zongbuguanli',
        width: 110
    }
]
export const quanbushujuColumns = [
    {
        title: '部门名称',
        dataIndex: 'bumenmingcheng',
        fixed: 'left',
        width: 190
    },
    {
        title: '部门负责人',
        dataIndex: 'bumenfuzeren',
        width: 110
    },
    {
        title: '发薪人数',
        dataIndex: 'faxinrenshu',
        width: 110
    },
    {
        title: 'C1人数',
        dataIndex: 'c1renshu',
        width: 110
    },
    {
        title: 'C2人数',
        dataIndex: 'c2renshu',
        width: 110
    },
    {
        title: 'R人数',
        dataIndex: 'rrenshu',
        width: 110
    },
    {
        title: 'S人数',
        dataIndex: 'srenshu',
        width: 110
    },
    {
        title: 'G人数',
        dataIndex: 'grenshu',
        width: 110
    },
    {
        title: '销售收入',
        dataIndex: 'xiaoshoushouru',
        width: 110
    },
    {
        title: '增值税',
        dataIndex: 'zengzhishui',
        width: 110
    },
    {
        title: '营业收入',
        dataIndex: 'yingyeshouru',
        width: 110
    },
    {
        title: '-核心收入',
        dataIndex: 'hexinshouru',
        width: 110
    },
    {
        title: '-其他收入',
        dataIndex: 'qitashouru',
        width: 110
    },
    {
        title: '-转包收入',
        dataIndex: 'qianbaoshouru',
        width: 110
    },
    {
        title: '税金及附加',
        dataIndex: 'shuijinjifujia',
        width: 110
    },
    {
        title: '直接成本',
        dataIndex: 'zhijiechengben',
        width: 110
    },
    {
        title: '-人力成本',
        dataIndex: 'renlichengben1',
        width: 110
    },
    {
        title: '- -工资 ',
        dataIndex: 'gongzi',
        width: 110
    },
    {
        title: '- -社会保险及公积金',
        dataIndex: 'shehuibaoxianjigongjijin',
        width: 110
    },
    {
        title: '- -残保金及工会经费',
        dataIndex: 'canbaojinjigonghuijingfei',
        width: 110
    },
    {
        title: '- -员工福利',
        dataIndex: 'yuangongfuli',
        width: 110
    },
    {
        title: '- -奖金',
        dataIndex: 'jiangjin',
        width: 110
    },
    {
        title: '- -其他人力成本',
        dataIndex: 'qitarenlichengben',
        width: 110
    },
    {
        title: '-非人力成本',
        dataIndex: 'feirenlichengben1',
        width: 110
    },
    {
        title: '-业务转包费',
        dataIndex: 'yewuzhuanbaofei',
        width: 110
    },
    {
        title: '-其他成本',
        dataIndex: 'qitachengben',
        width: 110
    },
    {
        title: ' -人力成本（差异）',
        dataIndex: 'renlichengbenchayi',
        width: 110
    },
    {
        title: '销售毛利',
        dataIndex: 'xiaoshoumaoli',
        width: 110
    },
    {
        title: '销售毛利率',
        dataIndex: 'xiaoshoumaolilv',
        width: 110
    },
    {
        title: '招聘成本',
        dataIndex: 'zhaopinchengben',
        width: 110
    },
    {
        title: '-人力成本',
        dataIndex: 'renlichengben2',
        width: 110
    },
    {
        title: '-非人力成本',
        dataIndex: 'feirenlichengben2',
        width: 110
    },
    {
        title: '- -渠道费',
        dataIndex: 'qudaofei',
        width: 110
    },
    {
        title: '-招聘外包费',
        dataIndex: 'zhaopinwaibaofei',
        width: 110
    },
    {
        title: '经营毛利',
        dataIndex: 'jingyingmaoli',
        width: 110
    },
    {
        title: '经营毛利率',
        dataIndex: 'jingyingmaolilv',
        width: 110
    },
    {
        title: '销管人数',
        dataIndex: 'xiaoguanrenshu',
        width: 110
    },
    {
        title: '销售费用',
        dataIndex: 'xiaoshoufeiyong',
        width: 110
    },
    {
        title: '-人力成本',
        dataIndex: 'renlichengben3',
        width: 110
    },
    {
        title: '-非人力成本',
        dataIndex: 'feirenlichengben3',
        width: 110
    },
    {
        title: '- -交通差旅通讯费',
        dataIndex: 'jiaotongchailvtongxunfei1',
        width: 110
    },
    {
        title: '- -招待费',
        dataIndex: 'zhaodaifei',
        width: 110
    },
    {
        title: '管理费用',
        dataIndex: 'guanlifeiyong',
        width: 110
    },
    {
        title: '-人力成本',
        dataIndex: 'renlichengben4',
        width: 110
    },
    {
        title: '-非人力成本',
        dataIndex: 'feirenlichengben4',
        width: 110
    },
    {
        title: '- -交通差旅通讯费',
        dataIndex: 'jiaotongchailvtongxunfei2',
        width: 110
    },
    {
        title: '-其他费用',
        dataIndex: 'qitafeiyong',
        width: 110
    },
    {
        title: '部门经营利润',
        dataIndex: 'bumenjingyinglirun',
        width: 110
    },
    {
        title: '部门经营利润率',
        dataIndex: 'bumenjingyinglirunlv',
        width: 110
    },
    {
        title: '财务费用',
        dataIndex: 'caiwufeiyong',
        width: 110
    },
    {
        title: '-资金成本',
        dataIndex: 'zijinchengben',
        width: 110
    },
    {
        title: '-汇兑损益',
        dataIndex: 'huiduisunyi',
        width: 110
    },
    {
        title: '-银行费用',
        dataIndex: 'yinhangfeiyong',
        width: 110
    },
    {
        title: '坏账计提',
        dataIndex: 'huaizhangjiti',
        width: 110
    },
    {
        title: '总部管理',
        dataIndex: 'zongbuguanli',
        width: 110
    },
    {
        title: '考核经营净利润',
        dataIndex: 'kaohejingyingjinglirun',
        width: 110
    },
    {
        title: '考核经营净利润率',
        dataIndex: 'kaohejingyingjinglirunlv',
        width: 110
    },
    {
        title: '未完工项目成本',
        dataIndex: 'weiwangongxiangmuchengben',
        width: 110
    },
    {
        title: '人均营收',
        dataIndex: 'renjunyingshou',
        width: 110
    },
    {
        title: '直接成本/营收',
        dataIndex: 'zhijiechengbenyingshou',
        width: 110
    },
    {
        title: '招聘成本/营收',
        dataIndex: 'zhaopinchengbenyingshou',
        width: 110
    },
    {
        title: '招聘费效比',
        dataIndex: 'zhaopinfeixiaobi',
        width: 110
    },
    {
        title: '销管费用',
        dataIndex: 'xiaoguanfeiyong',
        width: 110
    },
    {
        title: '销管费用/营收',
        dataIndex: 'xiaoguanfeiyongyingshou',
        width: 110
    },
    {
        title: '销管费效比',
        dataIndex: 'xiaoguanfeixiaobi',
        width: 110
    },
]

export const dataResult = {
    "code": "000000000000",
    "message": "查询成功",
    "data": [{
        "tab": {
            "name": "核心数据",
            "key": "kernelData"
        },
        "columns": [{
            "title": "部门名称",
            "dataIndex": ""
        }, {
            "title": " 部门负责人",
            "dataIndex": ""
        }, {
            "title": "发薪人数",
            "dataIndex": ""
        }, {
            "title": "销售收入",
            "dataIndex": ""
        }, {
            "title": "增值税",
            "dataIndex": ""
        }, {
            "title": "营业收入",
            "dataIndex": ""
        }, {
            "title": "税金及附加",
            "dataIndex": ""
        }, {
            "title": "直接成本",
            "dataIndex": ""
        }, {
            "title": "销售毛利",
            "dataIndex": ""
        }, {
            "title": "销售毛利率",
            "dataIndex": ""
        }, {
            "title": "招聘成本",
            "dataIndex": ""
        }, {
            "title": "经营毛利",
            "dataIndex": ""
        }, {
            "title": "经营毛利率",
            "dataIndex": ""
        }, {
            "title": "销管人数",
            "dataIndex": ""
        }, {
            "title": "销售费用",
            "dataIndex": ""
        }, {
            "title": "管理费用",
            "dataIndex": ""
        }, {
            "title": "考核经营净利润",
            "dataIndex": ""
        }, {
            "title": "考核经营净利润率",
            "dataIndex": ""
        }, {
            "title": "未完工项目成本",
            "dataIndex": ""
        }, {
            "title": "人均营收",
            "dataIndex": ""
        }, {
            "title": "直接成本/营收",
            "dataIndex": ""
        }, {
            "title": "招聘成本/营收",
            "dataIndex": ""
        }, {
            "title": "招聘费效比",
            "dataIndex": ""
        }, {
            "title": "销管费用",
            "dataIndex": ""
        }, {
            "title": "销管费用/营收",
            "dataIndex": ""
        }, {
            "title": "销管费效比",
            "dataIndex": ""
        }]
    }, {
        "tab": {
            "name": "发薪人数",
            "key": "payroll"
        },
        "columns": [{
            "title": "部门名称",
            "dataIndex": ""
        }, {
            "title": "发薪人数",
            "dataIndex": ""
        }, {
            "title": "C1人数",
            "dataIndex": ""
        }, {
            "title": "C2人数",
            "dataIndex": ""
        }, {
            "title": "R人数",
            "dataIndex": ""
        }, {
            "title": "S人数",
            "dataIndex": ""
        }, {
            "title": "G人数",
            "dataIndex": ""
        }]
    }, {
        "tab": {
            "name": "营业收入",
            "key": "operatingReceiptt"
        },
        "columns": [{}]
    },
    {
        "tab": {
            "name": "直接成本",
            "key": "directCost"
        },
        "columns": [{}]
    },
    {
        "tab": {
            "name": "招聘成本",
            "key": "RecruitCost"
        },
        "columns": [{}]
    },
    {
        "tab": {
            "name": "销售费用",
            "key": "sellingExpense"
        },
        "columns": [{}]
    },
    {
        "tab": {
            "name": "管理费用",
            "key": "administrationExpense"
        },
        "columns": [{}]
    },
    {
        "tab": {
            "name": "财务管理",
            "key": "financialManagement"
        },
        "columns": [{}]
    },
]
}