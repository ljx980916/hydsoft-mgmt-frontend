<template>
  <div class="defaultPadding">
    <a-tabs v-model:active-key="tabsActive" @change="handleTab" class="tabs">
      <a-tab-pane key="1" title="环比分析" class="p-t-10">
        <!-- 配置表头 -->
        <div class="flex-between">
          <a-space :size="['small', 0]" wrap>
            <a-tag
              v-for="(item, index) of tabChangeColumInfo.columnTabs"
              :key="index"
              :color="item.isShow === 1 ? 'arcoblue' : ''"
              size="large"
              class="pointer"
              @click="handleTabChange(item)"
            >
              {{ item.title }}
            </a-tag>
          </a-space>
          <div style="position: relative; top: -1px">
            <a-select v-model:model-value="selectMonth" @change="handleMonthChange">
              <a-option value="3">近3个月</a-option>
              <a-option value="6">近6个月</a-option>
              <a-option value="12">近12个月</a-option>
              <template #arrow-icon>
                <icon-calendar :size="16" />
              </template>
            </a-select>
          </div>
        </div>
        <!-- 表格 -->
        <div class="m-t-20">
          <a-table
            :columns="tableInfo.columns"
            :data="tableInfo.data"
            :default-expand-all-rows="true"
            :bordered="{ cell: true }"
            column-resizable
            :expanded-keys="tableInfo.defaultExpandedKeys"
            :scroll="{ maxHeight: tableInfo.maxHeight }"
            :scrollbar="{ x: true, y: 1500 }"
            :pagination="false"
            :loading="tableInfo.loading"
            ref="tableRef"
            @expanded-change="expandedChange"
          ></a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="同比分析" class="p-t-10">
        <div class="flex-between">
              <a-space :size="['small', 0]" wrap>
                <a-tag
                  v-for="(item, index) of allTableList"
                  :key="index"
                  :color="item.isShow === 1 ? 'arcoblue' : ''"
                  size="large"
                  class="pointer"
                  @click="handleSameContrastTabChange(item)"
                >
                  {{ item.title }}
                </a-tag>
              </a-space>
              <div style="position: relative; top: -1px">
                <a-radio-group v-model:model-value="raidoGroupType" type="button" @change="constructSameTabChange">
                  <a-radio value="total">汇总</a-radio>
                  <a-radio value="detail">明细</a-radio>
                </a-radio-group>
              </div>
        </div>
        <div v-show="raidoGroupType === 'total'">
          <a-table
            :columns="sameTotalTableInfo.columns"
            :data="sameTotalTableInfo.data"
            :default-expand-all-rows="true"
            :bordered="{ cell: true }"
            column-resizable
            :expanded-keys="sameTotalTableInfo.defaultExpandedKeys"
            :scroll="{ maxHeight: sameTotalTableInfo.maxHeight }"
            :scrollbar="{ x: true, y: 1500 }"
            :pagination="false"
            :loading="sameTotalTableInfo.loading"
            ref="sameTotalTableRef"
            class="m-t-20"
            @expanded-change="sameTotalTableExpandedChange"
          >
            <template #title="{ record }">
              <a-popover
                :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
                :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
              >
              <a href="javaScript:void(0)" v-if="record.leafNode === '1'" style="color: #165dff" @click="jump(record)">
                {{ record.title }}
              </a>
              <span class="pointer" v-else>{{ record.title }}</span>
                <template #content>
                  {{ record.title }}
                </template>
              </a-popover>
            </template>
            <template #canvasLine1="{record,column}">
              <echart-container :route="createEchartsRoute(record,column)" :height=74 :width=100 />
            </template>
            <template #canvasLine2="{record,column}">
              <echart-container :route="createEchartsRoute(record,column)" :height=74 :width=100 />
            </template>
            <template #canvasLine3="{record,column}">
              <echart-container :route="createEchartsRoute(record,column)" :height=74 :width=100 />
            </template>
          </a-table>
          </div>
        <div v-show="raidoGroupType === 'detail'">
          <a-table
              :columns="sameDetailTableInfo.columns"
              :data="sameDetailTableInfo.data"
              :default-expand-all-rows="true"
              :bordered="{ cell: true }"
              column-resizable
              :expanded-keys="sameDetailTableInfo.defaultExpandedKeys"
              :scroll="{ maxHeight: sameDetailTableInfo.maxHeight }"
              :scrollbar="{ x: true, y: 1500 }"
              :pagination="false"
              :loading="sameDetailTableInfo.loading"
              ref="sameDetailTableRef"
              class=" m-t-20"
              @expanded-change="detailTableExpandedChange"
            >
              <template #title="{ record }">
                <a-popover
                  :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
                  :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
                >
                <a href="javaScript:void(0)" v-if="record.leafNode === '1'" style="color: #165dff" @click="jump(record)">
                  {{ record.title }}
                </a>
                <span class="pointer" v-else>{{ record.title }}</span>
                  <template #content>
                    {{ record.title }}
                  </template>
                </a-popover>
              </template>
              <template #canvasLine1="{record,column}">
                <echart-container :route="createEchartsRoute(record,column)" :height=74 :width=100 />
              </template>
              <template #canvasLine2="{record,column}">
                <echart-container :route="createEchartsRoute(record,column)" :height=74 :width=100 />
              </template>
              <template #canvasLine3="{record,column}">
                <echart-container :route="createEchartsRoute(record,column)" :height=74 :width=100 />
              </template>
            </a-table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { Message } from "@arco-design/web-vue";
