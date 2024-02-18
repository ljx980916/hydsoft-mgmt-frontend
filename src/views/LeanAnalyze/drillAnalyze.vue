<template>
  <div v-show="currentLevel === 'level1'" class="defaultPadding">
    <div class="m-b-26 flex-between">
      <div class="flex m-r-24">
        <div class="m-r-24">
          月份：
          <a-month-picker
            v-model="dateNow"
            style="width: 120px; border-radius: 4px"
            :allow-clear="false"
            :disabledDate="disabledDateFn"
            @change="monthPickChange"
          />
        </div>
        <a-radio-group
          type="button"
          size="large"
          v-model="level1CheckedValue"
          @change="radioCheckedChange"
          :disabled="level1RadioDisabled"
        >
          <a-radio v-for="item of tableInfo.level1.tabs" :value="item.key">{{ item.name }}</a-radio>
        </a-radio-group>
      </div>
      <a-space>
        <a-popconfirm content="确定导出全部吗?" @ok="level1ExportAll">
          <a-button type="outline" :loading="level1ExportAllLoading" style="border-radius: 4px">
            <template #icon>
              <icon-download />
            </template>
            <template #default>导出全部</template>
          </a-button>
        </a-popconfirm>
        <a-popconfirm content="确定导出本页吗?" @ok="level1ExportCurrentPage">
          <a-button type="primary" :loading="level1ExportLoading" style="border-radius: 4px">
            <template #icon>
              <icon-download />
            </template>
            <template #default>导出本页</template>
          </a-button>
        </a-popconfirm>
      </a-space>
    </div>
    <a-table
      :row-class="rowClass"
      :columns="tableInfo.level1.columns[level1CheckedValue] || []"
      :data="tableInfo.level1.data"
      :bordered="false"
      column-resizable
      :expanded-keys="tableInfo.level1.defaultExpandedKeys"
      :scroll="{ maxHeight: tableInfo.level1.maxHeight }"
      :scrollbar="false"
      :pagination="false"
      :loading="tableInfo.loading"
      ref="level1tableRef"
      @expanded-change="expandedChange"
    >
      <template #lastDeptName="{ record }">
        <a-popover
          v-if="currentLevel === 'level1'"
          :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
          :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
        >
          <a href="javaScript:void(0)" v-if="record.leafNode === '1'" style="color: #165dff" @click="jump('level2', record)">
            {{ record.lastDeptName }}
          </a>
          <span class="pointer" v-else>{{ record.lastDeptName }}</span>
          <template #content>
            {{ record.deptName }}
          </template>
        </a-popover>
      </template>
      <template #columTitleSlot="{ column }">
        <a-tooltip style="width: max-content" :content="column.title">
          <a href="javaScript:void(0)" style="color: #333">{{ column.title }}</a>
        </a-tooltip>
      </template>
      <template #empty>
        <a-empty />
      </template>
    </a-table>
  </div>
  <div v-show="currentLevel === 'level2'" class="defaultPadding">
    <div class="m-b-26 flex-between">
      <div class="m-r-24">
        <a-radio-group
          type="button"
          size="large"
          v-model="level2CheckedValue"
          @change="level2RadioCheckedChange"
          :disabled="level2RadioDisabled"
        >
          <a-radio v-for="item of tableInfo.level2.tabs" :value="item.key">{{ item.name }}</a-radio>
        </a-radio-group>
      </div>
      <div>
        <a-button
          type="outline"
          :disabled="level2CheckedArr.length === 0"
          style="border-radius: 4px"
          class="m-r-24"
          @click="level2SetRole"
        >
          <template #icon>
            <icon-user />
          </template>
          <template #default>设置角色</template>
        </a-button>
        <a-popconfirm content="确定导出本页吗?" @ok="level2ExportAll">
          <a-button type="primary" :loading="level2ExportLoading" style="border-radius: 4px">
            <template #icon>
              <icon-download />
            </template>
            <template #default>导出本页</template>
          </a-button>
        </a-popconfirm>
      </div>
    </div>
    <a-table
      :row-class="rowClass"
      :columns="tableInfo.level2.columns[level2CheckedValue] || []"
      :data="tableInfo.level2.data"
      :bordered="false"
      column-resizable
      :expanded-keys="tableInfo.level2.defaultExpandedKeys"
      :scroll="{ maxHeight: tableInfo.level2.maxHeight }"
      :scrollbar="false"
      :pagination="false"
      :loading="tableInfo.loading"
      ref="level2tableRef"
      @expanded-change="expandedChange"
    >
      <template #title="{ record }">
        <a-checkbox
          class="m-r-8"
          style="vertical-align: middle"
          v-if="record.leafNode === '1'"
          :model-value="level2CheckedArr.length > 0 && level2CheckedArr.findIndex(item => item.id === record.id) !== -1"
          @change="level2CheckboxChange($event, record)"
        />
        <a-popover
          v-if="currentLevel === 'level2'"
          :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
          :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
        >
          <a href="javaScript:void(0)" v-if="record.leafNode === '1'" style="color: #165dff" @click="jump('level3', record)">
            {{ record.title }}
          </a>
          <span class="pointer" v-else>{{ record.title }}</span>
          <template #content>
            {{ record.title }}
          </template>
        </a-popover>
      </template>
      <template #empty>
        <a-empty />
      </template>
    </a-table>
  </div>
  <div v-show="currentLevel === 'level3'">
    <div class="level3Header">
      <div class="w-perct-80">
        <a-space wrap :size="[20, 0]">
          <div class="item">
            <span>项目营业收入：</span>
            {{ toInteger(level3HeaderData.colNo5, 0) }}
          </div>
          <div class="item">
            <span>项目销售毛利：</span>
            {{ toInteger(level3HeaderData.colNo8, 0) }}
          </div>
          <div class="item">
            <span>项目销售毛利率：</span>
            {{ number2percentage(level3HeaderData.colNo9, 2) }}
          </div>
          <div class="item">
            <span>项目C1总人数：</span>
            {{ toInteger(level3HeaderData.colNo1, 0) }}
          </div>
          <div class="item">
            <span>项目人员利用率：</span>
            {{ number2percentage(level3HeaderData.colNo3, 2) }}
          </div>
        </a-space>
      </div>
      <div>
        <a-radio-group type="button" size="large" v-model:model-value="level3TabSelect" @change="changeDataType">
          <a-radio value="list">列表</a-radio>
          <a-radio value="chart">看图</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="defaultPadding" v-if="dataType == 'list'">
      <div class="m-b-20">
        集团/客户/项目 :
        {{ level3HeaderData.groupCustomerName + " / " + level3HeaderData.customerName + " / " + level3HeaderData.title }}
        <!-- <a href="javaScript:void(0)" style="color: #165dff">
          {{ level3HeaderData.groupCustomerName }}
        </a>
        /
        <a href="javaScript:void(0)" style="color: #165dff">
          {{ level3HeaderData.customerName }}
        </a>
        /
        <a href="javaScript:void(0)" style="color: #165dff">
          {{ level3HeaderData.title }}
        </a> -->
      </div>
      <div class="m-b-20 flex-between">
        <div>
          <a-radio-group
            type="button"
            size="large"
            v-model="level3CheckedValue"
            :disabled="level3RadioDisabled"
            @change="level3RadioCheckedChange"
          >
            <a-radio v-for="item of tableInfo.level3.tabs" :value="item.key">{{ item.name }}</a-radio>
          </a-radio-group>
        </div>
        <div>
          <a-space>
            <a-popconfirm content="确定导出本页吗?" @ok="level3Export">
              <a-button type="primary" class="m-l-14" :loading="level3ExportLoading">
                <template #icon>
                  <icon-export />
                </template>
                <template #default>导出本页</template>
              </a-button>
            </a-popconfirm>
          </a-space>
        </div>
      </div>
      <a-table
        :row-class="rowClass"
        :columns="tableInfo.level3.columns[level3CheckedValue] || []"
        :data="tableInfo.level3.data"
        :bordered="false"
        column-resizable
        :expanded-keys="tableInfo.level3.defaultExpandedKeys"
        :scroll="{ maxHeight: tableInfo.level3.maxHeight }"
        :scrollbar="false"
        :pagination="false"
        :loading="tableInfo.loading"
        ref="level3tableRef"
        @expanded-change="expandedChange"
      >
        <template #position="{ record }">
          <a-popover
            v-if="currentLevel === 'level3'"
            :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
            :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
          >
            <span class="pointer">{{ record.position }}</span>
            <template #content>
              {{ record.position }}
            </template>
          </a-popover>
        </template>
        <template #empty>
          <a-empty />
        </template>
      </a-table>
    </div>
    <div v-if="dataType == 'chart'">
      <a-space class="chartSelect">
        <span>颜色维度：</span>
        <a-select v-model="type" placeholder="请选择" @change="changeType" style="width: 120px">
          <a-option v-for="item in typeList" :value="item.label" :key="item.label">{{ item.value }}</a-option>
        </a-select>
        <a-tooltip style="width: max-content">
          <template #content>
            <div>选项说明:</div>
            <div>1、出勤=月实际工时天数+法定节假日-实际发薪天数</div>
          </template>
          <icon-info-circle-fill size="20" style="color: #a9aeb8" />
        </a-tooltip>
      </a-space>
      <a-spin :loading="spinLoading" tip="正在加载..." style="display: block">
        <scatterPlot :seriesData="data" :color="color" />
      </a-spin>
    </div>
  </div>
  <a-modal v-model:visible="setRoleModal.visible" width="680px" title-align="start">
    <template #title>
      <span class="modal-title">设置项目行为角色</span>
    </template>
    <div class="flex-center">
      <a-spin :loading="setRoleModal.loading" tip="数据加载中。。。">
        <a-space direction="vertical" :size="24">
          <div v-for="(item, index) of setRoleModal.roles" :key="index">
            <span class="modal-label">{{ item.label }}：</span>
            <a-select
              :options="setRoleModal.selectOptions"
              :style="{ width: '378px' }"
              placeholder="输入并选择项目经理角色"
              v-model:model-value="item.value"
              allow-search
              :virtual-list-props="{ height: 200 }"
            >
              <template #arrow-icon>
                <icon-down />
              </template>
            </a-select>
          </div>
        </a-space>
      </a-spin>
    </div>
    <template #footer>
      <div class="text-center">
        <a-button type="outline" class="m-r-24" :disabled="setRoleModal.loading" @click="setRoleCancel">取消</a-button>
        <a-button type="primary" :disabled="setRoleModal.loading" :loading="setRoleModal.confirmBtnLoading" @click="setRoleOk">
          确定
        </a-button>
      </div>
    </template>
  </a-modal>
  <a-modal v-model:visible="blocInfoModal.visible" width="760px" title-align="start">
    <template #title>
      <span class="modal-title">详情-集团客户</span>
    </template>
    <div>
      <div class="blocInfoModal-content-title">集团客户名称：集团客户-三星</div>
      <a-table
        :columns="blocInfoModal.tableColumns"
        :data="blocInfoModal.tableData"
        :bordered="{ cell: true }"
        :pagination="false"
      ></a-table>
    </div>
    <template #footer>
      <div class="text-center">
        <a-button type="primary" @click="blocInfoModalOk">知道了</a-button>
      </div>
    </template>
  </a-modal>
  <a-modal v-model:visible="customerModal.visible" width="784px" title-align="start">
    <template #title>
      <span class="modal-title">详情-客户</span>
    </template>
    <div class="m-b-30">
      <div class="customerModal-content-title">基本信息</div>
      <a-descriptions
        :column="customerModal.basicColumn"
        :data="customerModal.basicData"
        :value-style="{ color: '#7B7B7B', fonSize: '14px' }"
        bordered
      />
    </div>
    <div>
      <div class="customerModal-content-title">人员信息</div>
      <a-descriptions
        :column="customerModal.staffColumn"
        :data="customerModal.staffData"
        :value-style="{ color: '#7B7B7B', fonSize: '14px' }"
        bordered
      />
    </div>
    <template #footer>
      <div class="text-center">
        <a-button type="primary">知道了</a-button>
      </div>
    </template>
  </a-modal>
  <a-modal v-model:visible="projectModal.visible" width="784px" title-align="start">
    <template #title>
      <span class="modal-title">详情-项目</span>
    </template>
    <div class="m-b-30">
      <div class="customerModal-content-title">基本信息</div>
      <a-descriptions
        :column="projectModal.basicColumn"
        :data="projectModal.basicData"
        :value-style="{ color: '#7B7B7B', fonSize: '14px' }"
        bordered
      />
    </div>
    <div class="m-b-30">
      <div class="customerModal-content-title">人员信息</div>
      <a-descriptions
        :column="projectModal.staffColumn"
        :data="projectModal.staffData"
        :value-style="{ color: '#7B7B7B', fonSize: '14px' }"
        bordered
      />
    </div>
    <div>
      <div class="customerModal-content-title">经营信息</div>
      <a-descriptions
        :column="projectModal.manageColumn"
        :data="projectModal.manageData"
        :value-style="{ color: '#7B7B7B', fonSize: '14px' }"
        bordered
      />
    </div>
    <template #footer>
      <div class="text-center">
        <a-button type="primary">知道了</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { onBeforeMount, reactive, ref, watchEffect, nextTick, toRaw, onUnmounted, markRaw } from "vue";
