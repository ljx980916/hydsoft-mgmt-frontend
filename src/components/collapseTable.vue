<template>
    <div>
        <!-- 折叠表格部分  -->
        <!-- 环比差按钮 -->
        <div class="m-t-40 flex-between">
            <div class="flex-column-start">
                <a-button type="text" style="color:#333">
                    <template #icon>
                        <icon-layers />
                    </template>
                    <h3>{{ props.title }}</h3>
                </a-button>
                <span style="font-size: 12px;color:#666;font-weight: 500;margin-top:6px">金额单位：万元</span>
            </div>
            <div>
                <a-button type="text" style="color:#5370FF;font-weight:500" @click="handleDifference">
                    环比差
                </a-button>
            </div>
        </div>
        <!-- 表格  -->
        <a-table 
        class="m-t-20 arcoTable_columnsWidthAuto arcoTable_tr_color" 
        :columns="(props.columns.length && props.columns) || []"  
        :data="props.data"  
        :loading="props.loading"
        :expanded-keys="props.expandedRowKeys"
        :pagination="false" 
        :row-class="activeRowClass"
        show-empty-tree 
        :bordered="{wrapper: true, cell: true}" 
        @expanded-change="expandedChange">
            <template  v-for="item in props.columns" :key = "item.dataIndex"  #[item.titleSlotName]>
                <span>{{ item.title }}<span style="color:#999;font-size:12px">({{ item.days }}天)</span></span>
            </template>
        </a-table>
        <!-- 环比差弹窗  -->
        <Different :modalVisible="modalVisible" :data="props.data" :columns="props.columns" @handleClose="handleClose"/>
    </div>
  </template>
  
<script setup>
import { ref} from 'vue';
import Different from  '@/components/different.vue';
const props = defineProps({
    title:{
        type:String,
        default:''
    },
    columns: {
        type: Array,
        default: () => [],
    },
    data: {
        type: Array,
        default: () => [],
    },
    loading:{
        type:Boolean,
        default:false
    },
    expandedRowKeys:{
        type: Array,
        default: () => [],
    },
});
const expandedRowKeys = ref(props.expandedRowKeys);
const modalVisible = ref(false);
const emit = defineEmits([
"expandedChange"
]);
// 已展开的数据行发生改变时触发
const expandedChange = (rowkeys)=>{
    expandedRowKeys.value = rowkeys;
    emit("expandedChange", expandedRowKeys.value);
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
// 打开环比差
const handleDifference = () => {
    modalVisible.value = true;
};
// 关闭
const handleClose = () => {
    modalVisible.value = false;
};
</script>
  
  <style lang="scss" scoped>
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
  </style>