<template>
  <div>
    <!-- 环比配置 -->
    <a-modal  title="环比配置" width="auto" title-align="start" v-model:visible="visible" :footer="null" :body-style="{padding:'25px'}" @close="handleClose">
        <div>
            <a-table 
                class="arcoTable_columnsWidthAuto" 
                :columns="dataContent.columns ||[]"  
                :data="(dataContent.dataSourse.length && dataContent.dataSourse) || []"  
                :loading="dataContent.loading"
                :pagination="false" 
                :expanded-keys="expandedRowKeys"
                @expanded-change="expandedChange"
                show-empty-tree 
                :row-class="activeRowClass"
                :bordered="{wrapper: true, cell: true}" 
            >
                <template  v-for="item in dataContent.columns" :key = "item.dataIndex"  #[item.titleSlotName]>
                        <span v-if="item.titleSlotName =='monthAfter' || item.titleSlotName =='monthBefore'">{{ item.title }}<span style="color:#999;font-size:12px">({{ item.days }}天)</span></span>
                        <span v-if="item.titleSlotName =='QAfter' || item.titleSlotName =='QBefore'">{{ item.title }}</span>
                       <a-month-picker 
                        v-if="item.titleSlotName =='monthBefore'"
                        v-model:pickerValue="monthBeforeValue" 
                        @change="changeTime($event,'MB')"
                        size="mini"
                        position="bottom"
                        >
                            <Icon icon="caret-down"></Icon>
                        </a-month-picker>
                        <a-month-picker 
                        v-if="item.titleSlotName =='monthAfter'"
                        v-model:pickerValue="monthAfterValue" 
                        @change="changeTime($event,'MA')"
                        size="mini"
                        position="bottom"
                        >
                            <Icon icon="caret-down"></Icon>
                        </a-month-picker>
                        <a-quarter-picker 
                        v-if="item.titleSlotName =='QBefore'" 
                        v-model:pickerValue="QBeforeValue" 
                        @change="changeTime($event,'QB')"
                        size="mini"
                        position="bottom">
                            <Icon icon="caret-down"></Icon>
                        </a-quarter-picker>
                        <a-quarter-picker 
                        v-if="item.titleSlotName =='QAfter'" 
                        v-model:pickerValue="QAfterValue" 
                        @change="changeTime($event,'QA')"
                        size="mini"
                        position="bottom">
                            <Icon icon="caret-down"></Icon>
                        </a-quarter-picker>
                    <!-- </div> -->
                </template>
            </a-table>
        </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref,reactive,watch,onBeforeMount} from 'vue';
