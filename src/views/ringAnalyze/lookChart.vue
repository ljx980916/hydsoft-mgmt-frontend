<template>
    <div class="defaultPadding">
        <header class="flex-center">
            <div class="flex">
                <div class="m-r-90">
                    <span>
                        <img :src="barChart" width="26" class="img">
                    </span>
                    <a-select :style="{width:'192px'}" v-model:model-value="barChartSelect" @change="selectChange">
                        <a-option 
                            v-for="item of barChartOptions" 
                            :key="item.dataIndex"
                            :value="item.dataIndex"
                        >
                            {{ item.title }}
                        </a-option>
                    </a-select>
                </div>
                <div class="m-r-80">
                    <img :src="lineChart" width="26" class="img">
                    <a-radio-group type="button" size="large" v-model:model-value="lineChartSelect" @change="selectChange">
                        <a-radio value="colNo12">C1发薪人数</a-radio>
                        <a-radio value="colNo13">R/S/G/C2发薪人数</a-radio>
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
    <a-modal v-model:visible="switchDeptModal.visible" width="650px" title-align="start">
        <template #title>
            <span class="modal-title">切换{{ sourceTypeMap[sourceType] }}</span>
        </template>
        <a-spin :loading="switchDeptModal.loading" style="width:100%" tip="数据加载中...">
            <a-cascader-panel :options="switchDeptModal.options" v-model="switchDeptModal.selectItem" expand-child/>
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
import { onMounted, reactive, ref, unref,onBeforeMount } from 'vue';
import * as echarts from 'echarts';
import { queryYoyAnalysisDept,queryYoyAnalysisChart,queryCustomerYoyAnalysisChart,getProjectEcharts,getCustomer,getProject} from '@/api/lookChart'
import { Message } from "@arco-design/web-vue";
import { getCurrentTime } from '@/utils/util'
let { year,month } = getCurrentTime();
const barChart = require('@/assets/images/barChart.svg')
const lineChart = require('@/assets/images/lineChart.svg')
import { getCurrentInstance } from "@vue/runtime-core";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
let { barChartOptions,deptId,sourceType,deptName,customerName,projectName,title,taxRate,projectId } = window.history.state
barChartOptions = JSON.parse(barChartOptions).filter(item=>item.title !== '发薪人数')
const chartContainerRef = ref(null)
const chartContainerLoading = ref(false)
let sourceTypeMap = {
    dept : '部门',
    customer : '客户',
    project : '项目'
}
let myChart
const barChartSelect = ref('colNo2')
const lineChartSelect = ref('colNo12')
const selectChange =()=>{
    updateData()
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
            interval : month-1
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
            interval : month-1
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
            interval : month-1
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
//部门数据
const getChartData = (id)=>{
    let params = {
        deptId : id || deptId,
        barType : unref(barChartSelect),
        lineType :unref(lineChartSelect),
        tagKey : "yoyAnalysis",
        interval : month-1,
    }
    chartContainerLoading.value = true
    queryYoyAnalysisChart(params).then(res=>{
        if(res.code === '200'){
            let { lastYear,thisYear } = res.data
            chartOptions.legend = {
                data: [` ${year-1}`,` ${year}`,`${year-1} `,`${year} `],
                bottom : 0,
            }
            chartOptions.series =[ 
                {
                    name: ` ${year-1}`,
                    type: 'bar',
                    yAxisIndex: 2,
                    itemStyle: {
                        color : '#6BD4B3'
                    },
                    data: lastYear.bar
                },
                {
                    name: ` ${year}`,
                    type: 'bar',
                    yAxisIndex: 2,
                    itemStyle: {
                        color : '#3491FA'
                    },
                    data: thisYear.bar
                },
                {
                    name: `${year-1} `,
                    type: 'line',
                    itemStyle: {
                        color : '#FA6E6C'
                    },
                    data: lastYear.line
                },
                {
                    name: `${year} `,
                    type: 'line',
                    itemStyle: {
                        color : '#0D8731'
                    },
                    data: thisYear.line
                },
            ]
            if(myChart){
                myChart.setOption(chartOptions);
            }
        }else {
            Message.error(res.message || '数据请求失败')
        }
    }).catch(err=>{
        Message.error(err.message || '数据请求失败')
    }).finally(()=>{
        chartContainerLoading.value = false
    })
}
//客户数据
const getCustomerChart = (name)=>{
    let params = {
        deptId,
        barType : unref(barChartSelect),
        lineType :unref(lineChartSelect),
        interval : month-1,
        tagKey:"yoyAnalysis2",
        title : name || title,
    }
    chartContainerLoading.value = true
    queryCustomerYoyAnalysisChart(params).then(res=>{
        if(res.code === '200'){
            let { lastYear,thisYear } = res.data
            chartOptions.legend = {
                data: [` ${year-1}`,` ${year}`,`${year-1} `,`${year} `],
                bottom : 0,
            }
            chartOptions.series =[ 
                {
                    name: ` ${year-1}`,
                    type: 'bar',
                    yAxisIndex: 2,
                    itemStyle: {
                        color : '#6BD4B3'
                    },
                    data: lastYear.bar
                },
                {
                    name: ` ${year}`,
                    type: 'bar',
                    yAxisIndex: 2,
                    itemStyle: {
                        color : '#3491FA'
                    },
                    data: thisYear.bar
                },
                {
                    name: `${year-1} `,
                    type: 'line',
                    itemStyle: {
                        color : '#FA6E6C'
                    },
                    data: lastYear.line
                },
                {
                    name: `${year} `,
                    type: 'line',
                    itemStyle: {
                        color : '#0D8731'
                    },
                    data: thisYear.line
                },
            ]
            if(myChart){
                myChart.setOption(chartOptions);
            }
        }else {
            Message.error(res.message || '数据请求失败')
        }
    }).catch(err=>{
        Message.error(err.message || '数据请求失败')
    }).finally(()=>{
        chartContainerLoading.value = false
    })
}
//项目数据
const getProjectEchart = (obj)=>{
    let params = {
        deptId,
        barType : unref(barChartSelect),
        lineType :unref(lineChartSelect),
        interval : month-1,
        title : obj?.projectName || projectName,
        tagKey:"yoyAnalysis3",
        taxRate : obj?.taxRate || taxRate,
        projectId : obj?.projectId || projectId
    }
    chartContainerLoading.value = true
    getProjectEcharts(params).then(res=>{
        if(res.code === '200'){
            let { lastYear,thisYear } = res.data
            chartOptions.legend = {
                data: [` ${year-1}`,` ${year}`,`${year-1} `,`${year} `],
                bottom : 0,
            }
            chartOptions.series =[ 
                {
                    name: ` ${year-1}`,
                    type: 'bar',
                    yAxisIndex: 2,
                    itemStyle: {
                        color : '#6BD4B3'
                    },
                    data: lastYear.bar
                },
                {
                    name: ` ${year}`,
                    type: 'bar',
                    yAxisIndex: 2,
                    itemStyle: {
                        color : '#3491FA'
                    },
                    data: thisYear.bar
                },
                {
                    name: `${year-1} `,
                    type: 'line',
                    itemStyle: {
                        color : '#FA6E6C'
                    },
                    data: lastYear.line
                },
                {
                    name: `${year} `,
                    type: 'line',
                    itemStyle: {
                        color : '#0D8731'
                    },
                    data: thisYear.line
                },
            ]
            if(myChart){
                myChart.setOption(chartOptions);
            }
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
                getCustomerChart(item.title)
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
                let { finPcode ,taxRate,projectName } = item
                getProjectEchart({
                    projectId :finPcode,
                    taxRate,
                    projectName
                })
                break;
            default:
                break;
        }
    }
}
const updateData = ()=>{
    let breadList
    switch (sourceType) {
        case 'dept':
            breadList = [
                { type: "text", color: "#333", msg: '同比分析列表' },
                {
                    type: "button",
                    color: "#5370FD",
                    msg: deptName,
                    isBack : true
                },
            ]
            getChartData()
            break;
        case 'customer':
            breadList = [
                { type: "text", color: "#333", msg: '同比分析列表' },
                { type: "text", color: "#333", msg: deptName },
                {
                    type: "button",
                    color: "#5370FD",
                    msg: title,
                    isBack : true
                },
            ]
            getCustomerChart()
            break;
        case 'project':
            breadList = [
                { type: "text", color: "#333", msg: '同比分析列表' },
                { type: "text", color: "#333", msg: deptName },
                { type: "text", color: "#333", msg:  `${title}-${customerName}`},
                {
                    type: "button",
                    color: "#5370FD",
                    msg: projectName,
                    isBack : true
                },
            ]
            getProjectEchart()
            break;
        default:
            break;
    }
    $bus.emit("updateStructure", breadList);
}
onBeforeMount(()=>{
    updateData()
})

const chartOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left : '15%',
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                        alignWithLabel: true
                    },
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
            },
        ],
        yAxis: [
            {
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
                min : 10,
                max : 100,
                type: 'value',
                position: 'left',
                offset: 80,
                boundaryGap: [0, 0.01],
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
            },
            {
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
            }
        ],
        series: []
    }
onMounted(()=>{
    myChart = echarts.init(unref(chartContainerRef));
    chartOptions && myChart.setOption(chartOptions);
})

</script>

<style lang="scss" scoped>
.img {
    vertical-align: middle;
    margin: 0 12px;
}
.m-r-90{
    margin-right: 90px;
}
.m-r-80{
    margin-right: 80px;
}
.chartContainer{
    height: 600px;
}
.modal-title {
  color: #5a5a5a;
  font-size: 14px;
  font-weight: bold;
}
</style>