import { onBeforeMount, reactive, ref, nextTick, onMounted, toRaw,shallowRef,onBeforeUnmount } from "vue";
import { useTagColumnListStore } from "../../store/index";
import { getCustomerRingList, getCustomerYoyAnalysis } from "@/api/loopAnalyze.js";
import { getNMonthsAgo, dataAddKey, getRedNum,getLastYearDay, getCurrentTime} from "../../utils/util";
import { useRouter, useRoute } from "vue-router";
import echartContainer from "@/components/echartsContainer.vue";
import { getCurrentInstance } from "@vue/runtime-core";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
let { lastYear, lastMonth } = getLastYearDay();
let { year, month } = getCurrentTime();
let tagColumnList = useTagColumnListStore();
const router = useRouter();
const route = useRoute();
const { id:deptId ,deptName,tab } = route.query
const tabsActive = ref(tab||'1');
let columConfig = {};
const tableInfo = reactive({
  columns: [],
  data: [],
  defaultExpandedKeys: [],
  maxHeight: "200px",
  loading: false,
});
const selectMonth = ref("3");
const tableRef = ref(null);
const tabChangeColumInfo = reactive({
  columnTabs: [],
  up: [],
  down: [],
});
const chartColumMap = {
  发薪人数: [],
  营业收入: [],
  销售毛利率: [],
};
const chartColumnNameMap = {
  canvasLine1: "发薪人数",
  canvasLine2: "营业收入",
  canvasLine3: "销售毛利率",
};
let filterShowChildrenColumn = [];
// 切换环比分析和同比分析
const handleTab = val => {
  tabsActive.value = val;
  inintTableData()
};
onMounted(() => {
  if (tableRef.value) {
    let head = tableRef.value.$el;
    nextTick(() => {
      let innerHeight = window.innerHeight;
      let elHeight = head.getBoundingClientRect().top;
      tableInfo.maxHeight = innerHeight - elHeight - 30 + "px";
    });
  }
});
// 初始化
const seltColumns = () => {
  let tagColumns = toRaw(tagColumnList.getTagColumnList) || [];
  let currentPageColumn = tagColumns.filter(item => item.report === "环比分析") || [];
  if (currentPageColumn.length) {
    currentPageColumn[0].tier.forEach((item, index) => {
      let tabs = [];
      let columnTabs = [];
      let columnHasSonTabs = [];
      let noHiddenColumn = [];
      let defaultColumHasSonTabs = [];
      let defaultColumnTabs = [];
      item.tags.forEach(jtem => {
        tabs.push(jtem.tag);
        jtem.columns.forEach(ktem => {
          let { col, conf, title } = ktem;
          conf = conf || {};
          let columnItemConfig = {
            title,
            dataIndex: col,
            align: conf.align,
            cellStyle: { "text-align": conf.cellAlign },
            width: conf.width,
            ellipsis: true,
            headerCellClass: "noEllipsis",
            slotName: col,
            bodyCellClass: "bodyCell",
            fixed : conf.fixed
          };
          columnItemConfig.isShow = conf.isShow;
          columnItemConfig.render = ({ record, column }) => {
            let cellVal = record[column.dataIndex];
            if (!Array.isArray(cellVal)) {
              if (column.slotName === "title") {
                return (
                  <a-popover
                    content-style={{ background: "rgba(0,0,0,.8)", color: "#fff" }}
                    arrow-style={{ background: "rgba(0,0,0,.8)" }}
                  >
                    {{
                      default: () =>
                        record.leafNode == "1" ? (
                          <span class="pointer" style={{ color: "#165dff" }} onclick={() => jump(record)}>
                            {record.title}
                          </span>
                        ) : (
                          <span class="pointer">{record.title}</span>
                        ),
                      content: () => record.title,
                    }}
                  </a-popover>
                );
              }
              return <span innerHTML={getRedNum(cellVal)}></span>;
            } else {
              let route = chartColumMap[chartColumnNameMap[column.dataIndex]].map((item, i) => ({
                tip: item.month + record[item.col],
                value: cellVal[i],
              }));
              return <echartContainer route={route} height={74} width={100} />;
            }
          };
          if (conf.canHide === 1) {
            if (conf.parentCol === 0) {
              columnTabs.push(columnItemConfig);
            } else {
              columnHasSonTabs.push(columnItemConfig);
            }
          } else {
            noHiddenColumn.push(columnItemConfig);
          }
          if (conf.parentCol === 1) {
            defaultColumHasSonTabs.push(columnItemConfig);
          } else {
            defaultColumnTabs.push(columnItemConfig);
          }
        });
      });
      columConfig["level" + (index + 1)] = {
        tabs,
        params: item.params || [],
        columnTabs,
        columnHasSonTabs,
        noHiddenColumn,
        defaultColumnTabs,
        defaultColumHasSonTabs,
      };
    });
  }
  tabChangeColumInfo.columnTabs = columConfig.level2.columnHasSonTabs;
};
// 更换表头
const analysiisColumn = () => {
  let { columnTabs, noHiddenColumn, defaultColumHasSonTabs } = columConfig.level2;
  let num = 4;
  switch (selectMonth.value) {
    case "3":
      let months1 = getNMonthsAgo(3, true);
      let children1 = [];
      let filterHasSonShowColumn1 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months1.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = `${item[0]}年${item[1]}月`;
        columnHasSonConfig.children = filterHasSonShowColumn1.map((jtem, j) => {
          num++;
          return {
            ...jtem,
            dataIndex: `colNo${num}`,
            slotName: `colNo${num}`,
          };
        });
        children1.push(columnHasSonConfig);
      });
      num = 4;
      filterShowChildrenColumn = children1;
      break;
    case "6":
      let months2 = getNMonthsAgo(6, true);
      let children2 = [];
      let filterHasSonShowColumn2 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months2.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = `${item[0]}年${item[1]}月`;
        columnHasSonConfig.children = filterHasSonShowColumn2.map((jtem, j) => {
          num++;
          return {
            ...jtem,
            dataIndex: `colNo${num}`,
            slotName: `colNo${num}`,
          };
        });
        children2.push(columnHasSonConfig);
      });
      num = 4;
      filterShowChildrenColumn = children2;
      break;
    case "12":
      let months3 = getNMonthsAgo(12, true);
      months3 = months3.filter(item=>item[0]!==2022)
      let children3 = [];
      let filterHasSonShowColumn3 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months3.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = `${item[0]}年${item[1]}月`;
        columnHasSonConfig.children = filterHasSonShowColumn3.map((jtem, j) => {
          num++;
          return {
            ...jtem,
            dataIndex: `colNo${num}`,
            slotName: `colNo${num}`,
          };
        });
        children3.push(columnHasSonConfig);
      });
      num = 4;
      filterShowChildrenColumn = children3;
      break;
    default:
      break;
  }
  Object.keys(chartColumMap).forEach(key => {
    chartColumMap[key] = [];
  });
  filterShowChildrenColumn.forEach(item => {
    if (item.children?.length) {
      let filterShowColumns = [];
      item.children.forEach(jtem => {
        if (jtem.isShow === 1) {
          filterShowColumns.push(jtem);
        }
        if (chartColumMap.hasOwnProperty(jtem.title)) {
          chartColumMap[jtem.title].push({
            month: item.title,
            col: jtem.dataIndex,
          });
        }
      });
      item.children = filterShowColumns;
    }
  });
  Object.keys(chartColumMap).forEach(key => chartColumMap[key].reverse());
 let actionColumn = {
    title : '操作',
    dataIndex : 'action',
    width : 80,
    fixed : 'right',
    cellStyle : {textAlign : 'center'},
    render({record}){
      return <a href="javaScript:void(0)" onClick={()=>{goRingContrastChart(record,'customer')}}>看图</a>
    }
  }
  let filterAllShowColumn = [...columnTabs.filter(item => item.isShow === 1), ...noHiddenColumn, ...filterShowChildrenColumn,actionColumn];
  tableInfo.columns = filterAllShowColumn;
};
//部门折叠
const expandedChange = rowKeys => {
  tableInfo.defaultExpandedKeys = rowKeys;
};
// 切换时间区间
const handleMonthChange = month => {
  selectMonth.value = month;
  analysiisColumn();
  getList();
};
onBeforeMount(() => {
  seltColumns();
  inintTableData()
  if(deptId && deptName && tab){
    deptGoCustomer()
  }
});
const inintTableData = ()=>{
  if(tabsActive.value === '1'){
    if(tableInfo.data.length === 0){
      analysiisColumn();
      getList();
    }
  }else {
    if(raidoGroupType.value === 'total' && sameTotalTableInfo.data.length === 0){
      initTotalColumns();
    }
    if(raidoGroupType.value === 'detail' && sameDetailTableInfo.data.length === 0){
      initTotalColumns();
    }
  }
}
// 点击标签
const handleTabChange = tab => {
  switch (tab.isShow) {
    case 0:
      tab.isShow = 1;
      changeShowStatus({
        type: "self",
        title: tab.title,
        val: 1,
        tab,
      });
      break;
    case 1:
      tab.isShow = 0;
      changeShowStatus({
        type: "self",
        title: tab.title,
        val: 0,
        tab,
      });
      break;
    default:
      break;
  }
};
// 更改高亮状态并更换表头
const changeShowStatus = obj => {
  let { columnTabs, defaultColumHasSonTabs } = columConfig.level2;
  let filterHasSonShowColumn = defaultColumHasSonTabs.filter(item => item.isShow === 1);
  if (filterHasSonShowColumn.length === 0) {
    Message.error("至少选择一项");
    obj.tab.isShow = obj.tab.isShow === 0 ? 1 : 0;
    return;
  }
  if (obj.type === "parent") {
    columnTabs.forEach(item => {
      if (obj.title === item.title) {
        item.isShow = obj.val;
      }
    });
  }
  if (obj.type === "self") {
    defaultColumHasSonTabs.forEach(item => {
      if (obj.title === item.title) {
        item.isShow = obj.val;
      }
    });
  }
  analysiisColumn();
  handleAbortRequest();
  getList();
};
// 处理趋势数据
const construcLine = arr => {
  arr.forEach(item => {
    item.colNo2 = JSON.parse(item.colNo2);
    item.colNo3 = JSON.parse(item.colNo3);
    item.colNo4 = JSON.parse(item.colNo4);
    if (item.children) {
      construcLine(item.children);
    }
  });
};
// 获取列表数据
const getList = () => {
  tableInfo.data = [];
  tableInfo.loading = true;
  let arr = [];
  var newColumns = JSON.parse(JSON.stringify(tableInfo.columns));
  const mappings = {
    发薪人数: "colNo1",
    营业收入: "colNo2",
    销售毛利: "colNo3",
    销售毛利率: "colNo4",
    直接成本: "colNo5",
    人均营业收入: "colNo6",
    人均直接成本: "colNo7",
    未完工项目成本: "colNo8",
    招聘费用: "colNo9",
    销售费用: "colNo10",
    管理费用: "colNo11",
  };
  newColumns.forEach(item => {
    if (mappings[item.title]) {
      arr.push(mappings[item.title]);
    }
    if (item.children) {
      item.children.forEach(jtem => {
        if (mappings[jtem.title]) {
          arr.push(mappings[jtem.title]);
        }
      });
    }
  });
  
  var params = {
    interval: Number(selectMonth.value),
      dynamicHeaderParam: Array.from(new Set(arr)),
      xAxis: 50,
      yAxis: 20,
      tagKey: "linkAnalysis2",
      deptId : deptId || "",
  };
  getCustomerRingList(params)
    .then(res => {
      if (res.code == "200") {
        construcLine(res.data);
        let data = dataAddKey(res.data, "key", "title");
        let keys = [];
        res.data.forEach(item => keys.push(item.title));
        tableInfo.defaultExpandedKeys = keys;
        tableInfo.data = data;
      } else {
        Message.error(res.message);
      }
      tableInfo.loading = false;
    })
    .catch(err => {
      if (err?.code === "ERR_CANCELED") {
        tableInfo.loading = true;
      } else {
        Message.error(err?.message || "数据请求错误");
        tableInfo.loading = false;
      }
    });
};
// 跳转
const jump = record => {
  router.push({
    path: "/projectRingSame",
    query: {
      customerId: record.customerId,
      deptId,
      deptName,
      groupCustomerName : record.groupCustomerName,
      title : record.title,
      tab : tabsActive.value,
      radiotype : raidoGroupType.value
    },
  });
  
};

