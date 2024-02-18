<template>
    <div class='defaultPadding'>
        <div>
            <table-head-top 
                :tableProps="tableContent" 
                rootDom="#a-layout-main" 
                scrollEvtName="handleScroll"
            >
            </table-head-top>
        </div>
        <div class="m-t-100">
            <table-head-top 
                :tableProps="tableContent" 
                rootDom="#a-layout-main" 
                scrollEvtName="handleScroll"
            >
            </table-head-top>
        </div>
        <div class="m-t-100">
            <table-head-top 
                :tableProps="tableContent" 
                rootDom="#a-layout-main" 
                scrollEvtName="handleScroll"
            >
            </table-head-top>
        </div>
    </div>
</template>

<script setup>
import tableHeadTop from './tableHeadTop.vue'
import {tableHeadTopColumns} from './constColumns.js';
import { reactive,markRaw } from 'vue'
const tableContent = reactive({
    columns : tableHeadTopColumns,
    dataSource : [],
    loading: false,
    pagination : false
})
//获取列表数据
  const getList = ()=>{
    tableContent.loading = true
    let data = []
    for (let i = 0; i < 20; i++) {
        let obj = {}
        tableHeadTopColumns.forEach((item,j)=>{
            obj[item.dataIndex] = item.title+i*j
        })
        data.push(obj)
    }
    tableContent.dataSource = data
    tableContent.loading = false
  }
  getList()
</script>

<style lang="scss">
.m-t-100{
    margin-top : 100px;
}
</style>