import { Message } from "@arco-design/web-vue";
import scatterPlot from "@/components/scatterPlot.vue";
import { useTagColumnListStore } from "../../store/index";
import {
  queryCoreData,
  queryDownDrillSecond,
  queryDownDrillThird,
  countWorkdaysByMonth,
  queryScatterDiagram,
  listByProjectNo,
  queryLikeDept,
  save,
  empExportExcel,
  bgExportExcel,
  cuPoExportExcel,
  downAllExcel,
} from "../../api/drillAnalyze";
import { number2percentage, toInteger, dataAddKey, getCurrentDate, encrypt } from "../../utils/util";
import { getCurrentInstance } from "@vue/runtime-core";
import moment from "moment";

let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;

// 第三层tab
const level3TabSelect = ref("list");
let level3HeaderContent = [];
/************* 下钻分析列信息************** */
let tagColumnList = useTagColumnListStore();
let level3ProjectCode = ""; //下钻三层的项目编码

let level2Record = {}; //点击下钻时的数据
let level3Record = {};
let columConfig = {};
// 颜色维度列表
const typeList = ref([
  {
    label: 1,
    value: "出勤",
  },
  {
    label: 2,
    value: "入职日期",
  },
]);
// 颜色维度
const type = ref(1);
// 数据
const data = ref([]);
// 颜色种类
const color = ref([]);
// 看图 & 列表
const dataType = ref("list");