//同比分析
const raidoGroupType = ref("total");
const allHeadTagList = ref([]); // 所有的标签
const allTableList = ref([]); // 表头数据
const notShowList = shallowRef([]); // 初始没显示的表头数据
const sameDetailTableRef = ref(null) //同比明细表格dom
const sameTotalTableRef = ref(null)//同比汇总表格dom

// 点击标签
const handleSameContrastTabChange = value => {
  value.isShow = value.isShow === 0 ? 1 : 0;
  let filterHasSonShowColumn = allHeadTagList.value.filter(item => item.isShow === 1);
  if (filterHasSonShowColumn.length === 0) {
    Message.error("至少选择一项");
    value.isShow = value.isShow === 0 ? 1 : 0;
    return;
  }
  handleAbortRequest()
  if (raidoGroupType.value === "total") {
    constructSameTotalColumns(allHeadTagList.value);
  } else {
    constructSameDetailColumns(allHeadTagList.value);
  }
};
// 更改汇总/明细
const constructSameTabChange = value => {
  raidoGroupType.value = value;
  initTotalColumns();
};

// 初始化表头和标签数据
const initTotalColumns = () => {
  allHeadTagList.value = [];
  allTableList.value = [];
  notShowList.value = [];
  let tagColumns = toRaw(tagColumnList.getTagColumnList) || [];
  let currentPageColumn = tagColumns.filter(item => item.report === "同比分析") || [];
  if (currentPageColumn.length) {
    const currentColumnList = currentPageColumn[0].tier[1].tags[0].columns;
    currentColumnList.forEach(item => {
      const { col, conf, title } = item;
      let columnItemConfig = {
        title,
        dataIndex: col,
        align: conf.align,
        cellStyle: { "text-align": conf.cellAlign },
        width: conf.width,
        ellipsis: true,
        headerCellClass: "noEllipsis",
        slotName: col,
        bodyCellClass: "bodyCell",
        isShow: conf.isShow,
      };
      if (conf.canHide == 1) {
        allHeadTagList.value.push(columnItemConfig);
      } else {
        notShowList.value.push(columnItemConfig);
      }
      if(conf.fixed !== undefined){
        columnItemConfig.fixed = conf.fixed
      }
      if (conf.parentCol == 1) {
        allTableList.value.push(columnItemConfig);
      }
    });
    if (raidoGroupType.value == "total") {
      constructSameTotalColumns(allHeadTagList.value);
    } else {
      constructSameDetailColumns(allHeadTagList.value);
    }
  }
};

