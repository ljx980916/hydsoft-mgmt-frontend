<template>
    <div class="defaultPadding">
        <div v-show="currentLevel === 'level1'">
            <div class="m-b-20">
                <span>月份 :  &nbsp;&nbsp;</span>
                <a-month-picker
                    style="width: 130px;" 
                    v-model:model-value="monthVal" 
                    class="m-r-20" 
                    value-format="YYYYMM"
                    :allow-clear="false"
                    :disabledDate="getDisabledTime"
                    @change="monthChange" 
                />
                <span>展开至 : &nbsp;&nbsp;</span>
                <a-radio-group type="button" v-model:model-value="expandTabs" @change="handleExpandTabsChange">
                    <a-radio value="level1">一级部门</a-radio>
                    <a-radio value="level2">二级部门</a-radio>
                    <a-radio value="all">末级部门</a-radio>
                </a-radio-group>
            </div>
            <a-table
                :columns="level1TableInfo.columns"
                :data="level1TableInfo.data"
                :bordered="{cell:true}"
                column-resizable
                :scroll="{ maxHeight: level1TableInfo.maxHeight }"
                :scrollbar="false"
                :pagination="false"
                :expanded-keys="level1TableInfo.defaultExpandedKeys"
                :loading="level1TableInfo.loading"
                ref="level1TableRef"
                @expanded-change="expandedChange"
            >
                <template #deptName="{record}">
                    <a href="javaScript:void(0)" style="color: #165dff" @click="jump('level2', record)">
                        {{ record.deptName }}
                    </a>
                </template>
            </a-table>
        </div>
        <div v-show="currentLevel === 'level2'">
            <div class="m-b-20">
                <span>成本类型 :  &nbsp;&nbsp;</span>
                <a-radio-group type="button" v-model:model-value="costType" @change="handleCostTypeChange">
                    <a-radio value="ALL">ALL</a-radio>
                    <a-radio value="G">G</a-radio>
                    <a-radio value="C2">C2</a-radio>
                    <a-radio value="S">S</a-radio>
                    <a-radio value="R">R</a-radio>
                </a-radio-group>
                <div style="float:right">
                    <a-popconfirm content="你确定要导出吗?" @ok="handleExport">
                        <a-button type="primary" :loading="exportLoading" style="border-radius: 4px">
                        <template #icon>
                            <icon-download />
                        </template>
                        <template #default>导出</template>
                        </a-button>
                    </a-popconfirm>
                </div>
            </div>
            <a-table
                :columns="level2TableInfo.columns"
                :data="level2TableInfo.data"
                :bordered="{cell:true}"
                column-resizable
                :scroll="{ maxHeight: level2TableInfo.maxHeight }"
                :scrollbar="false"
                :pagination="false"
                :loading="level2TableInfo.loading"
                ref="level2TableRef"
                @expanded-change="expandedChange"
            >
                <template #empName="{ record }">
                    {{ record.empName }}
                    <a-tag 
                        color="#5370FF" 
                        v-if="record.isDeptHead" 
                        bordered
                        :style="{background:'#E6F7FF',fonSize:'12px',color:'#5370FF',marginLeft:'10px'}"
                    >
                        部门负责人
                    </a-tag>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref, nextTick, watchEffect,onUnmounted } from 'vue'
import { exportEmpExcel, queryDeptCostDetail,queryDeptsCostData } from '@/api/empStatistics'
import { dataAddKey,toInteger } from '@/utils/util'
import { Message } from '@arco-design/web-vue'
import moment from 'moment'
import { getCurrentInstance } from "@vue/runtime-core";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;


