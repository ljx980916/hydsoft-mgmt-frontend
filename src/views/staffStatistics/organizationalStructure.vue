<template>
    <div class="defaultPadding relative" ref="treeContainerRef">
        <div class="radio-group-absolute">
            <a-radio-group type="button" v-show="sourceData.length" v-model:model-value="currentPage" @change="handleRadioChange">
                <a-radio value="tree">树状</a-radio>
                <a-radio value="list">列表</a-radio>
            </a-radio-group>
        </div>
        <div v-show="currentPage === 'tree'" :class="['treeBox',treeLoading && 'flex-center-h100']">
            <a-spin v-if="treeLoading" :loading="treeLoading" dot tip="数据正在加载中..." class="spin">
            </a-spin>
            <vue3-tree-org
                v-else
                :data="depTreeInfo.data"
                :collapsable="false"
                :horizontal="false"
                :scalable="false"
                :draggable="false"
                :define-menus="null"
                :node-draggable="false"
                :default-expand-level="Infinity"
                :label-class-name="labelClassNameFn"
                :toolBar="{ scale: false, restore: false, expand: false, zoom: false, fullscreen: false }"
            >
                <!-- 自定义节点内容 -->
                <template v-slot="{node}">
                    <div v-if="node.$$data.isSubdivision">
                        <indented-tree 
                            :treeData="sourceData.filter(item=>item.deptName === node.$$data.dept)[0]" 
                            nodeName="deptName"
                            :width="depTreeInfo.width"
                            :scale="depTreeInfo.scale" 
                        />
                    </div>
                    <div class="tree-org-node__text node-label" v-else>
                        {{ node.label }}
                    </div>
                </template>
            </vue3-tree-org>
        </div>
        <div v-show="currentPage === 'list'">
            <div class="m-b-20">
                <span>BG筛选 :  &nbsp;&nbsp;</span>
                <a-radio-group type="button" class="m-r-70" v-model:model-value="listTabs" @change="handleListTabsChange">
                    <a-radio value="all">全部</a-radio>
                    <a-radio v-for="(item,i) of sourceData" :value="item.deptName">{{ item.deptName }}</a-radio>
                </a-radio-group>
                <span>展开至 : &nbsp;&nbsp;</span>
                <a-radio-group type="button" v-model:model-value="expandTabs" @change="handleExpandTabsChange">
                    <a-radio value="level1">一级部门</a-radio>
                    <a-radio value="level2">二级部门</a-radio>
                    <a-radio value="all">末级部门</a-radio>
                </a-radio-group>
            </div>
            <a-table
                :columns="tableInfo.columns"
                :data="tableInfo.data"
                :bordered="{cell:true}"
                column-resizable
                :scroll="{ maxHeight: tableInfo.maxHeight }"
                :scrollbar="false"
                :pagination="false"
                :expanded-keys="tableInfo.defaultExpandedKeys"
                :loading="tableInfo.loading"
                ref="tableRef"
                @expanded-change="expandedChange"
                >
            </a-table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, nextTick, shallowRef, computed } from 'vue';
import { getDeptTree } from '../../api/organizationTree'
import IndentedTree from './IndentedTree.vue'
import { dataAddKey,toInteger } from '../../utils/util'

const treeContainerRef = ref(null)
const tableRef = ref(null);
const treeRoot = {
  id:1,
  label:"慧博云通",
  isSubdivision : false,
  style:{
    "color":"#FFFFFF",
    "background":"#5370FF",
    width:"190px",
    "letter-spacing":".2em",
    'font-size':"13px",
    height : "30px",
    "line-height": "10px"
 },
  children : []
}
const depTreeInfo = reactive({
    data : {},
    width : 304,
    scale : 1
})
const currentPage = ref('tree')
const handleRadioChange = val=>{
    currentPage.value = val
    let tree = treeContainerRef.value
    if(val === 'list'){
        nextTick(()=>{
            if(tableRef.value && tableInfo.maxHeight === '600px'){
                let head = tableRef.value.$el;
                let innerHeight = window.innerHeight;
                let elHeight = head.getBoundingClientRect().top;
                tableInfo.maxHeight = innerHeight - elHeight - 30 + "px";
            }
        })
    }
}
const listTabs = ref('all')
const handleListTabsChange = val=>{
    listTabs.value = val
    tableInfo.data = filterData(sourceData.value,val)
}
const labelClassNameFn = (record)=>{
    if(record.id === 1)return 'rootNode'
}
const expandTabs = ref('level1')
const handleExpandTabsChange = val=>{
    expandTabs.value = val
    tableInfo.defaultExpandedKeys = filterLevelkeys(sourceData.value,val)
}
const tableInfo = reactive({
    columns : [
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
            width : 270    
        },
        {
            title: '总裁室分管执行副总裁',
            dataIndex: 'evpName',
            key: 'evpName',
            width : 206
        },
        {
            title: '业务主管副总裁',
            dataIndex: 'bgName',
            key: 'bgName',
            width : 156
        },
        {
            title: '部门负责人',
            dataIndex: 'empName',
            key: 'empName',
            width : 170
        },
        {
            title: '部门总人数',
            dataIndex: 'deptTotal',
            key: 'deptTotal',
            width : 110,
            cellStyle: { "text-align": "right" },
            render : ({ record, column })=>{
                let val = record[column.dataIndex]
                if(typeof(val) === 'number'){
                    if(val === 0){
                        return '-'
                    }
                    return <span innerHTML={toInteger(val, 0, false)}></span>
                }
                return val
            }    
        },
        {
            title: '部门创建日期',
            dataIndex: 'createTime',
            key: 'createTime',
            width : 258
        }
    ],
    data : [],
    maxHeight : '600px',
    loading :false,
    defaultExpandedKeys : []
})

