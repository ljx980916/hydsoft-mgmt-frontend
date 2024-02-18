<template>
  <div>
    <div>
      <div class="m-b-10">
        <div class="m-b-10">
          月份：
          <a-month-picker :model-value="props.dateNow" style="width: 120px" @change="monthPickerChange" />
        </div>
        <div class="tabs-grid">
          <div class="m-t-10 m-b-10">
            <a-radio-group type="button" size="large" :model-value="props.chekedValue" @change="radioChange">
              <a-radio v-for="item of props.tabs" :value="item.key">{{ item.name }}</a-radio>
            </a-radio-group>
          </div>
          <div class="btns-grid">
            <a-button type="primary">
              <template #icon>
                <icon-download />
              </template>
              <template #default>导出全部</template>
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <a-table
        :columns="(props.tableColumns.length && props.tableColumns) || tableInfo.tableColumns"
        :data="(props.tableData.length && props.tableData) || tableInfo.tableData"
        column-resizable
        :bordered="{ wrapper: true, cell: true }"
        :scroll="{ x: '100%', y: '450px' }"
        :scrollbar="false"
        :pagination="{
          total: paginationTotal,
          current: paginationCurrent,
          pageSize: paginationPageSize,
          showTotal: true,
          showPageSize: true,
          showJumper: true,
          onChange: paginationChange,
          onPageSizeChange: paginationPageSizeChange,
        }"
      ></a-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  dateNow: {
    type: [Date, String, Number],
    default: new Date(),
  },
  chekedValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  tabs: {
    type: Array,
    default: () => [],
  },
  tableColumns: {
    type: Array,
    default: () => [],
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  exportExcel: {
    type: String,
    default: "",
  },
  paginationTotal: {
    type: Number,
    default: 10,
  },
  paginationCurrent: {
    type: Number,
    default: 1,
  },
  paginationPageSize: {
    type: Number,
    default: 10,
  },
});
const tableInfo = reactive({
  tableColumns: [
    {
      title: "自定义列1",
      dataIndex: "customColumn1",
      width: 200,
    },
    {
      title: "自定义列2",
      dataIndex: "customColumn2",
      width: 200,
    },
    {
      title: "自定义列3",
      dataIndex: "customColumn3",
      width: 200,
    },
    {
      title: "自定义列4",
      dataIndex: "customColumn4",
      width: 200,
    },
    {
      title: "自定义列5",
      dataIndex: "customColumn5",
      width: 200,
    },
    {
      title: "自定义列6",
      dataIndex: "customColumn6",
      width: 200,
    },
  ],
  tableData: [],
});
const emit = defineEmits(["monthPickChange", "radioChange", "paginationCurrentChange", "paginationPagesizeChange"]);

const paginationChange = current => {
  emit("paginationCurrentChange", current);
};
const paginationPageSizeChange = pageSize => {
  emit("paginationPagesizeChange", pageSize);
};
const monthPickerChange = (value, date, dateString) => {
  emit("monthPickChange", value, date, dateString);
};

const radioChange = val => {
  emit("radioChange", val);
};
</script>

<style lang="scss" scoped>
.tabs-grid {
  display: grid;
  grid-template-columns: 22fr 3fr;
  justify-content: space-between;
  gap: 20px;
}
.btns-grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.m-b-20 {
  margin-bottom: 20px;
}
</style>
