<template>
    <div class="defaultPadding">
        <a-tabs v-model:active-key="activeTab">
            <a-tab-pane key="1" title="文件上传">
                <a-form :model="form" :style="{ width: '700px',margin :'20px auto' }" ref="formRef">
                    <a-form-item 
                        field="month" 
                        label="选择月份"
                        :rules="[{required:true,message:'请选择月份'}]"
                        :validate-trigger="['change']"
                    >
                        <a-month-picker v-model:model-value="form.month" style="width: 120px;" :allow-clear="false" />
                    </a-form-item>
                    <a-form-item 
                        field="upload" 
                        label="上传文件"
                        :rules="[{required:true, type:'array' ,message:'请选择上传文件'}]"
                    >
                        <div class="form-upload-content">
                            <a-upload 
                                draggable 
                                :file-list="form.upload"
                                tip="提示: 最多上传一个文件"
                                class="form-upload"
                                :custom-request="customRequest"
                                accept=".xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                @before-upload="onBeforeUpload"
                                @before-remove="onBeforeRemove"
                                @success="uploadSuccess"
                            >
                                <template #file-name="{fileItem :{name}}">
                                    <span style="color: #333;">
                                        {{ name }}
                                    </span>
                                </template>
                            </a-upload>
                            <div class="form-upload-template flex-between">
                                <span style="color: #F76560;">
                                    注意：美国实体公司的人员成本数据，需将美元转算成人民币
                                </span>
                                <a-button type="text">下载人员数据上传模板</a-button>
                            </div>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" style="width:100px" :loading="uplaodLoading" @click="handleSubmit">提交</a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" title="上传记录">
                <a-table
                    class="m-t-20"
                    :columns="dataContent.columns"
                    :data="dataContent.dataSource"
                    :bordered="false"
                    column-resizable 
                    :scroll="{y:600}"
                    :scrollbar="false" 
                    :pagination="false"
                    :loading = "dataContent.loading"
                >
                </a-table>
            </a-tab-pane>
        </a-tabs>
        <a-modal v-model:visible="reslultModalVisible" title="上传结果" title-align="start" width="755px">
            <div style="padding: 0 10px 0 10px;">
                <div class="m-b-10">
                    <a-result status="error" title="上传失败" style="padding: 0;">
                    </a-result>
                </div>
                <div class="m-b-26">
                    <div class="txt m-b-10">文件名称：{{ resultPageInfo.fileName }}</div>
                    <div class="txt m-b-10">上传时间：{{ resultPageInfo.uploadTime }}</div>
                    <!-- <div class="txt">导入失败员工：{{ resultPageInfo.failCount }}个</div> -->
                </div>
                <a-table 
                    :columns="resultPageInfo.resultTableInfo.columns" 
                    :data="resultPageInfo.resultTableInfo.data"
                    column-resizable 
                    :bordered="{wrapper: true, cell: true}"
                    :pagination="false"
                    :scroll="{x:'100%',y:'120px'}" 
                >

                </a-table>
            </div>
            <template #footer>
                <div style="text-align: center;">
                    <a-button type="primary" @click="resultModalClick">知道了</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup>
import { reactive,ref,watchEffect,onBeforeMount } from 'vue'
import { getCurrentInstance } from "@vue/runtime-core";
import { Modal,Message } from '@arco-design/web-vue';
import { importStaffCompositeCost,queryImportRecord } from '@/api/staffCompositeCost';
import moment from 'moment'
let formData = new FormData();
const formRef = ref(null)
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus

/************** 页面路径********************* */
const activeTab = ref('1')
watchEffect(()=>{
    $bus.emit('updateStructure',[{type : 'text',color : '#333',msg : '人员综合成本 / 文件上传'}])
})
/************** 页面路径********************* */

/****************** 文件上传数据**************************** */
const form = reactive({
    month : moment(new Date()).format('YYYY-MM'),
    upload : []
})
/****************** 文件上传数据**************************** */