//禁止选择2022(含)年之前的月份
const disabledDateFn = current => {
  return current.valueOf() < moment("2023-01-01 00:00:00").valueOf();
};
const level3HeaderData = ref({});
const columns = () => {
  let tagColumns = toRaw(tagColumnList.getTagColumnList) || [];
  let currentPageColumn = tagColumns.filter(item => item.report === "下钻分析") || [];
  if (currentPageColumn.length) {
    currentPageColumn[0].tier.forEach((item, index) => {
      let tabs = [];
      let currentPageColumn = {};
      item.tags.forEach(jtem => {
        tabs.push(jtem.tag);
        let columnItem = [];
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
            titleSlotName: "columTitleSlot",
          };
          if (conf.fixed !== undefined) {
            columnItemConfig.fixed = conf.fixed;
          }
          if (conf.toFixed !== undefined) {
            if (conf.showPercent) {
              columnItemConfig.render = ({ record }) => {
                return <span innerHTML={number2percentage(record[col], conf.toFixed, conf.isRed)}></span>;
              };
            } else {
              columnItemConfig.render = ({ record }) => {
                return <span innerHTML={toInteger(record[col], conf.toFixed, conf.isRed)}></span>;
              };
            }
          }
          columnItem.push(columnItemConfig);
        });
        currentPageColumn[jtem.tag.key] = columnItem;
      });
      columConfig["level" + (index + 1)] = {
        tabs,
        params: item.params || [],
        columns: currentPageColumn,
      };
    });
  }
  let { level1, level2, level3 } = columConfig;
  level1CheckedValue.value = level1.tabs[0].key;
  level2CheckedValue.value = level2.tabs[1].key;
  level3CheckedValue.value = level3.tabs[1].key;
  tableInfo.level1.tabs = level1.tabs;
  tableInfo.level1.columns = level1.columns;
  tableInfo.level2.tabs = level2.tabs;
  tableInfo.level2.columns = level2.columns;
  tableInfo.level3.tabs = level3.tabs;
  tableInfo.level3.columns = level3.columns;
};
/************* 下钻分析列信息************** */