const monthVal = ref(new Date())
const monthChange = ()=>{
    getDeptsCostData()
}
//禁选日期
const getDisabledTime = current => {
  return current.valueOf() < moment("2023-01-01 00:00:00").valueOf();
};
const currentLevel = ref('level1')
const expandTabs = ref('level1')
const handleExpandTabsChange = val=>{
    expandTabs.value = val
    level1TableInfo.defaultExpandedKeys = filterLevelkeys(sourceData,val)
}
const filterLevelkeys = (arr,key)=>{
    if(arr.length){
        let expandKeys = []
        switch (key) {
            case 'all':
                function getKeys(arr){
                    arr.forEach(item=>{
                        expandKeys.push(item.key)
                        if(item?.children?.length){
                            getKeys(item.children)
                        }
                    })
                }
                getKeys(arr)
                break;
            case 'level1' :
                arr.forEach(item=>{
                    expandKeys.push(item.key)
                })
                break;
            case 'level2' :
                arr.forEach(item=>{
                    expandKeys.push(item.key)
                    if(item?.children?.length){
                       item.children.forEach(jtem=>{
                        expandKeys.push(jtem.key)
                       })
                    }
                })
                break;
            default:
                expandKeys = []
                break;
        }
        return expandKeys
    }
}
const level1TableInfo = reactive({
    columns : [
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
            fixed : 'left',
            width : 230,
            slotName : 'deptName'
        },
        {
            title: 'G+C2人数',
            dataIndex: 'GC2Number',
            key: 'GC2Number',
            width : 110,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = +record[column.dataIndex]
                if(!isNaN(val) && val === 0){
                    return '-'
                }
                return val
            }    
        },
        {
            title: 'G+C2人数占比',
            dataIndex: 'GC2Rate',
            key: 'GC2Rate',
            width : 110,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = +record[column.dataIndex]
                if(!isNaN(val)){
                    return (val*100).toFixed(2) + '%'
                }
                return val
            }    
        },
        {
            title: 'S人数',
            dataIndex: 'SNumber',
            key: 'SNumber',
            width : 90,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = +record[column.dataIndex]
                if(!isNaN(val) && val === 0){
                    return '-'
                }
                return val
            }    
        },
        {
            title: 'S人数占比',
            dataIndex: 'SRate',
            key: 'SRate',
            width : 110,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = +record[column.dataIndex]
                if(!isNaN(val)){
                    return (val*100).toFixed(2) + '%'
                }
                return val
            }    
        },
        {
            title: 'R人数',
            dataIndex: 'RNumber',
            key: 'RNumber',
            width : 110,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = +record[column.dataIndex]
                if(!isNaN(val) && val === 0){
                    return '-'
                }
                return val
            }    
        },
        {
            title: 'R人数占比',
            dataIndex: 'RRate',
            key: 'RRate',
            width : 110,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = +record[column.dataIndex]
                if(!isNaN(val)){
                    return (val*100).toFixed(2) + '%'
                }
                return val
            }    
        }
    ],
    data : [],
    maxHeight : '600px',
    loading :false,
    defaultExpandedKeys : []
})
const expandedChange = keys =>{
    level1TableInfo.defaultExpandedKeys = keys
}
const level2TableRef = ref(null);
let selectDept = ''
const jump = (val,record) =>{
    selectDept = record.deptName
    currentLevel.value = val
    if(val === 'level2'){
        getDeptCostDetail()
        let breadList = [
            { 
                type: "button",
                color: "#333",
                msg: `${moment(monthVal.value).format("YYYY年MM月")}`,
                params: "level1",
            },
            {
                type: "text",
                color: "#333",
                msg: record.deptName,
            },
        ];
        $bus.emit("updateStructure", breadList);
        if( level2TableInfo.maxHeight === '600px' && level2TableRef.value){
            nextTick(() => {
                let head = level2TableRef.value.$el;
                let innerHeight = window.innerHeight;
                let elHeight = head.getBoundingClientRect().top;
                level2TableInfo.maxHeight = innerHeight>900?innerHeight+130+'px':innerHeight - elHeight - 32 + "px";
            });
        }
    }
}
let sourceData = []
const getDeptsCostData = ()=>{
    let params = {
        month : moment(monthVal.value).format('YYYYMM')
    }
    level1TableInfo.loading = true
    queryDeptsCostData(params).then(res=>{
        if(res.code === '200'){
            dataAddKey(res.data,"key","id")
            let expandKeys = []
            res.data.forEach(item=>{
                expandKeys.push(item.key)
            })
            level1TableInfo.data = res.data
            level1TableInfo.defaultExpandedKeys = expandKeys
            sourceData = res.data
        }else {
            Message.error(res.message || '请求失败')
        }
    }).catch(err=>{
        Message.error(err.message || '请求失败')
    }).finally(()=>{
        level1TableInfo.loading = false
    })
}
onBeforeMount(()=>{
    getDeptsCostData()
})
const level1TableRef = ref(null);
onMounted(() => {
  if (level1TableRef.value) {
    let head = level1TableRef.value.$el;
    nextTick(() => {
      let innerHeight = window.innerHeight;
      let elHeight = head.getBoundingClientRect().top;
      level1TableInfo.maxHeight = innerHeight - elHeight - 32 + "px";
    });
  }
    $bus.on("goBack", val => {
        currentLevel.value = val;
        switch (val) {
            case "level1":
            let breadList1 = [
                { type: "text", color: "#333", msg: `${moment(monthVal.value).format("YYYY年MM月")}` },
            ];
            $bus.emit("updateStructure", breadList1);
            break;
            default:
            break;
        }
    });
});

