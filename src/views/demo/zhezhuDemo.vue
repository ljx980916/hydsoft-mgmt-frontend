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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      right: "15%",
      bottom: "10%",
    },
    // toolbox: {
    //     feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar'] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //     }
    // },
    legend: {
      data: ["Evaporation", "Precipitation", "新增柱", "新增柱2", "Temperature"],
    },
    xAxis: [
      {
        type: "category",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisPointer: {
          type: "shadow",
        },
      },
      // {
      //     type: 'category',
      //     position: 'bottom',
      //     offset: 25,
      //     axisPointer: {
      //         type: 'none'
      //     },
      //     axisLine:{
      //         show: true,
      //         lineStyle : {
      //             width : 1,
      //             type : 'solid',
      //             shadowColor : 'red',
      //             shadowOffsetY : 25
      //         },
      //     },
      //     data: ['Mon2', 'Tue2', 'Wed2', 'Thu2', 'Fri2', 'Sat2', 'Sun2']
      // },
    ],
    yAxis: [
      {
        type: "value",
        name: "温度",
        min: 0,
        max: 30,
        interval: 5,
        axisLabel: {
          formatter: "{value} °C",
        },
      },
      {
        type: "value",
        name: "Evaporation",
        min: 0,
        max: 180,
        axisTick: {
          inside: true,
        },
        axisLabel: {
          inside: true,
        },
        // interval: 50,
        axisLabel: {
          formatter: "{value} ml",
        },
      },

      {
        type: "value",
        name: "Precipitation",
        min: 0,
        max: 300,
        position: "right",
        alignTicks: true,
        offset: 80,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#73C0DE",
          },
        },
        axisLabel: {
          formatter: "{value} ml",
        },
      },
    ],
    series: [
      {
        name: "Evaporation",
        type: "bar",
        // xAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + " ml";
          },
        },
        itemStyle: {
          color: "green",
        },
        data: [2.0, 4.9, 7.0, 13.2, 12.6, 8.6, 15.6, 12.2, 4.6, 15.0, 6.4, 3.3],
      },
      {
        name: "Precipitation",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value + " ml";
          },
        },
        itemStyle: {
          color: "blue",
        },
        data: [12.0, 12.9, 17.0, 12.2, 15.6, 3.6, 5.6, 12.2, 9.6, 13.0, 6.4, 3.3],
      },
      {
        name: "新增柱",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value + " ml";
          },
        },
        itemStyle: {
          color: "green",
        },
        data: [3.0, 14.9, 7.0, 13.2, 5.6, 7.6, 15.6, 12.2, 7.6, 10.0, 6.4, 3.3],
      },
      {
        name: "新增柱2",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value + " ml";
          },
        },
        itemStyle: {
          color: "blue",
        },
        data: [3.0, 12.9, 10.0, 9.2, 7.6, 9.6, 15.6, 12.2, 12.6, 10.0, 6.4, 3.3],
      },
      {
        name: "Temperature",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + " °C";
          },
        },
        data: [112.0, 114.9, 122.0, 124.2, 120.6, 130.6, 129.6, 127.2, 123.6, 112.0, 19.4, 13.3],
      },
      // {
      //     name: '新增线',
      //     type: 'line',
      //     yAxisIndex: 1,
      //     tooltip: {
      //         valueFormatter: function (value) {
      //         return value + ' °C';
      //         }
      //     },
      //     data: [1.0, 1.2, 2.3, 3.5, 7.3, 6.2, 9.3, 19.4, 23.0, 14.5, 10.0, 4.2]
      // }
    ],
  };

  option && myChart.setOption(option);
});
</script>

<style lang="scss">
#zhezhu-container {
  height: 700px;
}
</style>
