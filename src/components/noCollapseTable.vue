<template>
  <div>
      <!-- 不折叠表格部分 -->
      <!-- 环比差按钮及数据设置 -->
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
              <!-- 数据设置 -->
              <a-trigger trigger="click" v-model:popup-visible="popupVisible"   update-at-scroll  :popup-translate="[-50, 20]" style="width: 160px;background-color: white;box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);">
                <icon-settings style="color:#5370FF;margin-left:20px;font-size: 14px;font-weight:500" @click="handleSetting"/>
                <template #content>
                    <div>
                        <div class="title"> 
                            数据设置
                        </div>
                        <div  style="height:180px;overflow: scroll;">
                            <a-checkbox-group v-model="defaultCheckList" @change="changeSet">
                                <a-checkbox  v-for="item of setColumnsList" :key="item.id" :value="item.id" class="m-t-10">
                                    {{ item.analysis }}
                                </a-checkbox>
                            </a-checkbox-group>
                        </div>
                    </div>
                    <div style="display:flex;align-items: center;justify-content: center;width:100%;height:40px;box-shadow: 0px -5px 6px -5px rgba(0, 0, 0, 0.2);">
                        <a-button style="width: 50px;height:25px;" @click="handleCancle">取消</a-button>
                        <a-button style="width: 50px;height:25px;margin-left:10px;" type="primary" @click="handleOk">确认</a-button>
                    </div>
                </template>
             </a-trigger>
          </div>
      </div>
      <!-- 表格部分 -->
      <a-table 
      class="m-t-20 arcoTable_columnsWidthAuto" 
      :columns="(props.columns.length && props.columns) || []"  
      :data="dataSource.length>0?dataSource:props.data"  
      :loading="props.loading"
      :pagination="false" 
      :row-class="activeRowClass"
      show-empty-tree 
      :bordered="{wrapper: true, cell: true}" 
      />
      <!-- 环比差弹窗 -->
      <Different :modalVisible="modalVisible" :data="dataSource.length>0?dataSource:props.data"  :columns="props.columns" @handleClose="handleClose"/>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import {dealData} from '@/utils/util.js';
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
    setColumnsData:{
        type: Array,
        default: () => [],
    },
    // 表头
    data: {
        type: Array,
        default: () => [],
    },
    loading:{
        type:Boolean,
        default:false
    },
});
const modalVisible = ref(false);
const setColumnsList = ref([]);
const defaultCheckList = ref([]);
const dataSource  = ref(props.data);
const popupVisible = ref(false);
// 单行高亮处理
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
//数据配置回显
const dealsetColumns =(arr)=>{
    Array.isArray(arr) && arr.forEach(item=>{
        setColumnsList.value.push({
            id:item.key,
            analysis: item.analysis
        })
        if(item.children && item.children.length){
            dealsetColumns(item.children)
        }
    })
}
// 点击数据设置
const handleSetting = ()=>{
    setColumnsList.value = []
    defaultCheckList.value = []
    dealsetColumns(props.setColumnsData);
    dataSource.value.forEach(item=>{
        setColumnsList.value.forEach(ele=>{
            if(item.key === ele.id){
                defaultCheckList.value.push(item.key)
            }
        })
    })
}
// 更改数据设置
const changeSet =(val)=>{
    defaultCheckList.value = val;
}
// 数据迁移
const dealSet=(arr,setArr)=>{
    Array.isArray(arr) && arr.forEach(item=>{
        if(defaultCheckList.value.indexOf(item.key)!==-1){
                if(item.children){
                    let itemObj = JSON.parse(JSON.stringify(item));
                    delete itemObj.children
                    setArr.push(itemObj);
                }else{
                    setArr.push(item);
                }
        }
        if(item.children && item.children.length){
            dealSet(item.children,setArr)
        }
    })
    return setArr
};
// 数据设置确定
const handleOk =()=>{ 
    let  setArr =[]
    dataSource.value = props.data;
    setArr = dealSet(props.setColumnsData,setArr);
    dataSource.value = setArr.concat(dataSource.value);
    popupVisible.value = false
};
// 取消
const handleCancle= ()=>{
    popupVisible.value = false
};
</script>

<style lang="scss" scoped>
:deep(.activeRowGreen > .arco-table-td) {
    background-color: rgb(234, 248, 243) !important;
}
:deep(.activeRowPurple > .arco-table-td) {
    background-color: rgb(240, 237, 248) !important;
}
:global(.arco-dropdown-group-title){
    background-color: white;
    position: fixed;
    margin-top:-40px !important;
    z-index:9999;
    font-size:12px;
    color:rgba(0, 0, 0, 0.647058823529412);
}
.title{
    font-size:12px;
    color:rgba(0, 0, 0, 0.647058823529412);
    box-shadow: 0.2px 1px 1px rgba(0, 0, 0, 0.2);
    padding: 10px;
}
</style>