const dataContent = reactive({
    columns : [
        {
            title : '录入月份',
            dataIndex : 'periodNumber',
            width : 100
        },
        {
            title : '上传文件名',
            dataIndex : 'fileName',
            width : 580
        },
        {
            title : '上传结果',
            dataIndex : 'uploadResults',
            width : 120
        },
        {
            title : '录入人员',
            dataIndex : 'createOperator',
            width : 116
        },
        {
            title : '录入时间',
            dataIndex : 'createTime',
            width : 226
        },
    ],
    dataSource : [],
    loading : false
})

/******************* 文件上传结果Modal***************************** */
const reslultModalVisible = ref(false)
const uplaodLoading = ref(false)
const resultPageInfo = reactive({
    fileName : '',
    uploadTime : '',
    failCount : '',
    resultTableInfo : {
        columns : [
            {
                title : '所在行',
                dataIndex : 'row',
                width : 80
            },
            {
                title : '错误信息',
                dataIndex : 'msg',
                width : 470
            },
        ],
        data : []
    }
})
const handleSubmit = () => {
    if(formData.get('yearMonth'))formData.delete('yearMonth')
    formData.append('yearMonth',form.month.replaceAll('-',''))
    formRef.value && formRef.value.validate().then(err=>{
        if(err === undefined){
            Modal.warning({
                title: '上传提醒',
                content: '上传后，将整体覆盖该月人员薪资数据，你还要继续吗？',
                hideCancel :false,
                modalClass : 'warningModal',
                onOk(){
                    uplaodLoading.value = true
                    importStaffCompositeCost(formData).then(res=>{
                        if(res.code === '200'){
                            Message.success(res.desc || '上传成功')
                            form.upload = []
                            if(formData.get('file'))formData.delete('file')
                        }
                        if(res.code === '300'){
                            if(res?.data?.errorMsgList && res.data.errorMsgList.length){
                                reslultModalVisible.value = true
                                let { fileName ,failCount,uploadTime,errorMsgList } = res.data
                                resultPageInfo.fileName = fileName
                                resultPageInfo.uploadTime = uploadTime
                                resultPageInfo.failCount = failCount
                                resultPageInfo.resultTableInfo.data = errorMsgList
                            }else {
                                Message.error(res.desc || '模板导入失败')
                            }
                            form.upload = []
                            if(formData.get('file'))formData.delete('file')
                        }
                    }).finally(()=>{
                        uplaodLoading.value = false
                    })
                }
            });
            
        }
    })
    
    
    };
const resultModalClick = ()=>{
    form.upload = []
    reslultModalVisible.value = false
    formData = new FormData()
}
/******************* 文件上传结果Modal***************************** */

/******************** 请求上传记录数据************************** */
onBeforeMount(()=>{
    uploadRecord()
})
const uploadRecord = ()=>{
    queryImportRecord().then(res=>{
        dataContent.dataSource = res.data
    })
}
/******************** 请求上传记录数据************************** */

/******************* 文件上传相关方法****************************** */
const onBeforeUpload = file =>{
    if(form.upload.length > 0){
        Message.error('只能上传一个文件')
        return Promise.reject()
    }
    return true
}
const onBeforeRemove = ()=>{
    formData = new FormData()
    form.upload = []
    return true
}

const uploadSuccess = fileItem =>{
    form.upload = [fileItem]
    formRef.value && formRef.value.validateField('upload')
}
const customRequest = (option)=>{
    const {onProgress, onError, onSuccess, fileItem, name} = option
    formData.append(name || 'file', fileItem.file);
    onSuccess('success')
}
/******************* 文件上传相关方法****************************** */

</script>

<style lang="scss">
.form-upload-content{
    position: relative;
    width: 100%;
    .form-upload-template{
        position: absolute;
        left: 0;
        top: 180px;
        font-size: 12px;
        width: 100%;
    }
}
.form-upload .arco-upload-list.arco-upload-list-type-text, .arco-upload-list.arco-upload-list-type-picture{
    margin-top: 38px;
}
.txt{
    color: #333;
    font-size: 14px;
}
.warningModal .arco-modal-header .arco-modal-title-icon svg{
    color: rgb(var(--warning-5));
}
</style>