<template>
  <div class="defaultPadding">
    <div id="columnChart"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const xData = ref(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Y"]);
const res = ref({
  blue: [100, 200, 300, 30, 90, 40, 320, 270, 50, 370, 278, 1000],
  green: [10, 30, 40, 90, 78, 270, 340, 37, 98, 270, 45, 340],
  purple: 500,
  yellowLine: [30, 50, 90, 10, 80, 60, 70, 39, 79, 50, 20, 38],
  orangeLine: [10, 80, 60, 70, 39, 79, 50, 20, 38, 90, 49, 90],
});
// 处理横坐标轴
const constructxAxis = data => {
  const transformedData = data.map((month, index) => ({
    data: Array.from({ length: data.length }, (_, i) => (i === index ? month : "")),
  }));
  return transformedData;
};
// 处理柱形数据
const constructData = data => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const obj = {};
    obj.data = Array(i).fill("").concat(data[i]);
    result.push(obj);
  }
  return result;
};
onMounted(() => {
  var chartDom = document.getElementById("columnChart");
  var myChart = echarts.init(chartDom);
  let xAxisData = constructxAxis(xData.value);
  xAxisData.forEach(item => {
    item.type = "category";
    item.position = "bottom";
  });
  // 蓝色数据 销售毛利（累计预）
  let blueData = constructData(res.value.blue);
  blueData.forEach((item, index) => {
    item.name = "销售毛利（累计预）";
    item.type = "bar";
    item.barGap = "5%";
    item.xAxisIndex = index;
    item.barWidth = 30;
  });
  // 绿色数据 销售毛利（累计实）
  let greenData = constructData(res.value.green);
  greenData.forEach((item, index) => {
    item.name = "销售毛利（累计实）";
    item.type = "bar";
    item.barGap = "5%";
    item.xAxisIndex = index;
    item.barWidth = 30;
  });
  //年度毛利（年度目标）
  let purpleData = {
    name: "年度毛利（年度目标）",
    type: "bar",
    xAxisIndex: 12,
    barWidth: 30,
    itemStyle: {
      color: "purple",
    },
    data: ["", "", "", "", "", "", "", "", "", "", "", "", res.value.purple],
  };
  //销售毛利率（年度预算）
  const orangeLineData = {
    name: "销售毛利率（年度预算）",
    type: "line",
    yAxisIndex: 1,
    itemStyle: {
      color: "orange",
    },
    data: res.value.orangeLine,
  };
  //销售毛利率（实际累计）
  const yellowLineData = {
    name: "销售毛利率（实际累计）",
    type: "line",
    yAxisIndex: 1,
    itemStyle: {
      color: "yellow",
    },
    data: res.value.yellowLine,
  };
  // 所有数据
  let seriesData = [];
  blueData.forEach(item => {
    seriesData.push(item);
  });
  greenData.forEach(item => {
    seriesData.push(item);
  });
  seriesData.push(purpleData);
  seriesData.push(orangeLineData);
  seriesData.push(yellowLineData);
  var option;
  option = {
    // 整体图形样式
    // grid: {
    //   show: true,
    //   left: "15%",
    //   top: "25%",
    //   right: "15%",
    //   // bottom: "5%",
    //   backgroundColor: "rgba(224, 17, 17, 1)",
    //   borderColor: "rgba(96, 67, 67, 1)",
    // },
    legend: {
      data: [
        "销售毛利（累计预）",
        "销售毛利（累计实）",
        "销售毛利率（年度预算）",
        "销售毛利率（实际累计）",
        "年度毛利（年度目标）",
      ],
      x: "center", //可设定图例在左、右、居中
      y: "bottom", //可设定图例在上、下、居中
    },
    // 提示
    tooltip: {
      trigger: "axis",
      formatter(params) {
        if (params.length > 4) {
          let arr = params.slice(0, 4);
          let str = `<div style="margin: 0 8px">
                  <span> ${arr[2].axisValue}</span>:
                </div>`;
          arr.forEach(item => {
            str += `<div style="margin: 0 8px">
                  <span
                    style="display: inline-block; width: 10px; height: 10px; background-color: ${item.color}; border-radius: 50%; margin-right: 8px"
                  ></span>
                  <span> ${item.seriesName}</span>:
                  <span>${item.value}</span>
                </div>`;
          });
          return str;
        } else {
          return `<div style="margin: 0 8px">
                    <span> ${params[0].axisValue}</span>:
                  </div>
                  <div style="margin: 0 8px">
                  <span
                    style="display: inline-block; width: 10px; height: 10px; background-color: ${params[0].color}; border-radius: 50%; margin-right: 8px"
                  ></span>
                  <span> ${params[0].seriesName}</span>: <span>${params[0].value}</span>
                  </div>`;
        }
      },
    },
    // X坐标系
    xAxis: xAxisData,
    // Y坐标系
    yAxis: [
      {
        type: "value",
        name: "毛利",
        splitLine: {
          //网格线
          show: false,
        },
        axisLine: {
          show: true,
        }, // 坐标轴
      },
      {
        type: "value",
        name: "毛利率",
        min: 0,
        max: 100,
        axisLabel: {
          formatter: "{value} %",
        },
        interval: 10,
        splitLine: {
          //网格线
          show: false,
        },
        axisLine: {
          show: true,
        }, // 坐标轴
      },
    ],
    // 柱形和折线数据
    series: seriesData,
  };
  option && myChart.setOption(option);
});
</script>

<style lang="scss">
#columnChart {
  height: 700px;
}
</style>
