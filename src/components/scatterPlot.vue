<template>
  <div>
    <div id="conversion"></div>
  </div>
</template>
<script setup>
import { onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps({
  seriesData: Array,
  color: Array,
});
watch(
  () => [props.seriesData, props.color],
  ([preSeries, preColor]) => {
    getCharts(preSeries, preColor);
  },
);
var myChart;
const getCharts = (seriesData, color) => {
  if (myChart != null && myChart != "" && myChart != undefined) {
    myChart.dispose();
  }
  var chartDom = document.getElementById("conversion");
  myChart = echarts.init(chartDom);
  var option;
  option = {
    // 颜色
    color: color,
    // 标签
    legend: {
      itemHeight: 15, //改变圆圈大小
      top: "center",
      right: "right",
      //文字显示的颜色和字体大小
      textStyle: {
        color: "black",
        fontSize: 12,
      },
    },
    // 图形整体宽高
    grid: {
      left: "10%",
      right: "15%",
      top: "18%",
    },
    // 提示
    tooltip: {
      //十字线
      axisPointer: {
        type: "cross",
      },
      padding: 10,
      borderColor: "rgb(233, 234, 235)",
      //设置tooltip的显示内容
      formatter: function (obj) {
        var value = obj.value;
        var str = `<div style="border-bottom: 1px solid rgba(255,255,255,.3);">
          <span>${value[2]}</span>
          </div>`;
        return str;
      },
    },
    // x轴
    xAxis: {
      type: "value",
      name: "销售收入/元",
      nameGap: 16,
      splitLine: {
        show: false,
      },
    },
    // y轴
    yAxis: {
      type: "value",
      name: "销售毛利/元",
      nameLocation: "end",
      nameGap: 20,
      splitLine: {
        show: false,
      },
    },
    // 展示数据
    series: seriesData,
  };
  option && myChart.setOption(option);
};
onMounted(() => {
  getCharts(props.seriesData, props.color);
});
</script>
<style scoped>
#conversion {
  max-width: 90%;
  height: 680px;
  top: -50px;
}
</style>