/***************获取当前月份********************* */
const currentLevel = ref("level1"); //level2,level3
let { year, month } = getCurrentDate();

let currentDate = `${year}-${month}`;
const dateNow = ref(currentDate);
/***************获取当前月份********************* */

/****************** 获取当月工作日天数************************** */
const currentMonthDay = ref(0);
const getCurrentMonthWorkday = () => {
  const params = {
    month: dateNow.value,
  };
  countWorkdaysByMonth(params)
    .then(res => {
      if (res.code === "200") {
        currentMonthDay.value = res.data;
      }
    })
    .catch(() => {
      Message.error("请求失败");
    });
};

/****************** 标签表格配置信息************************** */
const level1CheckedValue = ref("coreData");
const level1RadioDisabled = ref(true);
const level2CheckedValue = ref("coreData2");
const level2RadioDisabled = ref(true);
const level3CheckedValue = ref("empInfo");
const level3RadioDisabled = ref(true);

const tableInfo = reactive({
  loading: false,
  level1: {
    tabs: [],
    columns: {},
    data: [],
    defaultExpandedKeys: [],
    maxHeight: "200px",
  },
  level2: {
    tabs: [],
    columns: {},
    data: [],
    defaultExpandedKeys: [],
    maxHeight: "200px",
  },
  level3: {
    tabs: [],
    columns: {},
    data: [],
    defaultExpandedKeys: [],
    maxHeight: "200px",
  },
});
/****************** 标签表格配置信息************************** */

/***************** 计算表格自适应高度************************ */
const level1tableRef = ref(null);
const level2tableRef = ref(null);
const level3tableRef = ref(null);

/***************** 计算表格自适应高度************************ */

/******************* 月份改变重新请求数据**************************** */
const monthPickChange = value => {
  dateNow.value = value;
  getCurrentMonthWorkday();
  level1Data(level1CheckedValue.value);
};
/******************* 月份改变重新请求数据**************************** */
onBeforeMount(() => {
  if(month =='00'){
    currentDate = `${year-1}-12`;
    dateNow.value =currentDate;
  }
  columns();
  level1Data(level1CheckedValue.value);
  getCurrentMonthWorkday();
});