//同比汇总表格数据
const sameTotalTableInfo = reactive({
  columns: [],
  data: [],
  defaultExpandedKeys: [],
  maxHeight: "600px",
  loading: false,
});

const sameTotalTableExpandedChange = keys=>{
  sameTotalTableInfo.defaultExpandedKeys = keys
}
// 构造同比汇总的表头
const constructSameTotalColumns = list => {
  let tableList = list.filter(item => item.isShow === 1);
  let createColumns = []
  let childrenColumns = [
        {
          title: lastYear + "/1-12",
        },
        {
          title: lastYear + `/1-${lastMonth}`,
        },
        {
          title: year + `/1-${lastMonth}`,
        },
        {
          title: "同比",
        },
  ]
  let colNo = 5
  tableList.forEach(item => {
    let columnConfig = {
      title : item.title,
      children : childrenColumns.map((jtem,i)=>{
        let childrenColumnItemConfig = {
          title : jtem.title,
          dataIndex: `colNo${colNo}`,
          slotName: `colNo${colNo}`,
          width: 110,
          cellStyle: {textAlign : 'right'},
        }
        if(i === (childrenColumns.length -1)){
          childrenColumnItemConfig.title = item.title.endsWith('率')?'偏离':jtem.title
        }
        colNo++
        return childrenColumnItemConfig
      })
    }
    createColumns.push(columnConfig)
  });
  let actionColumn = {
    title : '操作',
    dataIndex : 'action',
    width : 80,
    fixed : 'right',
    cellStyle : {textAlign : 'center'},
    render({record}){
      return <a href="javaScript:void(0)" onClick={()=>{goLookChat(record,'customer')}}>看图</a>
    }
  }
  sameTotalTableInfo.columns = [...notShowList.value,...createColumns,actionColumn]
  getConstructSameTotalList()
};