const costType = ref('ALL')
const handleCostTypeChange = val =>{
    costType.value = val
    getDeptCostDetail()
}
const exportLoading = ref(false)
const handleExport = ()=>{
    exportLoading.value = true
    let deptName = selectDept
    let params = {
        costCenterName : '',
        deptName,
        month : moment(monthVal.value).format('YYYYMM')
    }
    exportEmpExcel(params).then(res=>{
        const blob = new Blob([res]);
        const fileReader = new FileReader();
            fileReader.readAsText(res, 'utf-8');
            fileReader.onerror = function () {
            Message.error('导出文件失败')
            return;
            };
        const fileName = `${moment(monthVal.value).format('YYYYMM')}_${deptName}招管销人员明细.xlsx`;
        const link = document.createElement("a");
        link.download = fileName;
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    }).catch(() => {
      Message.error("导出失败");
    })
    .finally(() => {
        exportLoading.value = false
    });
}
const level2TableInfo = reactive({
    columns : [
        {
            title: '部门',
            dataIndex: 'deptName',
            key: 'deptName',
            fixed : 'left',
            width : 190,
        },
        {
            title: '姓名',
            dataIndex: 'empName',
            key: 'empName',
            width : 170,
            slotName : 'empName'
        },
        {
            title: '成本类型',
            dataIndex: 'costCenterName',
            key: 'costCenterName',
            width : 100,
        },
        {
            title: '上级领导',
            dataIndex: 'deptManager',
            key: 'deptManager',
            width : 110,
        },
        {
            title: '城市',
            dataIndex: 'workPlace',
            key: 'workPlace',
            width : 100,
        },
        {
            title: '入职日期',
            dataIndex: 'hireDate',
            key: 'hireDate',
            width : 130,
        },
        {
            title: '管理团队人数',
            dataIndex: 'teamCount',
            key: 'teamCount',
            width : 120,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = record[column.dataIndex]
                if(typeof(val) === 'number'){
                    return <span innerHTML={toInteger(val, 0, false)}></span>
                }
                return val
            }    
        }
    ],
    data : [],
    maxHeight : '600px',
    loading :false
})

const getDeptCostDetail = ()=>{
    level2TableInfo.loading = true
    let params = {
        costCenterName : costType.value === 'ALL'?'':costType.value,
        deptName : selectDept,
        month : moment(monthVal.value).format('YYYYMM')
    }
    queryDeptCostDetail(params).then(res=>{
        if(res.code === '200'){
            level2TableInfo.data = res.data
        }else {
            level2TableInfo.data = []
            Message.error(res.message || '请求失败')
        }
    }).catch(err=>{
        level2TableInfo.data = []
        Message.error(err.message || '请求失败')
    }).finally(()=>{
        level2TableInfo.loading = false
    })
}
watchEffect(() => {
  $bus.emit("updateStructure", [
    { type: "text", color: "#333", msg: `${moment(monthVal.value).format("YYYY年MM月")}` },
  ]);
});
onUnmounted(() => {
  $bus.off("goBack");
});
</script>

<style lang="scss" scoped>

</style>