/**************** 表格偶数层级指定背景色************************** */
const rowClass = record => {
  if (record.raw.deptLevel % 2 === 0) {
    return "row-gray";
  }
};
const level3RadioCheckedChange = val => {
  level3Data(val);
};
/******************** 根据所选标签请求表格数据*************************** */
const level1Data = tagKey => {
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    month,
    tagKey,
  };
  tableInfo.loading = true;
  level1RadioDisabled.value = true;
  queryCoreData(params)
    .then(res => {
      if (res.code === "200") {
        let data = dataAddKey(res.data, "key", "id");
        let keys = [];
        res.data.forEach(item => keys.push(item.id));
        tableInfo.level1.defaultExpandedKeys = keys;
        tableInfo.level1.data = data;
        if (level1tableRef.value) {
          let head = level1tableRef.value.$el;
          let elHeight = head.getBoundingClientRect().top;
          let innerHeight = window.innerHeight;
          tableInfo.level1.maxHeight = innerHeight - elHeight + "px";
          nextTick(() => {
            let layoutContent = document.getElementById('a-layout-main')
            if(layoutContent){
              let diff = layoutContent.scrollHeight - layoutContent.offsetHeight
              tableInfo.level1.maxHeight = parseInt(tableInfo.level1.maxHeight)-diff+'px'
            }
          });
        }
      } else {
        tableInfo.level1.data = [];
        Message.error(res.desc || "请求数据失败");
      }
    })
    .catch(err => {
      Message.error(err.message || "请求数据失败");
    })
    .finally(() => {
      tableInfo.loading = false;
      level1RadioDisabled.value = false;
    });
};
let level2keys = [];
function expandAllRows(arr) {
  arr.forEach(item => {
    level2keys.push(item.title);
    if (item.children && item.children.length) {
      expandAllRows(item.children);
    }
  });
}
const level2Data = tagKey => {
  tableInfo.loading = true;
  level2RadioDisabled.value = true;
  $bus.emit("goBackDisabled", true);
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    deptId: level2Record.id,
    month,
    tagKey,
  };
  Array.isArray(columConfig.level1.params) &&
    columConfig.level1.params.forEach(item => {
      params[item] = encrypt(level2Record[item]);
      if (level2Record[item] === undefined || level2Record[item] === null) {
        params[item] = encrypt(0);
      }
    });
  queryDownDrillSecond(params)
    .then(res => {
      if (res.code === "200") {
        let data = dataAddKey(res.data, "key", "title");
        expandAllRows(res.data);
        tableInfo.level2.defaultExpandedKeys = level2keys;
        tableInfo.level2.data = data;
        if (level2CheckedValue.value !== "financeManage2") {
          level3HeaderContent = data;
        }
        if (level2tableRef.value) {
          let head = level2tableRef.value.$el;
          let innerHeight = window.innerHeight;
          let elHeight = head.getBoundingClientRect().top;
          tableInfo.level2.maxHeight = innerHeight - elHeight + "px";
        }
        nextTick(() => {
          let layoutContent = document.getElementById('a-layout-main')
          if(layoutContent){
            let diff = layoutContent.scrollHeight - layoutContent.offsetHeight
            tableInfo.level2.maxHeight = parseInt(tableInfo.level2.maxHeight)-diff+'px'
          }
        });
      } else {
        tableInfo.level2.data = [];
        Message.error(res.desc || "操作失败");
      }
    })
    .catch(err => {
      Message.error(err.message || "请求数据失败");
    })
    .finally(() => {
      tableInfo.loading = false;
      level2RadioDisabled.value = false;
      $bus.emit("goBackDisabled", false);
    });
};
const level3Data = tagKey => {
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    projectCode: level3ProjectCode,
    deptId: level2Record.id,
    month,
    tagKey,
  };
  Array.isArray(columConfig.level2.params) &&
    columConfig.level2.params.forEach(item => {
      params[item] = encrypt(level3Record[item]);
      if (level3Record[item] === undefined || level3Record[item] === null) {
        params[item] = encrypt(0);
      }
    });
  tableInfo.loading = true;
  level3RadioDisabled.value = true;
  $bus.emit("goBackDisabled", true);
  queryDownDrillThird(params)
    .then(res => {
      if (res.code === "200") {
        let data = dataAddKey(res.data, "key", "id");
        let keys = [];
        res.data.forEach(item => keys.push(item.id));
        tableInfo.level3.defaultExpandedKeys = keys;
        tableInfo.level3.data = data;
        if (level3tableRef.value) {
          let head = level3tableRef.value.$el;
          let innerHeight = window.innerHeight;
          let elHeight = head.getBoundingClientRect().top;
          tableInfo.level3.maxHeight = innerHeight - elHeight + "px";
        }
        nextTick(() => {
          let layoutContent = document.getElementById('a-layout-main')
          if(layoutContent){
            let diff = layoutContent.scrollHeight - layoutContent.offsetHeight
            tableInfo.level3.maxHeight = parseInt(tableInfo.level3.maxHeight)-diff+'px'
          }
        });
      } else {
        tableInfo.level3.data = [];
        Message.error(res.desc || "请求数据失败");
      }
    })
    .catch(err => {
      Message.error(err.message || "请求数据失败");
    })
    .finally(() => {
      tableInfo.loading = false;
      level3RadioDisabled.value = false;
      $bus.emit("goBackDisabled", false);
    });
  getList(type.value);
};
/******************** 根据所选标签请求表格数据*************************** */

/***************** 标签点击切换请求数据************************** */
const radioCheckedChange = val => {
  level1Data(val);
};

const level2RadioCheckedChange = val => {
  level2Data(val);
};
/***************** 标签点击切换请求数据************************** */
watchEffect(() => {
  $bus.emit("updateStructure", [
    { type: "text", color: "#333", msg: `${moment(dateNow.value).format("YYYY年MM月")} (${currentMonthDay.value}天)` },
  ]);
});

/**************** 监听点击返回上一层***************************** */
$bus.on("goBack", val => {
  currentLevel.value = val;
  switch (val) {
    case "level1":
      let breadList1 = [
        { type: "text", color: "#333", msg: `${moment(dateNow.value).format("YYYY年MM月")} (${currentMonthDay.value}天)` },
      ];
      $bus.emit("updateStructure", breadList1);
      //level1Data(level1CheckedValue.value)
      break;
    case "level2":
      let breadList2 = [
        {
          type: "button",
          color: "#5370FD",
          msg: `${moment(dateNow.value).format("YYYY年MM月")} (${currentMonthDay.value}天)`,
          params: "level1",
        },
        {
          type: "text",
          color: "#333",
          msg: level2Record.deptName,
        },
      ];
      $bus.emit("updateStructure", breadList2);
      break;
    default:
      break;
  }
});
onUnmounted(() => {
  $bus.off("goBack");
});
/**************** 监听点击返回上一层***************************** */

