<template>
  <div class="defaultPadding">
    <div id="zhezhu-container"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
onMounted(() => {
  var chartDom = document.getElementById("zhezhu-container");
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLabel: {
        clickable: true,
      },
      silent: false,
      triggerEvent: true,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        clickable: true,
      },
      silent: false,
      triggerEvent: true,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  };
  option && myChart.setOption(option);
  myChart.off("click");
  myChart.on("click", function (params) {
    if (params.componentType == "xAxis") {
      alert("点击了X轴标签：" + params.value);
    }
    if (params.componentType == "yAxis") {
      alert("点击了Y轴标签：" + params.value);
    }
  });
});
</script>

<style lang="scss">
#zhezhu-container {
  height: 700px;
}
</style>