//同比分析汇总接口
const getConstructSameTotalList = ()=>{
  let params = {
    interval:lastMonth == 0? 12 : lastMonth,
    dynamicHeaderParam:allTableList.value.filter(item=>item.isShow ===1).map(item=>item.dataIndex),
    xAxis:74,
    yAxis:100,
    tagKey:"yoyAnalysis2",
    deptId : deptId || "",
    type : '1'
  }
  if(!deptId){
    Reflect.deleteProperty(params,'deptId')
  }
  sameTotalTableInfo.loading = true
  getCustomerYoyAnalysis(params).then(res=>{
    if(res.code === '200'){
      dataAddKey(res.data,'key','deptId')
      let expandKeys = []
      res.data.forEach(item=>expandKeys.push(item.key))
      sameTotalTableInfo.defaultExpandedKeys = expandKeys
      sameTotalTableInfo.data = res.data
      //计算表格不出滚动条的最大高度
      if(sameTotalTableInfo.maxHeight === '600px'){
        nextTick(() => {
              if (sameTotalTableRef.value) {
                let head = sameTotalTableRef.value.$el;
                let innerHeight = window.innerHeight;
                let elHeight = head.getBoundingClientRect().top;
                sameTotalTableInfo.maxHeight = Math.round(innerHeight - elHeight - 32) + "px";
            }
          });
        }
    }else {
      Message.error(res.message || '请求数据失败')
    }
    sameTotalTableInfo.loading = false;
  }).catch(err=>{
    if (err?.code === "ERR_CANCELED") {
      sameTotalTableInfo.loading = true;
      } else {
        Message.error(err?.message || "数据请求错误");
        sameTotalTableInfo.loading = false;
      }
  })
}