/***********************点击跳转下钻层级********************************** */
const jump = (val, record) => {
  currentLevel.value = val;
  if (val === "level2") {
    level2Record = record;
    level2Data(level2CheckedValue.value);
    let breadList = [
      {
        type: "button",
        color: "#5370FD",
        msg: `${moment(dateNow.value).format("YYYY年MM月")} (${currentMonthDay.value}天)`,
        params: "level1",
      },
      {
        type: "text",
        color: "#333",
        msg: level2Record.deptName,
      },
    ];
    $bus.emit("updateStructure", breadList);
    level2CheckedArr.value = [];
  }
  if (val === "level3") {
    level3ProjectCode = record.projectNo;
    level3Record = record;
    let { groupCustomerName, customerName, title } = record;
    let level3HeaderDataArr1 = level3HeaderContent.filter(item => item.title === groupCustomerName);
    let level3HeaderDataArr2 =
      level3HeaderDataArr1 && level3HeaderDataArr1[0]?.children.filter(item => item.title === customerName);
    let level3HeaderDataArr3 = level3HeaderDataArr2 && level3HeaderDataArr2[0]?.children.filter(item => item.title === title);
    level3HeaderData.value = (level3HeaderDataArr3 && level3HeaderDataArr3[0]) || {};
    level3Data(level3CheckedValue.value);
    let breadList = [
      {
        type: "button",
        color: "#5370FD",
        msg: `${moment(dateNow.value).format("YYYY年MM月")} (${currentMonthDay.value}天)`,
        params: "level1",
      },
      {
        type: "button",
        color: "#5370FD",
        msg: level2Record.deptName,
        params: "level2",
      },
      {
        type: "text",
        color: "#333",
        msg: `项目： ${record.title}`,
      },
    ];
    $bus.emit("updateStructure", breadList);
  }
};
/***********************点击跳转下钻层级********************************** */

/*************************表格树结构展开切换******************************************** */
const expandedChange = rowKeys => {
  tableInfo[currentLevel.value].defaultExpandedKeys = rowKeys;
};
/*************************表格树结构展开切换******************************************** */
const spinLoading = ref(false);
// 获取散点图数据
const getList = value => {
  spinLoading.value = true;
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    projectCode: level3ProjectCode,
    deptId: level2Record.id,
    month,
    tagKey: level3CheckedValue.value,
    type: value,
  };
  Array.isArray(columConfig.level2.params) &&
    columConfig.level2.params.forEach(item => {
      params[item] = encrypt(level3Record[item]);
      if (level3Record[item] === undefined || level3Record[item] === null) {
        params[item] = encrypt(0);
      }
    });
  // 接口数据
  queryScatterDiagram(params)
    .then(res => {
      if (res.code === "200") {
        data.value = res.data;
        // 每个点的样式
        var itemStyle = {
          //设置圆形的样式
          shadowBlur: 10,
          shadowColor: "rgba(120, 36, 50, 0.5)",
          shadowOffsetY: 5,
        };
        data.value.forEach(item => {
          item.type = "scatter";
          item.itemStyle = itemStyle;
          item.symbolSize = 15;
        });
      }
      if (value === 1) {
        color.value = ["#503e6a", "#fec42c", "#f96f0d", "#dd4444"];
      } else {
        color.value = ["#f6d91d", "#fec42c", "#fb954d", "#f6682c", "#f81313", "#7d1d07"];
      }
    })
    .catch(e => {
      Message.error(e.message || "数据请求失败");
    })
    .finally(() => {
      spinLoading.value = false;
    });
};
// 更改颜色维度
const changeType = value => {
  type.value = value;
  getList(value);
};
//更改看图 列表
const changeDataType = value => {
  dataType.value = value;
};

