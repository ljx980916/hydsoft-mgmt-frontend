<template>
    <div :class="['defaultPadding',innerHeight>1000 && 'yCenter']" :style="{'height':innerHeight>1000?innerHeight+'px':'auto'}">
        <header class="flex-center">
            <div class="flex">
                <div class="m-r-40">
                    <span>
                        <img :src="barChart" width="20" class="img">
                    </span>
                    <a-radio-group type="button" size="medium" v-model:model-value="barChartSelect" @change="selectChange">
                        <a-radio value="营业收入(总) 直接成本(总)">收入&成本(总)</a-radio>
                        <a-radio value="人均营业收入 人均直接成本">收入&成本(人均)</a-radio>
                    </a-radio-group>
                </div>
                <div class="m-r-40">
                    <img :src="lineChart" width="20" class="img">
                    <a-checkbox-group v-model:model-value="lineChartSelect" @change="selectChange" class="checkbox-group">
                        <a-checkbox value="发薪人数">
                            <template #checkbox="{ checked }">
                                <a-tag :checked="checked" :class="['checkbox-tag', 'checkbox-tag1',checked && 'checkbox-tag-active']" checkable :style="{color : checked?'#3A64FF':'#666666'}">发薪人数</a-tag>
                            </template>
                        </a-checkbox>
                        <a-checkbox value="项目销售毛利率">
                            <template #checkbox="{ checked }">
                                <a-tag :checked="checked" :class="['checkbox-tag', 'checkbox-tag2',checked && 'checkbox-tag-active']" :style="{color : checked?'#3A64FF':'#666666'}">项目销售毛利率</a-tag>
                            </template>
                        </a-checkbox>
                    </a-checkbox-group>
                </div>
                <div class="m-r-170">
                    <img :src="timeChart" width="20" class="img">
                    <a-radio-group type="button" size="medium" v-model:model-value="timeChartSelect" @change="timeSelectChange">
                        <a-radio value="3">近3个月</a-radio>
                        <a-radio value="6">近6个月</a-radio>
                        <a-radio value="12">近12个月</a-radio>
                    </a-radio-group>
                </div>
                <div>
                    <a-button type="primary" @click="handleSwitchDept">切换{{ sourceTypeMap[sourceType] }}</a-button>
                </div>
            </div>
        </header>
        <main>
            <a-spin :loading="chartContainerLoading" tip="数据加载中..." style="width: 100%;">
                <div ref="chartContainerRef" class="chartContainer">
            </div>
            </a-spin>
        </main>
    </div>
    <a-modal v-model:visible="switchDeptModal.visible" width="800px" :body-style="{height:'200px'}" title-align="start">
        <template #title>
            <span class="modal-title">切换{{ sourceTypeMap[sourceType] }}</span>
        </template>
        <a-spin :loading="switchDeptModal.loading" style="width:100%" tip="数据加载中...">
            <a-cascader-panel :options="switchDeptModal.options" v-model="switchDeptModal.selectItem" check-strictly expand-child/>
        </a-spin>
        <template #footer>
            <div style="text-align: center;">
                <a-button type="outline" class="m-r-10" @click="switchDeptModal.visible=false">取消</a-button>
                <a-button type="primary" @click="handleSwitchDeptModalOK">确定</a-button>
            </div>
        </template>
    </a-modal>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref, shallowRef, unref } from 'vue';
