<template>
  <div class="defaultPadding">
    <a-row :gutter="[14, 20]" align="center">
      <a-col flex="230px">
        <a-space>
          <span>部门名称：</span>
          <a-select v-model="deptName" placeholder="请选择部门" style="width: 130px" @change="changeDeptName">
            <a-option v-for="(item, index) of deptList" :value="item" :key="index">{{ item }}</a-option>
          </a-select>
        </a-space>
      </a-col>
      <a-col flex="200px">
        <a-space>
          <span>日期：</span>
          <a-date-picker
            format="YYYY-MM-DD"
            :allow-clear="false"
            :disabledDate="getDisabledTime"
            v-bind:model-value="dateVal"
            @change="handleDatePicker"
            style="width: 130px"
          />
        </a-space>
      </a-col>
      <a-col flex="85px"></a-col>
      <a-col flex="auto"></a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          ref="level1tableRef"
          class="m-t-20"
          column-resizable
          :columns="dataContent.columns"
          :data="dataContent.dataSource"
          :loading="dataContent.loading"
          :expanded-keys="dataContent.defaultExpandedKeys"
          :scrollbar="false"
          :scroll="{ maxHeight: maxHeight }"
          @expanded-change="expandedChange"
          :pagination="false"
        >
          <template #deptName="{ record }">
            <a-popover
              :content-style="{ background: 'rgba(0,0,0,.8)', color: '#fff' }"
              :arrow-style="{ background: 'rgba(0,0,0,.8)' }"
            >
              <span class="pointer">{{ constructDeptName(record.deptName) }}</span>
              <template #content>
                {{ record.deptName }}
              </template>
            </a-popover>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { getDetailData } from "@/api/staffStatics.js";
import { onBeforeMount, onMounted, reactive, ref, nextTick, watchEffect, onUnmounted } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter, useRoute } from "vue-router";
import { staffDetailList } from "../constColumns";
import { dataAddKey, getSplitNum } from "@/utils/util.js";
import moment from "moment";
import { getCurrentInstance } from "@vue/runtime-core";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
const router = useRouter();
const route = useRoute();
const level1tableRef = ref(null);
const maxHeight = ref("");
const dateVal = ref(new Date());
const deptName = ref(history.state.deptName);
const deptList = ref(["全部", "BG1", "BG2", "BG3", "BG4"]);
const dataContent = reactive({
  loading: false,
  columns: staffDetailList,
  defaultExpandedKeys: [],
  dataSource: [],
});
watchEffect(() => {
  $bus.emit("updateStructure", [
    {
      type: "text",
      color: "#333",
      msg: `人员分析`,
    },
    {
      type: "button",
      color: "#5370FD",
      msg: `人员统计`,
      params: "level1",
    },
    {
      type: "text",
      color: "#333",
      msg: "人员明细",
    },
  ]);
});
$bus.on("goBack", val => {
  if (val == "level1") {
    let breadList1 = [
      { type: "text", color: "#333", msg: `人员分析` },
      { type: "text", color: "#333", msg: `人员统计` },
    ];
    $bus.emit("updateStructure", breadList1);
    router.push({
      path: "/staticPicture",
      state: {
        deptName: deptName.value,
      },
    });
  }
});
onUnmounted(() => {
  $bus.off("goBack");
});
const expandedChange = rowKeys => {
  dataContent.defaultExpandedKeys = rowKeys;
};
//禁选日期
const getDisabledTime = current => {
  return current.valueOf() < moment("2023-01-01 00:00:00").valueOf() || current.valueOf() > moment().valueOf();
};
// 处理部门名称
const constructDeptName = deptName => {
  const lastDashIndex = deptName.lastIndexOf("-");
  return deptName.substring(lastDashIndex + 1);
};
// 更改日期
const handleDatePicker = value => {
  dateVal.value = new Date(value);
  getData();
};
// 更改部门
const changeDeptName = val => {
  deptName.value = val;
  getData();
};
onMounted(() => {
  if (level1tableRef.value) {
    let head = level1tableRef.value.$el;
    nextTick(() => {
      let innerHeight = window.innerHeight;
      let elHeight = head.getBoundingClientRect().top;
      maxHeight.value = innerHeight - elHeight - 30 + "px";
    });
  }
});
onBeforeMount(() => {
  getData();
});
const getTableNum = arr => {
  Array.isArray(arr) &&
    arr.forEach(item => {
      item.c1 = getSplitNum(item.c1);
      item.c2 = getSplitNum(item.c2);
      item.g = getSplitNum(item.g);
      item.r = getSplitNum(item.r);
      item.s = getSplitNum(item.s);
      item.entry = getSplitNum(item.entry);
      item.official = getSplitNum(item.official);
      item.practice = getSplitNum(item.practice);
      item.total = getSplitNum(item.total);
      item.dimission = getSplitNum(item.dimission);
      item.pluralistic = getSplitNum(item.pluralistic);
      if (item.children) {
        getTableNum(item.children);
      }
    });
  return arr;
};
const getData = () => {
  var y = dateVal.value.getFullYear();
  var m = dateVal.value.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = dateVal.value.getDate();
  d = d < 10 ? "0" + d : d;
  const formData = new FormData();
  if (deptName.value !== "全部") {
    formData.append("deptName", deptName.value);
  }
  formData.append("time", `${y}-${m}-${d}`);
  dataContent.loading = true;
  getDetailData(formData)
    .then(res => {
      if (res.code === "000000000000") {
        if (res.data && res.data.length > 0) {
          let data = dataAddKey(res.data, "key", "deptName");
          dataContent.dataSource = getTableNum(data);
          let keys = [];
          res.data.forEach(item => keys.push(item.deptName));
          dataContent.defaultExpandedKeys = keys;
        }
      }
    })
    .catch(e => {
      Message.error(e.message || "请求失败");
    })
    .finally(() => {
      dataContent.loading = false;
    });
};
</script>

<style lang="scss" scoped></style>