/**************** 设置角色******************** */
const level2CheckedArr = ref([]);
const level2CheckboxChange = (bool, record) => {
  let index = level2CheckedArr.value.findIndex(item => item.id === record.id);
  if (bool) {
    if (level2CheckedArr.value.length > 0) {
      if (index === -1) {
        level2CheckedArr.value.push(toRaw(record));
      }
    } else {
      level2CheckedArr.value.push(toRaw(record));
    }
  } else {
    if (level2CheckedArr.value.length > 0) {
      if (index !== -1) {
        level2CheckedArr.value.splice(index, 1);
      }
    }
  }
};
const setRoleModal = reactive({
  visible: false,
  selectOptions: [],
  loading: false,
  roles: [
    {
      label: "项目经理角色",
      value: undefined,
    },
    {
      label: "收入上报角色",
      value: undefined,
    },
    {
      label: "薪资异动上报角色",
      value: undefined,
    },
    {
      label: "考勤上报角色",
      value: undefined,
    },
  ],
  confirmBtnLoading: false,
});
const level2SetRole = async () => {
  setRoleModal.visible = true;
  let roleStaffInfoList = [];
  let echoList = [];
  setRoleModal.roles.forEach(item => {
    item.value = undefined;
  });
  try {
    let params1 = {
      projectNo: level2CheckedArr.value.map(item => item.projectNo).toString(),
    };
    let roleStaffInfoResult = await listByProjectNo(params1);
    if (roleStaffInfoResult.code === "200") {
      roleStaffInfoList = roleStaffInfoResult.data;
    }
  } catch (error) {
    Message.error("请求数据失败");
  }
  try {
    setRoleModal.loading = true;
    let params = {
      deptName: level2Record.deptName,
    };
    let res2 = await queryLikeDept(params);
    if (res2.code === "200") {
      setRoleModal.selectOptions =
        (Array.isArray(res2.data) &&
          markRaw(
            res2.data.map(item => {
              roleStaffInfoList.forEach(jtem => {
                if (item.id === jtem.empId) {
                  echoList.push({
                    ...item,
                    roleId: jtem.roleId,
                  });
                }
              });
              return {
                value: JSON.stringify(item),
                label: `${item.empName} ( ${item.empCode},  ${item.deptName} )`,
              };
            }),
          )) ||
        [];
    }
  } catch (error) {
    Message.error("请求数据失败");
  }
  if (level2CheckedArr.value.length > 1) {
    setRoleModal.loading = false;
    return;
  }
  if (echoList.length) {
    setRoleModal.roles.forEach(item => {
      let index = echoList.findIndex(jtem => jtem.roleId === item.label);
      if (index !== -1) {
        delete echoList[index].roleId;
        item.value = JSON.stringify(echoList[index]);
      }
    });
  } else {
    setRoleModal.roles.forEach(item => {
      item.value = undefined;
    });
  }
  setRoleModal.loading = false;
};
const setRoleCancel = () => {
  setRoleModal.roles.forEach(item => {
    item.value = undefined;
  });
  setRoleModal.visible = false;
};
const setRoleOk = () => {
  let emptyArr = [];
  setRoleModal.roles.forEach(item => {
    if (item.value === undefined || item.value === "") {
      emptyArr.push(" ");
    }
  });
  if (emptyArr.length === setRoleModal.roles.length) return Message.error("至少选择一条");
  setRoleModal.confirmBtnLoading = true;
  let selsected = [];
  setRoleModal.roles.forEach(item => {
    if (item.value !== undefined) {
      try {
        let value = JSON.parse(item.value);
        selsected.push({
          dept: value.deptName || "",
          empId: value.id || "",
          empNo: value.empCode || "",
          empName: value.empName || "",
          roleId: item.label,
        });
      } catch (error) {
        throw Error(error);
      }
    }
  });
  let params = {
    projectNos: level2CheckedArr.value.map(item => item.projectNo),
    info: selsected,
  };
  save(params)
    .then(res => {
      if (res.code === "200") {
        Message.success(res.desc || "新建角色成功");
        level2CheckedArr.value = [];
      } else {
        Message.error(res.message || "请求失败");
      }
    })
    .catch(() => {
      Message.error("请求失败");
    })
    .finally(() => {
      setRoleModal.confirmBtnLoading = false;
      setRoleModal.visible = false;
    });
};
/**************** 设置角色******************** */
/************************ level1导出********************************** */
const level1ExportLoading = ref(false);
const level1ExportCurrentPage = () => {
  level1ExportLoading.value = true;
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    month,
  };
  bgExportExcel(params)
    .then(res => {
      const blob = new Blob([res]);
      const fileReader = new FileReader();
      fileReader.readAsText(res, "utf-8");
      fileReader.onerror = function () {
        Message.error("导出文件失败");
        return;
      };
      const fileName = `下钻分析_部门级别_${month}.xlsx`;
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
      level1ExportLoading.value = false;
    });
};
/************************ level1导出********************************** */

/************************ level1导出全部********************************** */
const level1ExportAllLoading = ref(false);
const level1ExportAll = () => {
  level1ExportAllLoading.value = true;
  Message.loading("下载时间较长，请耐心等待");
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    month,
  };
  downAllExcel(params)
    .then(res => {
      const blob = new Blob([res]);
      const fileName = `下钻分析_全部_${month}.xlsx`;
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
      level1ExportAllLoading.value = false;
    });
};

/************************ level1导出全部********************************** */

/************************ level2导出********************************** */
const level2ExportLoading = ref(false);
const level2ExportAll = () => {
  level2ExportLoading.value = true;
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    deptId: level2Record.id,
    month,
    deptName: level2Record.deptName,
    tagKey: level2CheckedValue.value,
  };
  Array.isArray(columConfig.level1.params) &&
    columConfig.level1.params.forEach(item => {
      params[item] = encrypt(level2Record[item]);
      if (level2Record[item] === undefined || level2Record[item] === null) {
        params[item] = encrypt(0);
      }
    });
  cuPoExportExcel(params)
    .then(res => {
      const blob = new Blob([res]);
      const fileName = `下钻分析_客户项目级别_${month}.xlsx`;
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
      level2ExportLoading.value = false;
    });
};

/************************ level2导出********************************** */

/**************** levle3导出本页****************** */
const level3ExportLoading = ref(false);
const level3Export = () => {
  level3ExportLoading.value = true;
  let mon = dateNow.value + "";
  let month = mon.replaceAll("-", "");
  let params = {
    projectCode: level3ProjectCode,
    deptId: level2Record.id,
    month,
    tagKey: level3CheckedValue.value,
    deptName: level2Record.deptName,
    groupCustomer: level3HeaderData.value.groupCustomerName + "",
    customer: level3HeaderData.value.customerName + "",
    projectName: level3HeaderData.value.title + "",
  };
  Array.isArray(columConfig.level2.params) &&
    columConfig.level2.params.forEach(item => {
      params[item] = encrypt(level3Record[item]);
      if (level3Record[item] === undefined || level3Record[item] === null) {
        params[item] = encrypt(0);
      }
    });
  empExportExcel(params)
    .then(res => {
      const blob = new Blob([res]);
      const fileName = `下钻分析_人员级别_${month}.xlsx`;
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
      level3ExportLoading.value = false;
    });
};
/**************** levle3导出本页****************** */