//同比明细表格数据
const sameDetailTableInfo = reactive({
  columns: [],
  data: [],
  defaultExpandedKeys: [],
  maxHeight: "600px",
  loading: false,
});
//同比分析明细表格展开/折叠
const detailTableExpandedChange = rowKeys => {
  sameDetailTableInfo.defaultExpandedKeys = rowKeys;
};
// 构造同比明细的表头结构
const constructSameDetailColumns = list => {
  const timeData = [];
  let activeTableList = list.filter(item => item.isShow === 1);
  if (month == 1) {
    for (var i = 1; i <= 12; i++) {
      timeData.push({
        title: i + "月",
        children: [],
      });
    }
  } else {
    for (var i = 1; i <= lastMonth; i++) {
      timeData.push({
        title: i + "月",
        children: [],
      });
    }
  }
  const years = [lastYear, year];
  let colNo = 5
  timeData.forEach(item=>{
    let childrenColumns = []
    activeTableList.forEach(jtem=>{
      years.forEach(ktem=>{
        let contrastColumnConfig = {
          title: `${jtem.title}${ktem}`,
          dataIndex: `colNo${colNo}`,
          slotName: `colNo${colNo}`,
          width: jtem.width,
          cellStyle: toRaw(jtem.cellStyle),
        }
        childrenColumns.push(contrastColumnConfig)
        colNo++
      })
    })
    item.children = childrenColumns
  })
  let actionColumn = {
    title : '操作',
    dataIndex : 'action',
    width : 80,
    fixed : 'right',
    cellStyle : {textAlign : 'center'},
    render({record}){
      return <a href="javaScript:void(0)" onClick={()=>{goLookChat(record,'customer')}}>看图</a>
    }
  }
  sameDetailTableInfo.columns = [...notShowList.value,...timeData,actionColumn]
  getConstructSameDetailList()
};