import {differentColumns} from '@/views/demo/constColumns.js';
import Icon from '@/components/icon.vue';
import {getCurrentDate} from '@/utils/util.js';
import {countWorkdaysByMonth} from "@/api/drillAnalyze.js";
let { year} = getCurrentDate();
const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array,
        default: () => [],
    },
    modalVisible:{
        type:Boolean,
        default:false
    }
});
const dataContent = reactive({
    columns: JSON.parse(JSON.stringify(differentColumns)),
    dataSourse:[],
    loading: false
});
const visible = ref(props.modalVisible);
const expandedRowKeys = ref([]);
const monthBeforeValue = ref('');
const monthAfterValue = ref('');
const QBeforeValue = ref('');
const QAfterValue = ref('');
watch(
() => props.modalVisible,
(newVal, oldVal) => {
    if (newVal) {
        visible.value = newVal;
        dataContent.columns = JSON.parse(JSON.stringify(differentColumns));
        dataContent.dataSourse = dealDifferentData(props.data).arr;
        expandedRowKeys.value = dealDifferentData(props.data).keyArr;
    }
    }
);
onBeforeMount(()=>{
    differentColumns.forEach(item=>{
        let month = 0;
        if(item.dataIndex.substring(0,5)=='month'){
            month = item.dataIndex.substring(5)
            const params = {
                month: `${year}-${month}`,
            };
            countWorkdaysByMonth(params)
            .then(res => {
                if (res.code === "200") {
                    item.days = res.data;
                }
            })
            .catch(() => {
                Message.error("请求失败");
            });
        }
    })
})
const emit = defineEmits([
"handleClose"
]);
// 展开
const expandedChange = rowkeys =>{
    expandedRowKeys.value = rowkeys;
}
// 环差比数据处理
let keyArr = [];
const dealDifferentData = (arr)=>{
    let dataIndex1 = '';
    let dataIndex2 = '';
    let dataIndex3 = '';
    let dataIndex4 = '';
    dataContent.columns.forEach(ele=>{
        if(ele.titleSlotName =="monthBefore"){
            dataIndex1 = ele.dataIndex
        }
        if(ele.titleSlotName =="monthAfter"){
            dataIndex2 = ele.dataIndex
        }
        if(ele.titleSlotName =="QBefore"){
            dataIndex3 = ele.dataIndex
        }if(ele.titleSlotName =="QAfter"){
            dataIndex4 = ele.dataIndex
        }
    })
    Array.isArray(arr) && arr.forEach((item,index) => {
        keyArr.push(item.key);
        // 季度数据
        for(var i=1;i<=12;i++){
            if(item[`month${i}`] == '-'){
              item[`month${i}`] = 0 ;
            }
        } 
        item.Q1 = Number(item.month1 + item.month2 + item.month3).toFixed(2);
        item.Q2 = Number(item.month4 + item.month5 + item.month6).toFixed(2);
        item.Q3 = Number(item.month7 + item.month8 + item.month9).toFixed(2);
        item.Q4 = Number(item.month10 + item.month11 + item.month12).toFixed(2);
        if(isNaN(item.Q1) || item.Q1 == 0.00){
            item.Q1='-'
        }
        if(isNaN(item.Q2) || item.Q2 == 0.00){
            item.Q2='-'
        }
        if(isNaN(item.Q3)|| item.Q3 == 0.00){
            item.Q3='-'
        }
        if(isNaN(item.Q4)|| item.Q4 == 0.00){
            item.Q4='-'
        }
        for(var i=1;i<=12;i++){
            if(item[`month${i}`] == 0){
              item[`month${i}`] ='-' ;
            }
        } 
        // 月份
        if(!item.isRate){
            if(item[dataIndex2] !=='-' && item[dataIndex1] !=='-' ){
                item.monthDifferent = Number(item[dataIndex2]-item[dataIndex1]).toFixed(2);
                item.MonthonMonth = Number(((item[dataIndex2]-item[dataIndex1])/item[dataIndex1])*100).toFixed(2)+ '%';
            }else if(item[dataIndex1] !=='-' && item[dataIndex2] =='-' ){
                item.monthDifferent = Number(0-item[dataIndex1]).toFixed(2);
                item.MonthonMonth = Number(((0-item[dataIndex1])/item[dataIndex1])*100).toFixed(2)+ '%';
            } else if (item[dataIndex1] =='-' && item[dataIndex2] !=='-' ){
                item.monthDifferent = Number(item[dataIndex2]-0).toFixed(2);
                item.MonthonMonth = '-';
            }else{
                item.monthDifferent='-'
                item.MonthonMonth='-'
            }
        }else{
            if(item[dataIndex2] !=='-' && item[dataIndex1] !=='-' ){
                let num1= item[dataIndex1].substring(0,item[dataIndex1].length-1);
                let num2= item[dataIndex2].substring(0,item[dataIndex2].length-1);
                item.monthDifferent = Number(num2-num1).toFixed(2)+ '%';
                item.MonthonMonth = Number((num2-num1)/num1).toFixed(2)+ '%';
            }else if(item[dataIndex1] !=='-' && item[dataIndex2] =='-' ){
                let num1= item[dataIndex1].substring(0,item[dataIndex1].length-1);
                item.monthDifferent = Number(0-num1).toFixed(2)+ '%';
                item.MonthonMonth = Number((0-num1)/num1).toFixed(2)+ '%';
            } else if (item[dataIndex1] =='-' && item[dataIndex2] !=='-' ){
                let num2= item[dataIndex2].substring(0,item[dataIndex2].length-1);
                item.monthDifferent = Number(num2-0).toFixed(2)+ '%';
                item.MonthonMonth = '-';
            }else{
                item.monthDifferent='-'
                item.MonthonMonth='-'
            }
        }
        // 季度
        if(!item.isRate){
            if(item[dataIndex4] !=='-' && item[dataIndex3] !=='-' ){
                item.QDifferent = Number(item[dataIndex4]-item[dataIndex3]).toFixed(2);
                item.QonQ = Number(((item[dataIndex4]-item[dataIndex3])/item[dataIndex3])*100).toFixed(2)+ '%';
            }else if(item[dataIndex3] !=='-' && item[dataIndex4] =='-' ){
                item.QDifferent = Number(0-item[dataIndex3]).toFixed(2);
                item.QonQ = Number(((0-item[dataIndex3])/item[dataIndex3])*100).toFixed(2)+ '%';
            } else if (item[dataIndex3] =='-' && item[dataIndex4] !=='-' ){
                item.QDifferent = Number(item[dataIndex4]-0).toFixed(2);
                item.QonQ = '-';
            }else{
                item.QDifferent='-'
                item.QonQ='-'
            }
        }else{
            if(item[dataIndex4] !=='-' && item[dataIndex3] !=='-' ){
                let num1= item[dataIndex3].substring(0,item[dataIndex3].length-1);
                let num2= item[dataIndex4].substring(0,item[dataIndex4].length-1);
                item.QDifferent = Number(num2-num1).toFixed(2)+ '%';
                item.QonQ = Number((num2-num1)/num1).toFixed(2)+ '%';
            }else if(item[dataIndex3] !=='-' && item[dataIndex4] =='-' ){
                let num1= item[dataIndex3].substring(0,item[dataIndex3].length-1);
                item.QDifferent = Number(0-num1).toFixed(2)+ '%';
                item.QonQ = Number((0-num1)/num1).toFixed(2)+ '%';
            } else if (item[dataIndex3] =='-' && item[dataIndex4] !=='-' ){
                let num2= item[dataIndex4].substring(0,item[dataIndex4].length-1);
                item.QDifferent = Number(num2-0).toFixed(2)+ '%';
                item.QonQ = '-';
            }else{
                item.QDifferent='-'
                item.QonQ='-'
            }
        }
        if(item.children && item.children.length){
            dealDifferentData(item.children)
        }
    })
    
    return {arr,keyArr}
};
// 处理月份标题
const dealMonthTitle = (e,flag)=>{
    let str = e.substr(e.length - 2);
    let num =''
    if(str.substr(0,1)==0){
        num = str.substr(1)
    }else{
        num = str
    }
    props.columns.forEach(item=>{
        // 确定是month表头
        if(item.dataIndex.substr(0,5)=='month'){
            // 选择的月份 == 折叠表格的某个表头
            if(num == item.dataIndex.substr(5)){
                // 对应的表头更换
                dataContent.columns.forEach(ele=>{
                    if(flag =='MB'){
                        if(ele.titleSlotName == 'monthBefore'){
                            ele.dataIndex = item.dataIndex;
                            ele.title = num +'月';
                            ele.days = item.days;
                        }
                        if(ele.dataIndex =='monthDifferent'){
                            const parts = ele.title.split('-'); // 将字符串分割为两部分  
                            parts[1] = num; // 替换'-'后的数字  
                            ele.title = parts.join('-')+'月'; // 将两部分重新组合为字符串，并用'-'连接
                        }
                    }
                    if(flag =='MA'){
                        if(ele.titleSlotName == 'monthAfter'){
                            ele.dataIndex = item.dataIndex;
                            ele.title = num +'月';
                            ele.days = item.days;
                        }
                        if(ele.dataIndex =='monthDifferent'){
                            const parts = ele.title.split('-'); // 将字符串分割为两部分  
                            parts[0] = num; // 替换'-'前的数字  
                            ele.title = parts.join('-'); // 将两部分重新组合为字符串，并用'-'连接
                        }
                    }
                })
            }
        }
    })
    dataContent.dataSourse = dealDifferentData(props.data).arr;
};
// 处理季度标题
const dealQTitle = (e,flag)=>{
    let str = e.substr(e.length - 2);
    let num =''
    if(str.substr(0,1)==0){
        num = str.substr(1)
    }else{
        num = str
    }
    const  QList = [
        {
            label:'1',
            value:'Q1'
        },
        {
            label:'4',
            value:'Q2'
        },
        {
            label:'7',
            value:'Q3'
        },
        {
            label:'10',
            value:'Q4'
        },
    ]
    // 对应的表头更换
    dataContent.columns.forEach(ele=>{
        if(flag =='QB'){
            if(ele.titleSlotName == 'QBefore'){
                //num对应的Q
                ele.title = ele.dataIndex = QList.filter(item=>item.label == num)[0].value;
            }
            if(ele.dataIndex =='QDifferent'){
                const parts = ele.title.split('-'); // 将字符串分割为两部分  
                parts[1] = QList.filter(item=>item.label == num)[0].value; // 替换'-'后的数字
                ele.title = parts.join('-'); // 将两部分重新组合为字符串，并用'-'连接
            }
        }
        if(flag =='QA'){
            if(ele.titleSlotName == 'QAfter'){
                ele.title = ele.dataIndex = QList.filter(item=>item.label == num)[0].value;
            }
            if(ele.dataIndex =='QDifferent'){
                const parts = ele.title.split('-'); // 将字符串分割为两部分  
                parts[0] = QList.filter(item=>item.label == num)[0].value; // 替换'-'前的数字  
                ele.title = parts.join('-'); // 将两部分重新组合为字符串，并用'-'连接
            }
        }
    })
    dataContent.dataSourse = dealDifferentData(props.data).arr;
};
// 更改时间
const changeTime=(e,flag)=>{
    if(flag == 'MB'){
        monthBeforeValue.value = e;
        dealMonthTitle(e,flag);
    }
    if(flag == 'MA'){
        monthAfterValue.value = e;
        dealMonthTitle(e,flag);
    }
    if(flag == 'QA'){
        QAfterValue.value = e;
        dealQTitle(e,flag)
    }
    if(flag == 'QB'){
        QBeforeValue.value = e;
        dealQTitle(e,flag)
    }
};
// 关闭
const handleClose = ()=>{
    emit("handleClose", false);
};
//单行高亮处理
const activeRowClass = (record) => {
    if(record.raw.isGreenLight){
        return 'activeRowGreen'
    }else if(record.raw.isRate){
        return 'activeRowPurple'
    }else{
        return ''
    }
};
</script>

<style lang="scss" scoped>
:deep(.activeRowGreen > .arco-table-td) {
    background-color: rgb(234, 248, 243) !important;
}
:deep(.activeRowPurple > .arco-table-td) {
    background-color: rgb(240, 237, 248) !important;
}
</style>