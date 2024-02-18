<template>
  <div class="defaultPadding">
    <div class="flex-between-noCenter">
      <a-space>
        年份：
        <a-year-picker
          v-model="yearNow"
          :disabledDate="getDisabledTime"
          style="width: 120px; border-radius: 4px"
          :allow-clear="false"
          @change="yearPickChange"
        />
      </a-space>
      <a-space>
        <a-button type="primary" v-if="isEdit && paramsArr.length == 0" @click="handleLogoutEdit">退出编辑</a-button>
        <a-button type="primary" v-if="isEdit && paramsArr.length > 0" @click="handleSave">保存变更</a-button>
        <a-button type="primary" v-if="!isEdit" @click="handleEdit">编辑版本</a-button>
      </a-space>
    </div>
    <a-table
      ref="tableRef"
      :key="tableKey"
      column-resizable
      :row-class="rowClass"
      :columns="dataContent.columns"
      :data="dataContent.data"
      :loading="dataContent.loading"
      style="margin-top: 20px"
      :scroll="{ maxHeight: maxHeight }"
      :default-expand-all-rows="true"
      :pagination="false"
    >
      <template #deptName="{ record }">
        <span>{{ record.deptName }}</span>
      </template>
      <template #month1="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked1 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked1" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month2="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked2 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked2" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month3="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked3 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked3" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month4="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked4 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked4" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month5="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked5 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked5" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month6="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked6 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked6" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month7="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked7 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked7" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month8="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked8 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked8" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month9="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked9 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked9" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month10="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked10 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked10" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month11="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked11 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked11" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #month12="{ record }">
        <span v-if="record.leafNode === 1">
          <icon-check v-if="record.checked12 && !isEdit" class="checkCss" />
          <a-checkbox v-if="isEdit" v-model="record.checked12" @change="changeChecked($event, record)"></a-checkbox>
        </span>
      </template>
      <template #empty>
        <a-empty />
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { reactive, ref, onBeforeMount, onMounted, nextTick } from "vue";
import { dataAddChecked, getCurrentDate } from "../../utils/util";
import { querytDeptConfigData, updateConfig } from "../../api/departmentEffect";
import { Message, Modal } from "@arco-design/web-vue";
import { getCurrentInstance } from "@vue/runtime-core";
let { year } = getCurrentDate();
import moment from "moment";
let currentDate = `${year}`;
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
onBeforeMount(() => {
  $bus.emit("updateStructure", [{ type: "text", color: "#333", msg: "部门有效性列表" }]);
});
const maxHeight = ref(0);
const tableRef = ref(null);
onMounted(() => {
  if (tableRef.value) {
    let head = tableRef.value.$el;
    nextTick(() => {
      let innerHeight = window.innerHeight;
      let elHeight = head.getBoundingClientRect().top;
      maxHeight.value = innerHeight - elHeight - 30 + "px";
    });
  }
});
const isEdit = ref(false);
const yearNow = ref(currentDate);
const arr = ref([]);
const paramsArr = ref([]);
const tableKey = ref([]);
const dataContent = reactive({
  columns: [
    {
      title: "部门",
      dataIndex: "deptName",
      slotName: "deptName",
      width: 280,
    },
    {
      title: "一月",
      dataIndex: "month1",
      slotName: "month1",
    },
    {
      title: "二月",
      dataIndex: "month2",
      slotName: "month2",
    },
    {
      title: "三月",
      dataIndex: "month3",
      slotName: "month3",
    },
    {
      title: "四月",
      dataIndex: "month4",
      slotName: "month4",
    },
    {
      title: "五月",
      dataIndex: "month5",
      slotName: "month5",
    },
    {
      title: "六月",
      dataIndex: "month6",
      slotName: "month6",
    },
    {
      title: "七月",
      dataIndex: "month7",
      slotName: "month7",
    },
    {
      title: "八月",
      dataIndex: "month8",
      slotName: "month8",
    },
    {
      title: "九月",
      dataIndex: "month9",
      slotName: "month9",
    },
    {
      title: "十月",
      dataIndex: "month10",
      slotName: "month10",
    },
    {
      title: "十一月",
      dataIndex: "month11",
      slotName: "month11",
    },
    {
      title: "十二月",
      dataIndex: "month12",
      slotName: "month12",
    },
  ],
  data: [],
  loading: false,
  // defaultExpandedKeys: [],
});
const getDisabledTime = current => {
  return current.valueOf() < moment("2023-01-01 00:00:00").valueOf();
};
const getData = () => {
  let params = {
    year: yearNow.value,
  };
  dataContent.loading = true;
  querytDeptConfigData(params)
    .then(res => {
      if (res.code === "200") {
        let data = dataAddChecked(res.data, "key", "id");
        dataContent.data = data;
        tableKey.value += 1;
      } else {
        Message.error(res.desc || "请求数据失败");
      }
    })
    .catch(err => {
      Message.error(err || "请求数据失败");
    })
    .finally(() => {
      dataContent.loading = false;
    });
};
getData();
// 行样式
const rowClass = record => {
  if (record.raw.leafNode === 0) {
    return "row-gray";
  }
};
// 更改月份
const yearPickChange = value => {
  yearNow.value = value;
  getData();
};
// 编辑版本
const handleEdit = () => {
  isEdit.value = true;
  paramsArr.value = [];
};
// 更改
const changeChecked = (e, record) => {
  arr.value.push(record);
  paramsArr.value = arr.value.filter((item, index, self) => self.indexOf(item) === index);
};
// 退出编辑
const handleLogoutEdit = () => {
  Modal.warning({
    title: "切换/退出页面会导致输入内容丢失,确定继续吗?",
    modalClass: "warningModal",
    hideCancel: false,
    onOk() {
      isEdit.value = false;
    },
  });
};
// 保存变更
const handleSave = () => {
  let arr = [];
  paramsArr.value.forEach(item => {
    const paramsItem = {
      id: item.id,
      month1: item.checked1 ? 1 : 0,
      month2: item.checked2 ? 1 : 0,
      month3: item.checked3 ? 1 : 0,
      month4: item.checked4 ? 1 : 0,
      month5: item.checked5 ? 1 : 0,
      month6: item.checked6 ? 1 : 0,
      month7: item.checked7 ? 1 : 0,
      month8: item.checked8 ? 1 : 0,
      month9: item.checked9 ? 1 : 0,
      month10: item.checked10 ? 1 : 0,
      month11: item.checked11 ? 1 : 0,
      month12: item.checked12 ? 1 : 0,
    };
    arr.push(paramsItem);
  });
  updateConfig(arr).then(res => {
    if (res.code === "200") {
      Message.success("修改成功");
      getData();
      isEdit.value = false;
    } else {
      Message.error(res.desc);
    }
  });
};
</script>
<style lang="scss" scoped>
.checkCss {
  color: forestgreen;
  font-size: 22px;
}
</style>
