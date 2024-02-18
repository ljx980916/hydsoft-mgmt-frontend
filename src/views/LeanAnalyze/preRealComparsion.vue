<template>
  <div class="defaultPadding">
    <!-- 查询表单 -->
    <div>
      <a-space wrap>
        <span>年份：</span>
        <a-year-picker v-model="yearNow" disabled style="width: 120px; border-radius: 4px" :allow-clear="false" />
        <a-button type="primary" style="margin-left: 16px" @click="handleSearch">
          <template #icon>
            <icon-search />
          </template>
          <template #default>搜索</template>
        </a-button>
        <a-button @click="handleReset">
          <template #icon>
            <icon-refresh />
          </template>
          <template #default>重置</template>
        </a-button>
      </a-space>
    </div>
    <div class="m-t-20 flex-between">
      <div style="align-self: flex-start">
        <div class="m-b-20">
          <a-space wrap>
            <a-tag
              v-for="(item, index) of tabChangeColumInfo.tabList"
              :key="index"
              :color="item.isShow === 1 ? 'arcoblue' : ''"
              size="large"
              class="pointer"
              @click="handleHasSonTabChange(item)"
            >
              {{ item.configType }}
            </a-tag>
          </a-space>
        </div>
      </div>
    </div>
    <!-- 表格  -->
    <div class="m-t-20">
      <a-table
        :columns="tableInfo.columns"
        :data="tableInfo.data"
        column-resizable
        :scroll="{ maxHeight: tableInfo.maxHeight }"
        :scrollbar="{ x: true, y: 750 }"
        :pagination="false"
        :loading="tableInfo.loading"
        :bordered="false"
        ref="tableRef"
        :expanded-keys="tableInfo.defaultExpandedKeys"
        @expanded-change="expandedChange"
      >
      <template #columTitleSlot="{ column }">
        <a-tooltip style="width:max-content" :content="column.title">
          <a href="javaScript:void(0)" style="color: #333;"> {{ column.title }}</a>
        </a-tooltip>
      </template>
    </a-table>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref, nextTick, onMounted, toRaw } from "vue";
