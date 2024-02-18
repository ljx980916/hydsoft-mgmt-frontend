<template>
  <div class="defaultPadding">
    <a-tabs v-model:active-key="tabKey" @change="changeTabs">
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
          >
            <template #lastDeptName="{ record }">
              <a-popover
                :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
                :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
              >
                <span class="pointer">{{ record.lastDeptName }}</span>
                <template #content>
                  {{ record.deptName }}
                </template>
              </a-popover>
            </template>
          </a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="同比分析" class="p-t-10">
        <div v-show="raidoGroupType === 'total'">
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
            <template #lastDeptName="{ record }">
              <a-popover
                :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
                :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
              >
              <a href="javaScript:void(0)" v-if="!record.children" style="color: #165dff" @click="jump(record,2)">
                {{ record.lastDeptName }}
              </a>
              <span class="pointer" v-else>{{ record.lastDeptName }}</span>
                <template #content>
                  {{ record.deptName }}
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
            <template #lastDeptName="{ record }">
              <a-popover
                :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
                :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
              >
              <a href="javaScript:void(0)" v-if="!record.children" style="color: #165dff" @click="jump(record,2)">
                {{ record.lastDeptName }}
              </a>
              <span class="pointer" v-else>{{ record.lastDeptName }}</span>
                <template #content>
                  {{ record.deptName }}
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
import { onBeforeMount, reactive, ref, nextTick, onMounted, toRaw, markRaw, shallowRef } from "vue";
import { useTagColumnListStore } from "../../store/index";
import { getDepartmentRingList,queryYoyAnalysis } from "@/api/loopAnalyze.js";
import {
  dataAddKey,
  getRedNum,
  getLastMonth,
  getLastYearDay,
  getCurrentTime,
  mapDataIndex,
} from "../../utils/util";
import echartContainer from "@/components/echartsContainer.vue";
import { useRouter } from "vue-router";
const router = useRouter();
let { lYear } = getLastMonth();
let { lastYear, lastMonth } = getLastYearDay();
let { year, month } = getCurrentTime();
let tagColumnList = useTagColumnListStore();
let columConfig = {};
const tableInfo = reactive({
  columns: [],
  data: [],
  defaultExpandedKeys: [],
  maxHeight: "200px",
  loading: false,
});
//同比汇总表格数据
const sameTotalTableInfo = reactive({
  columns: [],
  data: [],
  defaultExpandedKeys: [],
  maxHeight: "600px",
  loading: false,
});
//同比明细表格数据
const sameDetailTableInfo = reactive({
  columns: [],
  data: [],
  defaultExpandedKeys: [],
  maxHeight: "600px",
  loading: false,
});
const selectMonth = ref("3");
const tableRef = ref(null);
const tabChangeColumInfo = reactive({
  columnTabs: [],
});
let filterShowChildrenColumn = [];
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
const tabKey = ref("1");
const raidoGroupType = ref("total");
onBeforeMount(() => {
  seltColumns();
  getList();
  initTotalColumns();
});
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
// 更改环比分析/同比分析
const changeTabs = key => {
  tabKey.value = key;
};
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
              if (column.slotName === "lastDeptName") {
                return (
                  <a-popover
                    content-style={{ background: "rgba(0,0,0,.8)", color: "#fff" }}
                    arrow-style={{ background: "rgba(0,0,0,.8)" }}
                  >
                    {{
                      default: () =>
                        record.leafNode == "1" ? (
                          <span class="pointer" style={{ color: "#165dff" }} onclick={() => jump(record,1)}>
                            {record.lastDeptName}
                          </span>
                        ) : (
                          <span class="pointer">{record.lastDeptName}</span>
                        ),
                      content: () => record.deptName,
                    }}
                  </a-popover>
                );
              }
              return <span innerHTML={getRedNum(cellVal)}></span>;
            } else {
              let route = chartColumMap[chartColumnNameMap[column.dataIndex]].map((item,i)=>({name:item.month+'-'+record[item.col],value:cellVal[i]}))
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
  tabChangeColumInfo.columnTabs = columConfig.level1.columnHasSonTabs;
};
// 更换表头
const analysiisColumn = months => {
  let { columnTabs, noHiddenColumn, defaultColumHasSonTabs } = columConfig.level1;
  let num = 4;
  switch (selectMonth.value) {
    case "3":
      let children1 = [];
      let filterHasSonShowColumn1 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = item;
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
      let children2 = [];
      let filterHasSonShowColumn2 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = item;
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
      let children3 = [];
      let filterHasSonShowColumn3 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = item;
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
      return <a href="javaScript:void(0)" onClick={()=>{goRingContrastChart(record,'dept')}}>看图</a>
    }
  }
  let filterAllShowColumn = [...columnTabs.filter(item => item.isShow === 1), ...noHiddenColumn, ...filterShowChildrenColumn,actionColumn];
  tableInfo.columns = filterAllShowColumn;
};
//展开环比分析
const expandedChange = rowKeys => {
  tableInfo.defaultExpandedKeys = rowKeys;
};
// 切换时间区间
const handleMonthChange = month => {
  selectMonth.value = month;
  getList();
};
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
  let { columnTabs, defaultColumHasSonTabs } = columConfig.level1;
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
  tabChangeColumInfo.columnTabs
    .filter(item => item.isShow === 1)
    .forEach(item => {
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
  const params = {
    interval: Number(selectMonth.value),
    dynamicHeaderParam: Array.from(new Set(arr)),
    xAxis: 74,
    yAxis: 100,
    tagKey: "linkAnalysis",
  };
  getDepartmentRingList(params)
    .then(res => {
      if (res.code == "200") {
        analysiisColumn(res.data.month);
        construcLine(res.data.data);
        let data = dataAddKey(res.data.data, "key", "deptId");
        let keys = [];
        res.data.data.forEach(item => keys.push(item.deptId));
        tableInfo.defaultExpandedKeys = keys;
        tableInfo.data = markRaw(data);
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
const allHeadTagList = ref([]); // 所有的标签
const allTableList = ref([]); // 表头数据
const notShowList = shallowRef([]); // 初始没显示的表头数据
const sameDetailTableRef = ref(null) //同比明细表格dom
const sameTotalTableRef = ref(null)//同比汇总表格dom
// 初始化表头和标签数据
const initTotalColumns = () => {
  allHeadTagList.value = [];
  allTableList.value = [];
  notShowList.value = [];
  let tagColumns = toRaw(tagColumnList.getTagColumnList) || [];
  let currentPageColumn = tagColumns.filter(item => item.report === "同比分析") || [];
  if (currentPageColumn.length) {
    const currentColumnList = currentPageColumn[0].tier[0].tags[0].columns;
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
        fixed : conf.fixed
      };
      // 需要把部门名称的canHide改成0 level1
      // 如果canHide=1,则push到allHeadTagList,如果isShow=1push到tableList,再配标签配点击事件，对表头进行格式处理。
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
      return <a href="javaScript:void(0)" onClick={()=>{goLookChat(record,'dept')}}>看图</a>
    }
  }
  sameTotalTableInfo.columns = [...notShowList.value,...createColumns,actionColumn]
  getConstructSameTotalList()
};

const sameTotalTableExpandedChange = keys=>{
  sameTotalTableInfo.defaultExpandedKeys = keys
}

//跳转看图页
const goLookChat = (record,type)=>{
  router.push({
    name : 'lookChart',
    state : {
      barChartOptions : JSON.stringify(allHeadTagList.value),
      deptId : record.deptId,
      sourceType : type,
      deptName : record.deptName
    }
  })
}

const goRingContrastChart = (record,type)=>{
  router.push({
    name : 'ringContrastChart',
    state : {
      deptName : record.deptName,
      interval:selectMonth.value,
      deptId : record.deptId,
      sourceType : type
    }
  })
}

// 同比分析-----明细-------------------------------------------------------------
// 更改汇总/明细
const constructSameTabChange = value => {
  raidoGroupType.value = value;
  initTotalColumns();
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
      return <a href="javaScript:void(0)" onClick={()=>{goLookChat(record,'dept')}}>看图</a>
    }
  }
  sameDetailTableInfo.columns = [...notShowList.value,...timeData,actionColumn]
  getConstructSameDetailList()
};

//同比分析明细表格展开/折叠
const detailTableExpandedChange = rowKeys => {
  sameDetailTableInfo.defaultExpandedKeys = rowKeys;
};

//同比分析明细接口
const getConstructSameDetailList = ()=>{
  let params = {
    interval:lastMonth == 0 ? 12 : lastMonth,
    dynamicHeaderParam:allTableList.value.filter(item=>item.isShow ===1).map(item=>item.dataIndex),
    xAxis:74,
    yAxis:100,
    tagKey:"yoyAnalysis",
    type : '2'
  }
  sameDetailTableInfo.loading = true
  queryYoyAnalysis(params).then(res=>{
    if(res.code === '200'){
      dataAddKey(res.data.data,'key','deptId')
      let expandKeys = []
      res.data.data.forEach(item=>expandKeys.push(item.key))
      sameDetailTableInfo.defaultExpandedKeys = expandKeys
      sameDetailTableInfo.data = res.data.data
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
      Message.error(res.desc || '请求数据失败')
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

//同比分析汇总接口
const getConstructSameTotalList = ()=>{
  let params = {
    interval:lastMonth == 0? 12 : lastMonth,
    dynamicHeaderParam:allTableList.value.filter(item=>item.isShow ===1).map(item=>item.dataIndex),
    xAxis:74,
    yAxis:100,
    tagKey:"yoyAnalysis",
    type : '1'
  }
  sameTotalTableInfo.loading = true
  queryYoyAnalysis(params).then(res=>{
    if(res.code === '200'){
      dataAddKey(res.data.data,'key','deptId')
      let expandKeys = []
      res.data.data.forEach(item=>expandKeys.push(item.key))
      sameTotalTableInfo.defaultExpandedKeys = expandKeys
      sameTotalTableInfo.data = res.data.data
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
      Message.error(res.desc || '请求数据失败')
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
//echarts缩略图的路径信息
const createEchartsRoute = (record,column)=>{
  return chartColumMap[chartColumnNameMap[column.dataIndex]].map((item,i)=>({value:record[column.dataIndex][i]}))
}
// 跳转到客户
const jump = (record,tab) => {
  router.push({
    path: "/customerRingSame",
    query: {
      id: record.deptId,
      deptName : record.deptName,
      tab
    },
  });
};
</script>

<style lang="scss" scoped>
.p-t-10 {
  padding-top: 10px;
}
:deep(.tabs .arco-tabs-nav-type-line .arco-tabs-tab-title) {
  font-size: 15px;
}
</style>
