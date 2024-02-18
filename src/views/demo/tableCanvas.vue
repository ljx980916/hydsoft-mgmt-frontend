<template>
  <div class="defaultPadding">
    <a-space>
      <span>x轴(长/px)：</span>
      <a-input-number v-model="width" placeholder="请输入画布长" :min="1" class="w-200" />
      <span>Y轴(高/px)：</span>
      <a-input-number v-model="height" placeholder="请输入画布高" :min="1" class="w-200" />
      <a-button class="m-l-16" type="primary" @click="handleDraw">
        <template #icon>
          <icon-edit />
        </template>
        <template #default>开始绘制</template>
      </a-button>
    </a-space>

    <a-table
      class="m-t-20"
      :columns="tableInfo.columns"
      :data="tableInfo.data"
      :loading="tableInfo.loading"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import canvasVue from "../../components/canvasContainer.vue";
import { getLineChart } from "@/api/tableCanvas.js";
const height = ref(20);
const width = ref(50);
// 表格数据
const tableInfo = reactive({
  columns: [
    {
      title: "key",
      dataIndex: "key",
    },
    {
      title: "canvasLine1",
      dataIndex: "canvasLine1",
      render: ({ record }) => {
        return <canvasVue route={record.canvasLine1} height={height.value} width={width.value} />;
      },
    },
    {
      title: "canvasLine2",
      dataIndex: "canvasLine2",
      render: ({ record }) => {
        return <canvasVue route={record.canvasLine2} height={height.value} width={width.value} />;
      },
    },
    {
      title: "canvasLine3",
      dataIndex: "canvasLine3",
      render: ({ record }) => {
        return <canvasVue route={record.canvasLine3} height={height.value} width={width.value} />;
      },
    },
  ],
  data: [],
  loading: false,
});
// 获取数据
const getList = params => {
  tableInfo.loading = true;
  const formData = new FormData();
  formData.append("xAxis", params.x);
  formData.append("yAxis", params.y);
  getLineChart(formData)
    .then(res => {
      if (res.code === "200") {
        res.data.forEach((item, index) => {
          item.key = index;
        });
        tableInfo.data = res.data;
      }
    })
    .finally(() => {
      tableInfo.loading = false;
    });
};
getList({ x: width.value, y: height.value });
// 开始绘制
const handleDraw = () => {
  getList({ x: width.value, y: height.value });
};
</script>
<style scoped>
canvas {
  position: relative;
  top: 0px;
  right: 0px;
}
</style>
