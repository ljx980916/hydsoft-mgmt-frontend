<template>
  <div class="defaultPadding">
    <div>
      <a-space wrap>
        <span>部门名称：</span>
        <a-select :style="{ width: '230px' }" placeholder="输入并选择部门名称" allow-search>
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
          <a-option disabled>Disabled</a-option>
        </a-select>
        <span class="m-l-16">客户名称：</span>
        <a-select :style="{ width: '230px' }" placeholder="输入并选择客户名称" allow-search>
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
          <a-option disabled>Disabled</a-option>
        </a-select>
        <span class="m-l-16">项目名称：</span>
        <a-select :style="{ width: '230px' }" placeholder="输入项目名称" allow-search>
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
          <a-option disabled>Disabled</a-option>
        </a-select>
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
            <div class="border-r">
              <a-space>
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
            </div>
            <a-tag
              v-for="(item, index) of tabChangeColumInfo.up"
              :key="index"
              :color="item.isShow === 1 ? 'arcoblue' : ''"
              size="large"
              class="pointer"
              @click="handleHasSonTabChange(item)"
            >
              {{ item.title }}
            </a-tag>
            <icon-up-circle class="pointer" v-if="isFold" size="20" @click="handleUp" />
            <icon-down-circle class="pointer" v-else size="20" @click="handleDown" />
          </a-space>
        </div>
        <transition appear>
          <div v-show="isFold">
            <a-space wrap>
              <a-tag
                v-for="(item, index) of tabChangeColumInfo.down"
                :key="index"
                :color="item.isShow === 1 ? 'arcoblue' : ''"
                size="large"
                class="pointer"
                @click="handleHasSonTabChange(item)"
              >
                {{ item.title }}
              </a-tag>
            </a-space>
          </div>
        </transition>
      </div>
      <div style="align-self: flex-start">
        <a-radio-group type="button" v-model:model-value="selectMonth" size="large" @change="handleMonthChange">
          <a-radio value="3">近3个月</a-radio>
          <a-radio value="6">近6个月</a-radio>
          <a-radio value="12">近12个月</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="m-t-20">
      <a-table
        :columns="tableInfo.columns"
        :data="tableInfo.data"
        column-resizable
        :scroll="{ maxHeight: tableInfo.maxHeight }"
        :scrollbar="{ x: true, y: 1500 }"
        :pagination="false"
        :loading="tableInfo.loading"
        :bordered="{ cell: true }"
        ref="tableRef"
      >
        <template #[canvasLine1]="{ record }">
          <canvasVue :route="record[canvasLine1]" :height="20" :width="50" />
        </template>
        <template #[canvasLine2]="{ record }">
          <canvasVue :route="record[canvasLine2]" :height="20" :width="50" />
        </template>
        <template #[canvasLine3]="{ record }">
          <canvasVue :route="record[canvasLine3]" :height="20" :width="50" />
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref, nextTick, onMounted, toRaw } from "vue";
import { useTagColumnListStore } from "../../store/index";
import { getDepartmentRingList } from "@/api/loopAnalyze.js";
import { getNMonthsAgo } from "../../utils/util";
import canvasVue from "@/components/canvasContainer.vue";
import { Message } from "@arco-design/web-vue";
let tagColumnList = useTagColumnListStore();
let columConfig = {};
const isFold = ref(false);
const tableInfo = reactive({
  columns: [],
  data: [],
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
const canvasLine1 = ref("");
const canvasLine2 = ref("");
const canvasLine3 = ref("");
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
          };
          columnItemConfig.isShow = conf.isShow;
          if (conf.fixed !== undefined) {
            columnItemConfig.fixed = conf.fixed;
          }
          if (conf.toFixed !== undefined) {
            if (conf.showPercent) {
              columnItemConfig.render = ({ record }) => {
                return record[col];
              };
            } else {
              columnItemConfig.render = ({ record }) => {
                return record[col];
              };
            }
          }
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
  tabChangeColumInfo.columnTabs = columConfig.level1.columnTabs;
  tabChangeColumInfo.up = columConfig.level1.columnHasSonTabs.slice(0, 5);
  tabChangeColumInfo.down = columConfig.level1.columnHasSonTabs.slice(5);
};
let filterShowChildrenColumn = [];
// 更换表头
const analysiisColumn = () => {
  let { columnTabs, noHiddenColumn, defaultColumHasSonTabs } = columConfig.level1;
  let num = 6;
  switch (selectMonth.value) {
    case "3":
      let months1 = getNMonthsAgo(3);
      let children1 = [];
      let filterHasSonShowColumn1 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months1.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = `${item[0]}年${item[1]}月`;
        columnHasSonConfig.children = filterHasSonShowColumn1.map((jtem, j) => {
          num++;
          return {
            ...jtem,
            dataIndex: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
            slotName: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
          };
        });
        children1.push(columnHasSonConfig);
      });
      num = 0;
      filterShowChildrenColumn = children1;
      break;
    case "6":
      let months2 = getNMonthsAgo(6);
      let children2 = [];
      let filterHasSonShowColumn2 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months2.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = `${item[0]}年${item[1]}月`;
        columnHasSonConfig.children = filterHasSonShowColumn2.map((jtem, j) => {
          num++;
          return {
            ...jtem,
            dataIndex: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
            slotName: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
          };
        });
        children2.push(columnHasSonConfig);
      });
      num = 0;
      filterShowChildrenColumn = children2;
      break;
    case "12":
      let months3 = getNMonthsAgo(12);
      let children3 = [];
      let filterHasSonShowColumn3 = defaultColumHasSonTabs.filter(item => item.isShow === 1);
      months3.forEach((item, i) => {
        let columnHasSonConfig = {};
        columnHasSonConfig.title = `${item[0]}年${item[1]}月`;
        columnHasSonConfig.children = filterHasSonShowColumn3.map((jtem, j) => {
          num++;
          return {
            ...jtem,
            dataIndex: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
            slotName: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
          };
        });
        children3.push(columnHasSonConfig);
      });
      num = 0;
      filterShowChildrenColumn = children3;
      break;
    default:
      break;
  }
  filterShowChildrenColumn.forEach(item => {
    if (item.children?.length) {
      item.children = item.children.filter(jtem => jtem.isShow === 1);
    }
  });
  let filterAllShowColumn = [...columnTabs.filter(item => item.isShow === 1), ...noHiddenColumn, ...filterShowChildrenColumn];
  let number = 0;
  filterAllShowColumn.forEach(item => {
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
      });
    }
  });
  tableInfo.columns = filterAllShowColumn;
  var index = tableInfo.columns.findIndex(item => item.children);
  canvasLine3.value = tableInfo.columns[index - 1].dataIndex;
  canvasLine2.value = tableInfo.columns[index - 2].dataIndex;
  canvasLine1.value = tableInfo.columns[index - 3].dataIndex;
};
// 切换时间区间
const handleMonthChange = month => {
  selectMonth.value = month;
  analysiisColumn();
  getList();
};
onBeforeMount(() => {
  seltColumns();
  analysiisColumn();
  getList();
});
// 点击部门名称 客户名称
const handleTabChange = tab => {
  switch (tab.isShow) {
    case 0:
      tab.isShow = 1;
      changeShowStatus({
        type: "parent",
        title: tab.title,
        val: 1,
      });
      break;
    case 1:
      tab.isShow = 0;
      changeShowStatus({
        type: "parent",
        title: tab.title,
        val: 0,
      });
      break;
    default:
      break;
  }
};
// 点击部门名称 客户名称之外的标签
const handleHasSonTabChange = tab => {
  switch (tab.isShow) {
    case 0:
      tab.isShow = 1;
      changeShowStatus({
        type: "self",
        title: tab.title,
        val: 1,
      });
      break;
    case 1:
      tab.isShow = 0;
      changeShowStatus({
        type: "self",
        title: tab.title,
        val: 0,
      });
      break;
    default:
      break;
  }
};
// 更改高亮状态并更换表头
const changeShowStatus = obj => {
  let { columnTabs, noHiddenColumn, defaultColumHasSonTabs } = columConfig.level1;
  let columnsArr = [];
  let filterHasSonShowColumn = defaultColumHasSonTabs.filter(item => item.isShow === 1);
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
  let months = getNMonthsAgo(selectMonth.value);
  let children = [];
  let num = 0;
  months.forEach((item, i) => {
    let columnHasSonConfig = {};
    columnHasSonConfig.title = `${item[0]}年${item[1]}月`;
    columnHasSonConfig.children = filterHasSonShowColumn.map((jtem, j) => {
      num++;
      return {
        ...jtem,
        dataIndex: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
        slotName: `${item[0]}${("" + item[1]).padStart(2, "0")}col${num}`,
      };
    });
    children.push(columnHasSonConfig);
  });
  columnsArr = [...columnTabs.filter(item => item.isShow === 1), ...noHiddenColumn, ...children];
  let number = 0;
  columnsArr.forEach(item => {
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
      });
    }
  });
  tableInfo.columns = columnsArr;
  var index = tableInfo.columns.findIndex(item => item.children);
  canvasLine3.value = tableInfo.columns[index - 1].dataIndex;
  canvasLine2.value = tableInfo.columns[index - 2].dataIndex;
  canvasLine1.value = tableInfo.columns[index - 3].dataIndex;
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
    if (item.title === "客户名称") {
      arr.push("customerName");
    }
    if (item.title === "项目名称") {
      arr.push("projectName");
    }
    if (item.title === "收入趋势") {
      arr.push("canvasLine1");
    }
    if (item.title === "成本趋势") {
      arr.push("canvasLine2");
    }
    if (item.title === "毛利率趋势") {
      arr.push("canvasLine3");
    }
    if (item.children) {
      item.children.forEach(jtem => {
        if (jtem.title === "人数") {
          arr.push("colNo1");
        }
        if (jtem.title === "营业收入") {
          arr.push("colNo2");
        }
        if (jtem.title === "销售毛利") {
          arr.push("colNo3");
        }
        if (jtem.title === "销售毛利率") {
          arr.push("colNo4");
        }
        if (jtem.title === "直接成本") {
          arr.push("colNo5");
        }
        if (jtem.title === "人均营业收入") {
          arr.push("colNo6");
        }
        if (jtem.title === "人均直接成本") {
          arr.push("colNo7");
        }
        if (jtem.title === "未完工项目成本") {
          arr.push("colNo8");
        }
        if (jtem.title === "招聘费用") {
          arr.push("colNo9");
        }
        if (jtem.title === "销售费用") {
          arr.push("colNo10");
        }
        if (jtem.title === "管理费用") {
          arr.push("colNo11");
        }
      });
    }
  });
  const params = {
    interval: Number(selectMonth.value),
    dynamicHeaderParam: Array.from(new Set(arr)),
    xAxis: 50,
    yAxis: 20,
  };
  getDepartmentRingList(params)
    .then(res => {
      if (res.code == "200") {
        tableInfo.data = res.data;
      }
    })
    .catch(e => {
      Message.error(e.message || "请求失败");
    })
    .finally(() => {
      tableInfo.loading = false;
    });
};
// 查询
const handleSearch = () => {
  getList();
};
// 重置
const handleReset = () => {};
// 打开
const handleUp = () => {
  isFold.value = false;
};
// 关闭
const handleDown = () => {
  isFold.value = true;
};
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