//同比分析集团客户维度明细接口
const getConstructSameDetailList = ()=>{
  let params = {
    interval:lastMonth == 0? 12 : lastMonth,
    dynamicHeaderParam:allTableList.value.filter(item=>item.isShow ===1).map(item=>item.dataIndex),
    xAxis:74,
    yAxis:100,
    tagKey:"yoyAnalysis2",
    deptId : deptId || "",
    type : '2'
  }
  sameDetailTableInfo.loading = true
  getCustomerYoyAnalysis(params).then(res=>{
    if(res.code === '200'){
      dataAddKey(res.data,'key','deptId')
      let expandKeys = []
      res.data.forEach(item=>expandKeys.push(item.key))
      sameDetailTableInfo.defaultExpandedKeys = expandKeys
      sameDetailTableInfo.data = res.data
      //计算表格不出滚动条的最大高度
      if(sameDetailTableInfo.maxHeight === '600px'){
        nextTick(() => {
              if (sameDetailTableRef.value) {
              let head = sameDetailTableRef.value.$el;
              let innerHeight = window.innerHeight;
              let elHeight = head.getBoundingClientRect().top;
              sameDetailTableInfo.maxHeight = Math.round(innerHeight - elHeight - 32) + "px";
            }
          });
        }
    }else {
      Message.error(res.message || '请求数据失败')
    }
    sameDetailTableInfo.loading = false;
  }).catch(err=>{
    if (err?.code === "ERR_CANCELED") {
      sameDetailTableInfo.loading = true;
      } else {
        Message.error(err?.message || "数据请求错误");
        sameDetailTableInfo.loading = false;
      }
  })
}

//跳转同比分析看图页
const goLookChat = (record,type)=>{
  router.push({
    name : 'lookChart',
    state : {
      barChartOptions : JSON.stringify(allHeadTagList.value),
      deptId : record.deptId,
      title : record.title,
      sourceType:type,
      taxRate : record.taxRate,
      projectId : record.finPcode,
      groupCustomerName : record.groupCustomerName,
      customerName : record.customerName,
      projectName : record.projectName,
      deptName
    }
  })
}

//跳转环比分析看图页
const goRingContrastChart = (record,type)=>{
  router.push({
    name : 'ringContrastChart',
    state : {
      interval:selectMonth.value,
      deptId : deptId?record.deptId:"",
      sourceType : type,
      title : record.title,
      deptName,
      customerId: record.customerId,
    }
  })
}
//echarts缩略图的路径信息
const createEchartsRoute = (record,column)=>{
  return record[column.dataIndex].map((item,i)=>({value:record[column.dataIndex][i]}))
}

const deptGoCustomer = ()=>{
  let breadList
    switch (tab) {
        case '1':
            breadList = [
                {
                    type: "button",
                    color: "#5370FD",
                    msg: '环比分析列表',
                    isBack : true
                },
                { type: "text", color: "#333", msg: deptName },
            ]
          break;
          case '2':
            breadList = [
                { type: "text", color: "#333", msg: '同比分析列表' },
                {
                    type: "button",
                    color: "#5370FD",
                    msg: deptName,
                    isBack : true
                },
            ]
          break;
          default:
            break;
    }
    $bus.emit("updateStructure", breadList);
}

</script>

<style lang="scss" scoped>
.p-t-10 {
  padding-top: 10px;
}
:deep(.tabs .arco-tabs-nav-type-line .arco-tabs-tab-title) {
  font-size: 15px;
}
</style>