import { useTagColumnListStore } from "../../store/index";
import { getPretrialComparisonList } from "@/api/preRealComparsion.js";
import { getCurrentDate, dataAddKey, toInteger } from "../../utils/util";
let tagColumnList = useTagColumnListStore();
let columConfig = {};
let { year, month } = getCurrentDate();
let currentDate = `${year}`;
let months = `${month}`;
const regex = /(\d+)月/g;
const yearNow = ref(currentDate);
const tableInfo = reactive({
  columns: [],
  data: [],
  maxHeight: "200px",
  loading: false,
  defaultExpandedKeys: [],
});
const tableRef = ref(null);
const tabChangeColumInfo = reactive({
  tabList: [],
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
// 初始化
const seltColumns = () => {
  let tagColumns = toRaw(tagColumnList.getTagColumnList) || [];
  let currentPageColumn = tagColumns.filter(item => item.report === "预实对比") || [];
  if (currentPageColumn.length) {
    if (months[0] == 0) {
      months = months[1];
    }
    currentPageColumn[0].tier.forEach((item, index) => {
      let tabs = [];
      let columnTabs = []; // 可点击高亮不高亮的标签
      let noHiddenColumn = []; // 不可点击高亮不高亮的标签
      item.tags.forEach(jtem => {
        tabs.push(jtem.tag);
        jtem.columns.forEach(ktem => {
          let { col, conf, title } = ktem;
          if (title.indexOf("月") !== -1) {
            title = title.replace(regex, `${months}月`);
          }
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
            isShow: conf.isShow,
            configType: conf.configType,
            parentCol: conf.parentCol,
            titleSlotName : 'columTitleSlot'
          };
          if (conf.canHide === 1) {
            columnTabs.push(columnItemConfig); // 可以点击高亮的 === 有children的
          } else {
            noHiddenColumn.push(columnItemConfig); // 不可以点击高亮的 === 固定在表格的
          }
          // 去重
          let map = new Map();
          for (let i of columnTabs) {
            if (!map.has(i.configType)) {
              map.set(i.configType, i);
            }
          }
          tabChangeColumInfo.tabList = [...map.values()];
        });
      });
      columConfig = {
        tabs,
        params: item.params || [],
        columnTabs,
        noHiddenColumn,
      };
    });
  }
};
// 更换表头
const analysiisColumn = () => {
  let { columnTabs, noHiddenColumn } = columConfig;
  let filterHasSonShowColumn1 = columnTabs.filter(item => item.isShow === 1);
  let columnHasSonConfig = new Map();
  filterHasSonShowColumn1.forEach(item => {
    if (columnHasSonConfig.has(item.parentCol)) {
      let value = columnHasSonConfig.get(item.parentCol);
      value.children.push(item);
      columnHasSonConfig.set(item.parentCol, value);
    } else {
      columnHasSonConfig.set(item.parentCol, {
        title: item.parentCol,
        children: [item],
      });
    }
  });
  let number = 0;
  columnHasSonConfig.forEach(item => {
    number += 1;
    if (!item.children) {
      item.dataIndex = `colNo${number}`;
      item.slotName = `colNo${number}`;
    } else {
      number = number - 1;
      item.children.forEach(jtem => {
        number += 1;
        jtem.dataIndex = `colNo${number}`;
        jtem.slotName = `colNo${number}`;
        jtem.render = ({ record }) => {
          return <span innerHTML={toInteger(record[jtem.dataIndex])}></span>;
        };
      });
    }
  });
  let filterAllShowColumn = [...noHiddenColumn, ...columnHasSonConfig.values()];
  tableInfo.columns = filterAllShowColumn;
};
onBeforeMount(() => {
  seltColumns();
  analysiisColumn();
  getList();
});
// 点击标签
const handleHasSonTabChange = tab => {
  switch (tab.isShow) {
    case 0:
      tab.isShow = 1;
      changeShowStatus({
        type: "self",
        configType: tab.configType,
        val: 1,
      });
      break;
    case 1:
      tab.isShow = 0;
      changeShowStatus({
        type: "self",
        configType: tab.configType,
        val: 0,
      });
      break;
    default:
      break;
  }
};
// 更改高亮状态并更换表头
const changeShowStatus = obj => {
  let { columnTabs, noHiddenColumn } = columConfig;
  let columnsArr = [];
  if (obj.type === "self") {
    columnTabs.forEach(item => {
      if (obj.configType === item.configType) {
        item.isShow = obj.val;
      }
    });
  }
  let filterHasSonShowColumn = columnTabs.filter(item => item.isShow === 1);
  let columnHasSonConfig = new Map();
  filterHasSonShowColumn.forEach(item => {
    if (columnHasSonConfig.has(item.parentCol)) {
      let value = columnHasSonConfig.get(item.parentCol);
      value.children.push(item);
      columnHasSonConfig.set(item.parentCol, value);
    } else {
      columnHasSonConfig.set(item.parentCol, {
        title: item.parentCol,
        children: [item],
      });
    }
  });
  let number = 0;
  columnHasSonConfig.forEach(item => {
    number += 1;
    if (!item.children) {
      item.dataIndex = `colNo${number}`;
      item.slotName = `colNo${number}`;
    } else {
      number = number - 1;
      item.children.forEach(jtem => {
        number += 1;
        jtem.dataIndex = `colNo${number}`;
        jtem.slotName = `colNo${number}`;
        jtem.render = ({ record }) => {
          return <span innerHTML={toInteger(record[jtem.dataIndex])}></span>;
        };
      });
    }
  });
  columnsArr = [...noHiddenColumn, ...columnHasSonConfig.values()];

  tableInfo.columns = columnsArr;
  getList();
};
// 获取列表数据
const getList = () => {
  tableInfo.data = [];
  tableInfo.loading = true;
  let arr = [];
  var newColumns = JSON.parse(JSON.stringify(tableInfo.columns));
  newColumns.forEach(item => {
    if (item.title === "部门名称") {
      arr.push("deptName");
    }
    if (item.title === "人数累计") {
      arr.push("colNo1");
    }
    if (item.title === "营业收入累计") {
      arr.push("colNo2");
    }
    if (item.title === "销售毛利累计" || item.title === "销售毛利率累计") {
      arr.push("colNo3");
    }
    if (item.title === "考核经营净利润累计" || item.title === "考核经营净利润率累计") {
      arr.push("colNo4");
    }
    if (item.title === "招聘费用累计") {
      arr.push("colNo5");
    }
    if (item.title === "销售费用累计") {
      arr.push("colNo6");
    }
    if (item.title === "管理费用累计") {
      arr.push("colNo7");
    }
  });
  const params = {
    dynamicHeaderParam: Array.from(new Set(arr)),
    tagKey: "prerealComparison",
  };
  getPretrialComparisonList(params).then(res => {
    if (res.code == "200") {
      let data = dataAddKey(res.data, "key", "id");
      tableInfo.data = data;
      let keys = [];
      res.data.forEach(item => keys.push(item.id));
      tableInfo.defaultExpandedKeys = keys;
    }
  }).catch(e=>{
    Message.error(e.message || '请求数据错误')
  }).finally(()=>{
    tableInfo.loading = false
  })
};
const expandedChange = rowKeys => {
  tableInfo.defaultExpandedKeys = rowKeys;
};
// 查询
const handleSearch = () => {
  getList();
};
// 重置
const handleReset = () => {};
</script>

<style lang="scss">
.draw-enter-active,
.draw-leave-active {
  transition: all 0.2s;
}
.draw-enter-from,
.draw-leave-to {
  max-height: 0;
}
.border-r {
  padding-right: 10px;
  border-right: 1px solid #ebebeb;
}
</style>