import * as echarts from 'echarts';
import { queryYoyAnalysisDept,getDeptEcharts,getCustomerEcharts,getProjectEchartsUsingPOST,getCustomer,getProject } from '@/api/lookChart'
import { Message } from "@arco-design/web-vue";
const barChart = require('@/assets/images/barChart.svg')
const lineChart = require('@/assets/images/lineChart.svg')
const timeChart = require('@/assets/images/timeChart.svg')
let { deptName,interval,deptId,title,sourceType,customerName,projectName,projectId,taxRate,customerId } = window.history.state
import { getCurrentInstance } from "@vue/runtime-core";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
const innerHeight = window.innerHeight
const chartContainerRef = ref(null)
const chartContainerLoading = ref(false)
let sourceTypeMap = {
    dept : '部门',
    customer : '客户',
    project : '项目'
}
let myChart
const barChartSelect = ref('营业收入(总) 直接成本(总)')
const lineChartSelect = shallowRef(['发薪人数'])
const timeChartSelect = ref(interval)
const selectChange =()=>{
    setChartData()
}
const timeSelectChange = ()=>{
    switch (sourceType) {
        case 'dept':
            getChartData()
            break;
        case 'customer':
            getCustomerData()
            break;
        case 'project':
            getProjectData()
            break;
        default:
            break;
    }
}
const switchDeptModal = reactive({
    visible : false,
    selectItem : '',
    options : [],
    loading : false
})
const handleSwitchDept = ()=>{
    switchDeptModal.visible = true
    if(switchDeptModal.options.length === 0){
        switch (sourceType) {
            case 'dept':
                getDeptData()
                break;
            case 'customer':
                getAllCustomerData()
                break;
            case 'project':
                getAllProjecttData()
                break;
            default:
                break;
        }
    }
}
const getDeptData = ()=>{
    if(switchDeptModal.options.length === 0){
        switchDeptModal.loading = true
        let params = {
            interval : unref(timeChartSelect)
        }
        queryYoyAnalysisDept(params).then(res=>{
            if(res.code === '200'){
                function recursionDelChildren(arr){
                    arr.forEach(item=>{
                        item.value = item.deptId
                        if(item?.children?.length){
                            recursionDelChildren(item.children)
                        }else {
                            delete item.children
                        }
                    })
                }
                recursionDelChildren(res.data)
                switchDeptModal.options = res.data
            }else {
                Message.error(res.message || '数据请求失败')
            }
        }).catch(err=>{
            Message.error(err.message || '数据请求失败')
        }).finally(()=>{
            switchDeptModal.loading = false
        })
    }
}

