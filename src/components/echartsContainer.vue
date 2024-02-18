<template>
  <div ref="echartContainer" :style="{ width: width + 'px', height: height + 'px', margin : '4px 0 -6px 0' }"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const props = defineProps({
  // 折线路径数据
  route: {
    type: Array,
    default: () => [],
  },
  height: {
    type: Number,
    default: 20,
  },
  width: {
    type: Number,
    default: 50,
  },
});
const echartContainer = ref(null);
onMounted(() => {
  var chartDom = echartContainer.value;
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    tooltip: {
      trigger: 'item',
      position : 'top',
      formatter: params=>{
        return params.data?.name?.replaceAll('-','<br/>')
      },
      appendToBody: true
    },
    series: [
      {
        type: "line",
        symbol: "emptyCircle",
        symbolSize: 3,
        itemStyle: {
          color: "#0770FF",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(58,77,233,0.8)",
            },
            {
              offset: 1,
              color: "rgba(58,77,233,0.3)",
            },
          ]),
        },
        data: props.route,
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<style lang="scss" scoped>

</style>