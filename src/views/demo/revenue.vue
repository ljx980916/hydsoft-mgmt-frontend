<template>
  <div class="defaultPadding layout-demo">
    <header>
       <a-space>
        <div class="tag">部门</div>
        <span  class="dept">BG1</span>
        </a-space>
    </header>
    <main>
        <div>
            <!-- 营业收入 -->
            <CollapseTable 
                :title="'营业收入'"
                :columns = "dataContent.columns" 
                :data = "dataContent.dataSource" 
                :loading ="dataContent.loading"
                :expandedRowKeys="expandedRowKeys"
                @expandedChange="expandedChange"
            />
        </div>
         <!-- 外币 -->
        <div>
            <NoCollapseTable
                :title="'外币'"
                :columns = "tableContent.columns" 
                :data = "tableContent.dataSource" 
                :loading ="tableContent.loading"
                :setColumnsData="dataContent.dataSource"
            />
        </div>
        
    </main>
  </div>
</template>


<script setup>
import { ref,reactive } from 'vue';
import {revenueColumns} from './constColumns.js';
import {getRevenueList,getForeignCurrency} from '@/api/revenue.js';
import {dealData,getCurrentDate} from '@/utils/util.js';
import CollapseTable from '@/components/collapseTable.vue';
import NoCollapseTable from '@/components/noCollapseTable.vue';
import {countWorkdaysByMonth} from "@/api/drillAnalyze.js";
let { year} = getCurrentDate();
const expandedRowKeys = ref([]);
// 折叠表格配置信息
const dataContent = reactive({
  columns: revenueColumns,
  dataSource: [],
  loading: false
});
// 表格配置信息
const tableContent = reactive({
  columns: revenueColumns,
  dataSource: [],
  loading: false
});
// 已展开的数据行发生改变时触发
const expandedChange = (rowkeys)=>{
    expandedRowKeys.value = rowkeys
};
// 获取收入列表数据
const getRevenueTable = ()=>{
    revenueColumns.forEach(item=>{
        let month = 0;
        if(item.dataIndex.substring(0,5)=='month'){
            item.titleSlotName = item.dataIndex;
            if(Number(item.dataIndex.substring(5))<10){
                month = `0${item.dataIndex.substring(5)}`
            }else{
                month = item.dataIndex.substring(5)
            }
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
    getRevenueList().then(res=>{
        if(res.code =='000000000000'){
            dataContent.dataSource =  dealData(res.data.list).arr;
            expandedRowKeys.value = dealData(res.data.list).keyArr;
        }
    })
};
getRevenueTable()
//获取外币列表数据
const getForeignCurrencyTable =()=>{
    getForeignCurrency().then(res=>{
        if(res.code =='000000000000'){
            tableContent.dataSource = dealData(res.data.list).arr;
        }
    })
};
getForeignCurrencyTable()
</script>

<style lang="scss" scoped>
.tag{
    border-width: 0px;
    position:relative;
    left:-40px;
    top:6px;
    width: 66px;
    height: 29px;
    background: linear-gradient(210deg, rgba(168, 113, 227, 1) 0%, rgba(168, 113, 227, 1) 0%, rgba(141, 78, 218, 1) 100%, rgba(141, 78, 218, 1) 100%);
    border: none;
    border-radius: 2px;
    box-shadow: none;
    color:#fff;
    font-weight: 600;
    text-align: center;
    line-height: 29px;
    transform-style:preserve-3d;
}
.tag::after{
    content: '';
    position:absolute;
    left:-8px;
    top:20px;
    width: 0;
    height: 0;
    border: 9px solid;
    border-color: transparent transparent rgb(113, 52, 178);
    transform:translateZ(-1px) rotate(270deg);
}
.dept{
    font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC';
    font-weight: bold;
    font-style: normal;
    color: #4C5767;
    margin: 12px 0px 0px 0px;
}
:deep(.arco-icon-plus){
    background-image: url(@/assets/images/Triangle-right.png);
    background-size: 110% 100%;
    width: 14px!important;
    height: 14px!important;
    color: #FFFFFF00;
    background-position:center;
    background-repeat: no-repeat;
}
:deep(.arco-icon-minus){
	background-image: url(@/assets/images/Triangle-bottom.png);
    background-size: 110% 100%;
    background-repeat: no-repeat;
    width: 14px!important;
    height: 14px!important;
    color: #FFFFFF00;
    background-position:center;
}
:deep(.arco-table .arco-table-expand-btn){
    background-color: #fff !important;
}
:deep(.activeRowGreen > .arco-table-td) {
    background-color: rgb(234, 248, 243) !important;
}
:deep(.activeRowPurple > .arco-table-td) {
    background-color: rgb(240, 237, 248) !important;
}
.layout-demo{
    width: 97% !important;
    height:auto;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
    border-right:none;
}
</style>