<template>
    <div class="defaultPadding">
        <a-row :gutter="[14,20]" align="center">
            <a-col flex="120px">
                <a-month-picker v-bind:model-value="monthVal" @change="handleMothPicker"/>
            </a-col>
            <a-col flex="85px">
            </a-col>
            <a-col flex="85px">
            </a-col>
            <a-col flex="auto"></a-col>
            <a-col flex="100px">
                <a-button type="primary" :loading="exportLoading" @click="handleExport">
                <template #icon>
                  <icon-export />
                </template>
                <template #default>导出本页</template>
              </a-button>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24">
                <TableContainer
                    column-resizable
                    scrollY="600px"
                    :scrollbar="false"
                    :loading="dataContent.loading"
                    :paginationTotal="dataContent.pagination.total"
                    :paginationPageSize="dataContent.pagination.pageSize"
                    :paginationCurrent="dataContent.pagination.pageNum"
                    :tableColumns="dataContent.columns"
                    :table-data="dataContent.dataSource"
                    @paginationCurrentChange="paginationCurrentChange"
                    @paginationPageSizeChange="paginationPageSizeChange"
                    >
                </TableContainer>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import TableContainer from "@/components/tableContainer.vue";
import { empInfo, exportExcel } from '../../api/empInfo.js'
import { onBeforeMount, reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import moment from 'moment'

const monthVal = ref(new Date())

const handleMothPicker = (value,date)=>{
    monthVal.value = date
    getData()
}

const dataContent = reactive({
    loading : false,
    columns : [
        {
            title: '员工编号',
            dataIndex: 'empCode',
            key: 'empCode',
            width : 110    
        },
        {
            title: '员工姓名',
            dataIndex: 'empName',
            key: 'empName',
            width : 110    
        },
        {
            title: '成本中心',
            dataIndex: 'costCenterName',
            key: 'costCenterName',
            width : 110
        },
        {
            title: '所属实体',
            dataIndex: 'entityName',
            key: 'entityName',
            width : 250   
        },
        {
            title: '在职状态',
            dataIndex: 'status',
            key: 'status',
            width : 110    
        },
        {
            title: '所属部门',
            dataIndex: 'deptName',
            key: 'deptName',
            width : 200    
        },
        {
            title: '部门经理',
            dataIndex: 'deptManager',
            key: 'deptManager',
            width : 110    
        },
        {
            title: '客户名称',
            dataIndex: 'customerName',
            key: 'customerName',
            width : 250
        },
        {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
            width : 220   
        },
        {
            title: '入职时间',
            dataIndex: 'hireDate',
            key: 'hireDate',
            width : 110   
        },   
        {
            title: '离职时间',
            dataIndex: 'dismissDate',
            key: 'dismissDate',
            width : 150    
        },
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            width : 150   
        },   
        {
            title: '工作地',
            dataIndex: 'workPlace',
            key: 'workPlace',
            width : 110   
        },   
        {
            title: '员工属性',
            dataIndex: 'empAttr',
            key: 'empAttr',
            width : 110   
        },
    ],
    dataSource : [],
    pagination : {
        pageSize : 20,
        pageNum : 1,
        total : 10
    }

})

const exportLoading = ref(false)
const handleExport = ()=>{
    exportLoading.value = true
    let params = {
        month : moment(monthVal.value).format('yyyy-MM')
    }
    exportExcel(params)
    .then(res => {
      const blob = new Blob([res]);
      const fileName = `C1人员信息_${moment(monthVal.value).format('yyyyMM')}.xlsx`;
      const link = document.createElement("a");
      link.download = fileName;
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    })
    .catch(() => {
      Message.error("导出失败");
    })
    .finally(() => {
        exportLoading.value = false;
    });
}

onBeforeMount(()=>{
    getData()
})

const getData = ()=>{
    let params={
        month : moment(monthVal.value).format('yyyy-MM'),
        pageNum : dataContent.pagination.pageNum,
        pageSize : dataContent.pagination.pageSize
    }
    dataContent.loading = true
    empInfo(params).then(res=>{
        if(res.code === '000000000000'){
            let { list,total} = res.data
            dataContent.pagination.total = !isNaN(+total) && +total
            Array.isArray(list) && list.forEach((item,i)=>{
                item.key = item.empCode
            })
            dataContent.dataSource = list
        }
    }).catch(e=>{
        Message.error(e.message || '请求失败')
    }).finally(()=>{
        dataContent.loading = false
    })
} 
const paginationCurrentChange = (pageNum)=>{
    dataContent.pagination.pageNum = pageNum
    getData()
}
const paginationPageSizeChange = (pageSize)=>{
    dataContent.pagination.pageSize = pageSize
    getData()
}
</script>

<style lang="scss" scoped>
</style>