const getAllCustomerData = ()=>{
    if(switchDeptModal.options.length === 0){
        switchDeptModal.loading = true
        let params = {
            deptId,
            interval : unref(timeChartSelect)
        }
        getCustomer(params).then(res=>{
            if(res.code === '200'){
                function recursionDelChildren(arr){
                    arr.forEach(item=>{
                        item.value = item.title
                        item.label = item.title
                        if(item?.children?.length){
                            recursionDelChildren(item.children)
                        }else {
                            delete item.children
                        }
                    })
                }
                recursionDelChildren(res.data)
                switchDeptModal.options = res.data
            }else {
                Message.error(res.message || '数据请求失败')
            }
        }).catch(err=>{
            Message.error(err.message || '数据请求失败')
        }).finally(()=>{
            switchDeptModal.loading = false
        })
    }
}
const getAllProjecttData = ()=>{
    if(switchDeptModal.options.length === 0){
        switchDeptModal.loading = true
        let params = {
            deptId,
            interval : unref(timeChartSelect)
        }
        getProject(params).then(res=>{
            if(res.code === '200'){
                function recursionDelChildren(arr){
                    arr.forEach(item=>{
                        item.label = item.title
                        item.value = item.title
                        if(item?.children?.length){
                            recursionDelChildren(item.children)
                        }else {
                            item.label = item.projectName
                            item.value = item.projectName
                            delete item.children
                        }
                    })
                }
                recursionDelChildren(res.data)
                switchDeptModal.options = res.data
            }else {
                Message.error(res.message || '数据请求失败')
            }
        }).catch(err=>{
            Message.error(err.message || '数据请求失败')
        }).finally(()=>{
            switchDeptModal.loading = false
        })
    }
}
let sourceData = []
let chartOptionColosMap = {
    '营业收入(总)'  : '#6BD4B3',
    '人均营业收入' : '#6BD4B3',
    '直接成本(总)' : '#3491FA',
    '人均直接成本' : '#3491FA',
    '发薪人数' : '#FB6D6C',
    '项目销售毛利率' : '#008026'

}
const setChartData = ()=>{
    let barChartVal = barChartSelect.value.split(' ')
    let lineChartVal = lineChartSelect.value
    let timeChartVal = timeChartSelect.value
    let includeName = [...barChartVal,...lineChartVal,timeChartVal]
    let legend = []
    let fliterData = []
    sourceData.forEach(item=>{
        if(includeName.includes(item.name)){
            let yAxisIndex = 0
            if(item.type === 'bar'){
                yAxisIndex = 0
            }
            if(item.type === 'line'){
                yAxisIndex = 1
            }
            if(item.type === 'line' && item.name === '项目销售毛利率'){
                yAxisIndex = 2
            }
            fliterData.push({
                ...item,
                barWidth: 20,
                yAxisIndex,
                itemStyle: {
                    color : chartOptionColosMap[item.name]
                },
            })
            legend.push(item.name)
        }
    })
   chartOptions.legend = {
        data: legend,
        bottom : 0,
        itemGap : 100
    }
    chartOptions.series = fliterData
    if(myChart){
        myChart.setOption(chartOptions,true);
    }
}
// 请求部门维度看图数据
const getChartData = (id)=>{
    let params = {
        deptId : id || deptId || "",
        tagKey:"linkAnalysis",
        interval :unref(timeChartSelect),
    }
    chartContainerLoading.value = true
    getDeptEcharts(params).then(res=>{
        if(res.code === '200'){
            let { xAxis,series } = res.data
            chartOptions.xAxis[0].data = xAxis
            sourceData = series
            setChartData()
        }else {
            Message.error(res.message || '数据请求失败')
        }
    }).catch(err=>{
        Message.error(err.message || '数据请求失败')
    }).finally(()=>{
        chartContainerLoading.value = false
    })
}
// 请求客户维度看图数
const getCustomerData = (name)=>{
    let params = {
        tagKey:"linkAnalysis2",
        interval :unref(timeChartSelect),
        deptId: deptId || "",
        title : name || title,
        customerId : customerId || ''
    }
    chartContainerLoading.value = true
    getCustomerEcharts(params).then(res=>{
        if(res.code === '200'){
            let { xAxis,series } = res.data
            chartOptions.xAxis[0].data = xAxis
            sourceData = series
            setChartData()
        }else {
            Message.error(res.message || '数据请求失败')
        }
    }).catch(err=>{
        Message.error(err.message || '数据请求失败')
    }).finally(()=>{
        chartContainerLoading.value = false
    })
}
// 请求项目维度看图数据
const getProjectData = (obj)=>{
    let params = {
        interval :unref(timeChartSelect),
        deptId : deptId || "",
        tagKey:"linkAnalysis3",
        projectId: obj?.projectId || projectId,
        taxRate : obj?.taxRate || taxRate,
    }
    chartContainerLoading.value = true
    getProjectEchartsUsingPOST(params).then(res=>{
        if(res.code === '200'){
            let { xAxis,series } = res.data
            chartOptions.xAxis[0].data = xAxis
            sourceData = series
            setChartData()
        }else {
            Message.error(res.message || '数据请求失败')
        }
    }).catch(err=>{
        Message.error(err.message || '数据请求失败')
    }).finally(()=>{
        chartContainerLoading.value = false
    })
}
//遍历树结构按条件找对应的数据
function getOptionItem (arr,searchObj){
    let currentSelectItem = {}
    function searchItem(arr){
        arr.forEach(item=>{
            Object.keys(searchObj).forEach(key=>{
                if(item[key] === searchObj[key]){
                    currentSelectItem = item
                }
            })
            if(item?.children?.length){
                searchItem(item.children)
            }
        })
    }
    searchItem(arr)
    return currentSelectItem
}
const handleSwitchDeptModalOK = ()=>{
    switchDeptModal.visible = false
    if(switchDeptModal.selectItem){
        let item
        switch (sourceType) {
            case 'dept':
             item = getOptionItem(switchDeptModal.options,{ deptId : switchDeptModal.selectItem })
            $bus.emit("updateStructure", [
                { type: "text", color: "#333", msg: '环比分析列表' },
                {
                    type: "button",
                    color: "#5370FD",
                    msg: item.deptName,
                    isBack : true
                },
            ]);
                getChartData(item.deptId)
                break;
            case 'customer':
                 item = getOptionItem(switchDeptModal.options,{ title : switchDeptModal.selectItem })
                $bus.emit("updateStructure", [
                    { type: "text", color: "#333", msg: '环比分析列表' },
                    { type: "text", color: "#333", msg: deptName },
                    {
                        type: "button",
                        color: "#5370FD",
                        msg: item.title,
                        isBack : true
                    },
                ]);
                getCustomerData(item.title)
                break;
            case 'project':
                 item = getOptionItem(switchDeptModal.options,{ projectName : switchDeptModal.selectItem })
                $bus.emit("updateStructure", [
                    { type: "text", color: "#333", msg: '环比分析列表' },
                    { type: "text", color: "#333", msg: deptName },
                    { type: "text", color: "#333", msg:  `${item.groupCustomerName}-${customerName}`},
                    {
                        type: "button",
                        color: "#5370FD",
                        msg: item.projectName,
                        isBack : true
                    },
                ]);
                let { finPcode ,taxRate } = item
                getProjectData({
                    projectId :finPcode,
                    taxRate
                })
                break;
            default:
                break;
        }
    }
}

const chartOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            // formatter : (params)=>{
            //     let div = params.map(item=>{
            //         return `
            //             <div>
            //                 ${item.marker}  ${item.seriesName.endsWith('率')?item.seriesName+' '+item.value+'%': item.seriesName+' '+item.value}
            //             </div>
            //         `
            //     })
            //     return `<span>
            //             ${div}
            //         </span>`
            // }
        },
        grid: {
            left : '10%',
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                    inside: true,
                },
                axisLabel:{ 
                    rotate : 45
                },
                data: [],
            },
        ],
        yAxis: [
            {
                name : '柱状',
                type: 'value',
                position: 'left',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#797979'
                    }
                },
                axisLabel: {
                    color: '#666',
                    formatter: '{value}'
                },
                splitLine:{show: false}
            },
            {
                name : '折线',
                type: 'value',
                position: 'right',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#797979'
                    }
                },
                axisLabel: {
                    color: '#666',
                    formatter: '{value}'
                },
                splitLine:{show: false}
            },
            {
                name : '折线',
                type: 'value',
                position: 'right',
                offset: 60,
                boundaryGap: [0.01,1],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#797979'
                    }
                },
                axisLabel: {
                    color: '#666',
                    formatter: '{value}%'
                },
                splitLine:{show: false}
            }
            
        ],
        series: []
    }
onMounted(()=>{
    myChart = echarts.init(unref(chartContainerRef));
    chartOptions && myChart.setOption(chartOptions);
})

onBeforeMount(()=>{
    let breadList 
    switch (sourceType) {
        case 'dept':
            breadList = [
                {
                    type: "button",
                    color: "#5370FD",
                    msg: '环比分析列表',
                    isBack : true
                },
                { type: "text", color: "#333", msg: deptName },
            ]
            switchDeptModal.selectItem = deptId
            getChartData()
            break;
        case 'customer':
            breadList = [
                { type: "text", color: "#333", msg: '环比分析列表' },
                {
                    type: "button",
                    color: "#5370FD",
                    msg: deptName,
                    isBack : true
                },
                { type: "text", color: "#333", msg: title },
            ]
            switchDeptModal.selectItem = customerId
            getCustomerData()
            break;
        case 'project':
            breadList = [
                { type: "text", color: "#333", msg: '环比分析列表' },
                { type: "text", color: "#333", msg: deptName },
                {
                    type: "button",
                    color: "#5370FD",
                    msg: `${title}-${customerName}`,
                    isBack : true
                },
                { type: "text", color: "#333", msg: projectName },
            ]
            switchDeptModal.selectItem = projectId
            getProjectData()
            break;
        default:
            break;
    }
    $bus.emit("updateStructure", breadList);
})

</script>

<style lang="scss" scoped>
.img {
    vertical-align: middle;
    margin: 0 12px;
}
.m-r-40{
    margin-right: 40px;
}
.m-r-170{
    margin-right: 170px;
}
.chartContainer{
    height: 600px;
}
.modal-title {
  color: #5a5a5a;
  font-size: 14px;
  font-weight: bold;
}
:deep(.checkbox-group){
    background: #F2F3F5;
    padding:4px
}
:deep(.arco-checkbox-group .arco-checkbox){
    margin-right : 0
}
:deep(.checkbox-group .checkbox-tag){
    font-size:13px
}
:deep(.checkbox-group .checkbox-tag1){
    margin-left:-4px
}
:deep(.checkbox-group .checkbox-tag2){
    margin-left:-2px
}
:deep(.checkbox-group .checkbox-tag-active){
    background : white
}
:deep(.checkbox-group .checkbox-tag:hover){
    background : white
}
.yCenter{
    display : flex;
    flex-direction : column;
    justify-content:center
}
</style>