/****************** 集团/客户/项目详情***************************** */
const blocInfoModal = reactive({
  visible: false,
  tableColumns: [
    {
      title: "客户名称",
      dataIndex: "customerName",
      width: 294,
      headerCellStyle: { background: "#F7F8FF", color: "#78797B" },
      cellStyle: { color: "#7B7B7B" },
    },
    {
      title: "行业",
      dataIndex: "industry",
      width: 82,
      headerCellStyle: { background: "#F7F8FF", color: "#78797B" },
      cellStyle: { color: "#7B7B7B" },
    },
    {
      title: "地址",
      dataIndex: "adress",
      width: 330,
      headerCellStyle: { background: "#F7F8FF", color: "#78797B" },
      cellStyle: { color: "#7B7B7B" },
    },
  ],
  tableData: [
    {
      customerName: "三星半导体(中国)研究开发有限公司北京分公司",
      industry: "通信",
      adress: "北京市朝阳区北京市朝阳区太阳宫中路冠捷大厦8层",
      key: 1,
    },
  ],
});
const blocInfoModalOk = () => {
  blocInfoModal.visible = false;
};
const customerModal = reactive({
  visible: false,
  basicColumn: 2,
  basicData: [
    {
      label: "客户名称",
      value: "广州三星通信技术研究有限公司",
    },
    {
      label: "集团客户名称",
      value: "集团客户-三星",
    },
    {
      label: "行业",
      value: "信息技术",
    },
    {
      label: "开始合作时间",
      value: "2022-22-01",
    },
    {
      label: "区域",
      value: "大中华区",
    },
    {
      label: "地址",
      value: "广东省广州市黄埔区黄埔区科学城科学大道185号",
    },
  ],
  staffColumn: 2,
  staffData: [
    {
      label: "销售人员",
      value: "鲍雪欣",
    },
    {
      label: "销售人员部门",
      value: "BG2-STA-ERIREG_S",
    },
  ],
});

const projectModal = reactive({
  visible: false,
  basicColumn: 2,
  basicData: [
    {
      label: "客户名称",
      value: "广州三星通信技术研究有限公司",
    },
    {
      label: "集团客户名称",
      value: "集团客户-三星",
    },
    {
      label: "行业",
      value: "信息技术",
    },
    {
      label: "开始合作时间",
      value: "2022-22-01",
    },
    {
      label: "区域",
      value: "大中华区",
    },
    {
      label: "地址",
      value: "广东省广州市黄埔区黄埔区科学城科学大道185号",
    },
  ],
  staffColumn: 2,
  staffData: [
    {
      label: "所属部门",
      value: "BG1-MSD",
    },
    {
      label: "部门负责人",
      value: "金迪",
    },
  ],
  manageColumn: 2,
  manageData: [
    {
      label: "税率",
      value: " 6%",
    },
    {
      label: "预估毛利率",
      value: "50",
    },
    {
      label: "结算周期(天)",
      value: " 90",
    },
    {
      label: "回款周期(天)",
      value: "90",
    },
  ],
});
/****************** 集团/客户/项目详情***************************** */
</script>

<style lang="scss">
.m-t-10 {
  margin-top: 10px;
}
.m-b-10 {
  margin-bottom: 10px;
}
.row-gray .arco-table-td {
  background-color: #f8f8f8;
}
.level3Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  border-bottom: 10px solid #f0f2f5;
  .w-perct-80 {
    width: 80%;
    .item {
      color: #1e1e1e;
      span {
        color: #87909d;
      }
    }
  }
}
.arco-table-hover:not(.arco-table-dragging)
  .arco-table-tr:not(.arco-table-tr-empty):not(.arco-table-tr-summary):hover
  .arco-table-td.arco-table-col-fixed-left::before,
.arco-table-hover .arco-table-tr-drag .arco-table-td.arco-table-col-fixed-left::before,
.arco-table-hover:not(.arco-table-dragging)
  .arco-table-tr:not(.arco-table-tr-empty):not(.arco-table-tr-summary):hover
  .arco-table-td.arco-table-col-fixed-right::before,
.arco-table-hover .arco-table-tr-drag .arco-table-td.arco-table-col-fixed-right::before {
  background-color: #f1faff;
}
.arco-table-hover:not(.arco-table-dragging)
  .arco-table-tr:not(.arco-table-tr-empty):not(.arco-table-tr-summary):hover
  .arco-table-td:not(.arco-table-col-fixed-left):not(.arco-table-col-fixed-right),
.arco-table-hover .arco-table-tr-drag .arco-table-td:not(.arco-table-col-fixed-left):not(.arco-table-col-fixed-right) {
  background-color: #f1faff;
}
.modal-label {
  display: inline-block;
  width: 142px;
  text-align: right;
  padding-right: 15px;
  box-sizing: border-box;
}
.text-center {
  text-align: center;
}
.modal-title {
  color: #5a5a5a;
  font-size: 14px;
  font-weight: bold;
}
.blocInfoModal-content-title {
  color: #7b7b7b;
  font-size: 14px;
  margin-bottom: 22px;
}
.customerModal-content-title {
  color: "#333333";
  font-size: 14px;
  margin-bottom: 14px;
}
.chartSelect {
  float: right;
  margin: 60px 30px 0 0;
}
</style>