const expandedChange = rowKeys => {
  tableInfo.defaultExpandedKeys = rowKeys;
};
let sourceData = shallowRef([])
//树根节点样式
let rootNodeStyleWidth=ref('190px'),
    rootNodeStyleFontSize=ref('13px'),
    rootNodeStyleHeigt=ref('30px'),
    rootNodeStyleLineHeight=ref('10px')

const treeLoading = ref(false)
const asyncDrawGraph = async() => {
  treeLoading.value = true
  let depTreeData = await getDeptTree()
  if(depTreeData.code === '200'){
    let filterData = depTreeData.data.filter(item=>(''+item.deptName).startsWith('BG'))
    let expandedKeys = []
    filterData.forEach((item,index)=>{
      treeRoot.children.push({
        id: item.deptName,
        label:item.deptName, 
        isSubdivision : true,
        dept : item.deptName,
      })
      item.id=index
      expandedKeys.push(item.id)
    })
    sourceData.value = filterData
    dataAddKey(filterData,"key","id") 
    tableInfo.data = filterData
    tableInfo.defaultExpandedKeys = expandedKeys
    let tree = treeContainerRef.value
    let getContentWidth = tree && parseInt(getComputedStyle(tree).width)
    if(filterData.length >2){
        let constrain = Math.floor(getContentWidth/filterData.length)
        depTreeInfo.width = constrain - 20
        let scale = +(depTreeInfo.width/242).toFixed(2)
        depTreeInfo.scale = scale
        //设置树根节点跟随放大比例放大
        rootNodeStyleWidth.value = Math.ceil(190*scale)+'px'
        rootNodeStyleFontSize.value= Math.ceil(13*scale)+'px'
        rootNodeStyleHeigt.value = Math.ceil(30*scale)+'px'
        rootNodeStyleLineHeight.value = Math.ceil(10*scale)+'px'
    }
    depTreeInfo.data = treeRoot
  }
  treeLoading.value = false
}
onMounted(()=>{
    asyncDrawGraph()
})

const filterData = (arr,key)=>{
    if(arr.length){
        if(key === 'all'){
            return arr
        }else {
            return arr.filter(item=>item.deptName === key)
        }
    }
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
</script>

<style lang="scss" scoped>
.relative{
    position: relative;
    height: 90%;
}
.spin{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.radio-group-absolute{
    position: absolute;
    top: 26px;
    right: 30px;
    z-index: 1;
}
.radio-group-fixed{
    position: fixed;
    right: 60px;
    z-index: 1;
}
.flex-center-h100{
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 100%;
}
.treeBox {
  :deep(.zm-tree-org .zoom-container){
    overflow: visible;
  }
  :deep(.zm-tree-org .zm-draggable) {
    position: static;
    transform: translateY(0) !important;
  }
  :deep(.tree-org-node__children .tree-org-node .tree-org-node__content){
    left: -10%;
  }
  :deep(.tree-org-node.is-leaf .tree-org-node__content .tree-org-node__inner){ 
    box-shadow: none;
  }
  :deep(.tree-org-node__children:before){
    border-color: #E0E6F1;
  }
  :deep(.tree-org-node:not(:first-child):before, .tree-org-node:not(:last-child):after){
    border-color: #E0E6F1;
  }
  :deep(.tree-org-node:after){
    border-color: #E0E6F1;
  }
  :deep(.rootNode){
    width : v-bind(rootNodeStyleWidth) !important;
    height : v-bind(rootNodeStyleHeigt) !important;
    font-size : v-bind(rootNodeStyleFontSize) !important;
    display : flex;
    justify-content:center;
    align-items : center;
  }
  :deep(.tree-org-node:after){
    left: 0;
    width: 100%;
  }
  :deep(.tree-org-node__children .tree-org-node:last-child){
    position: absolute;
    right: 0;
    transform: translateX(100%);
  }
  :deep(.tree-org-node__children .tree-org-node:last-child:before){
    width: 0;
  }
  
}
.m-r-70{
    margin-right: 70px;
}
</style>