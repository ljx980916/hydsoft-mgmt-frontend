<template>
  <div style="position: relative; overflow: hidden" class="defaultPadding">
    <p class="tip"><span>提示：点击饼状图切换事业群</span></p>
    <div id="pie"></div>
    <!-- 弹框 -->
    <div class="modal">
      <p class="title">在职人数统计：{{ form.title }}</p>
      <p class="subtitle">{{ currentDate }}</p>
      <ul>
        <div>
          <li>
            <span>C1人数</span>
            <span>{{ getSplitNum(form.c1People) }}</span>
          </li>
          <li>
            <span class="m-r-8">G人数</span>
            <span>{{ form.Gpeople }}</span>
          </li>
          <li>
            <span>C2人数</span>
            <span>{{ form.c2People }}</span>
          </li>
          <li>
            <span class="m-r-12">S人数</span>
            <span>{{ form.sPeople }}</span>
          </li>
          <li>
            <span class="m-r-10">R人数</span>
            <span>{{ form.rPeople }}</span>
          </li>
        </div>
        <div class="m-l-40">
          <li>
            <span>正式人数</span>
            <span>{{ getSplitNum(form.formalPeople) }}</span>
          </li>
          <li>
            <span>兼职人数</span>
            <span>{{ form.partTimePeople }}</span>
          </li>
          <li>
            <span>实习人数</span>
            <span>{{ form.practicePeople }}</span>
          </li>
        </div>
      </ul>
      <a-button class="button" type="primary" @click="handleDetail">明细</a-button>
    </div>
    <div class="time">
      <a-radio-group type="button" size="large" v-model="time" @change="changeTime">
        <a-radio v-for="item of timeList" :value="item.label">{{ item.value }}</a-radio>
      </a-radio-group>
    </div>
    <div id="post" @click="handleIsPost"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, onUnmounted, watchEffect } from "vue";
import * as echarts from "echarts";
import { getSplitNum, getCurrentTime } from "@/utils/util.js";
import { useRouter, useRoute } from "vue-router";
import { getPieChartData, getCauseGroup, getPostChartData } from "@/api/staffStatics.js";
import { getCurrentInstance } from "@vue/runtime-core";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
import moment from "moment";
const router = useRouter();
const route = useRoute();
const form = reactive({
  title: "各BG汇总",
  c1People: 1477,
  Gpeople: 60,
  c2People: 100,
  sPeople: 4,
  rPeople: 200,
  formalPeople: 1477,
  partTimePeople: 60,
  practicePeople: 100,
});
let { year, month, days } = getCurrentTime();
let currentDate = `${year}/${month}/${days}`;
const isPie = ref(false);
const isPost = ref(false);
var pieData = [];
var pieDatas = [];
var entryList = [];
var departList = [];
var formalList = [];
var xAxisList = [];
var pieColor = ["#8E83BD", "#F0886F", "#6D99C8", "#C59E63", "#4D8192", "#7DAE99"];
var subText = 0;
var myPieChart;
var myPostChart;
const time = ref("1");
const dataIndex = ref(-1);
const timeList = ref([
  {
    label: "1",
    value: "近12月",
  },
  {
    label: "2",
    value: "近26周",
  },
  {
    label: "3",
    value: "近30自然日",
  },
]);
// 视口宽度
watchEffect(() => {
  $bus.emit("updateStructure", [
    { type: "text", color: "#333", msg: `人员分析` },
    { type: "text", color: "#333", msg: `人员统计` },
  ]);
});

// 环状图-------------------------------------------------
const getPieData = () => {
  pieDatas = [];
  pieData = [];
  subText = 0;
  getPieChartData().then(res => {
    if (res.code === "000000000000") {
      res.data.forEach(item => {
        pieData.push({
          name: item.deptName,
          value: item.extendColumn2,
        });
        subText += item.extendColumn2;
      });
      pieDatas = pieData.map((item, index) => {
        return {
          name: item.name,
          value: item.value,
          label: { color: pieColor[index] },
        };
      });
      getPieCharts();
      const deptNames = ["BG1", "BG2", "BG3", "BG4"];
      deptNames.forEach((item, index) => {
        if (form.title === item) {
          myPieChart.dispatchAction({
            type: "highlight", //突出高亮显示;
            seriesIndex: 0,
            dataIndex: index,
          });
        }
      });
    }
  });
};
const getPieCharts = () => {
  if (myPieChart != null && myPieChart != "" && myPieChart != undefined) {
    myPieChart.dispose();
  }
  var chartDom = document.getElementById("pie");
  if (chartDom) {
    myPieChart = echarts.init(chartDom);
    var option = {
      tooltip: {
        trigger: "item",
        triggerOn: "none",
        formatter: "{b}",
        position: function (point, params, dom, rect, size) {
          if (params.name == "BG1") {
            return { left: rect.x, top: rect.y + 50 };
          }
          if (params.name == "BG3") {
            return { left: rect.x + 30, top: rect.y + 50 };
          }
          if (params.name == "BG4") {
            return { left: rect.x, top: rect.y };
          }
          if (params.name == "BG2") {
            return { left: rect.x + 60, top: rect.y + 50 };
          }
        },
      },
      //环形图中间文字
      title: {
        text: "总人数",
        subtext: getSplitNum(subText),
        textStyle: {
          fontSize: "14px",
          color: "#6B7785",
          fontWeight: 300,
          fontFamily: "PingFangSC-Thin",
        },
        subtextStyle: {
          fontSize: "18px",
          color: "#6B7785",
          fontWeight: 500,
          fontFamily: "PingFang SC",
        },
        textAlign: "center", //图例文字居中显示
        x: "48.3%", //距离左边的距离
        y: "38.5%", //距离上边的距离
      },
      animation: false,
      //数据的颜色设置
      color: ["#8E83BD", "#F0886F", "#6D99C8", "#C59E63", "#4D8192", "#7DAE99"],
      //图例设置
      legend: {
        bottom: -5,
        itemGap: 20, //数据上下的距离
        itemWidth: 20, // 设置宽度
        data: pieData,
      },
      series: [
        {
          radius: ["53%", "80%"], //第一个是中间圆的大小，第二个是外边圆的大小
          center: ["49%", "47%"], //左边的距离，上边的距离
          type: "pie",
          label: {
            position: "inner", //文字显示在内部，如果在外边把这个去掉就好
            color: "#fff", //文字的颜色
            fontSize: "14px",
            textAlign: "left",
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 6,
              shadowOffsetX: 0,
              shadowColor: "rgba(100, 114, 123, 0.5)",
            },
            label: {
              show: true,
              formatter: "{b}",
              fontSize: "18px",
              color: "#fff",
            },
            scale: true,
            scaleSize: 10,
          },
          data: pieData,
          startAngle: 45, //起始角度
          clockwise: false, //生长方向，是否顺时针
        },
        {
          radius: ["53%", "80%"], //第一个是中间圆的大小，第二个是外边圆的大小
          center: ["49%", "47%"], //左边的距离，上边的距离
          type: "pie",
          label: {
            formatter: function (data) {
              let c = getSplitNum(data.value);
              return c;
            },
            position: "outer", //文字显示在内部，如果在外边把这个去掉就好
            fontSize: "14px",
            textAlign: "left",
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(100, 114, 123, 0.5)",
            },
            label: {
              show: true,
            },
            scale: true,
            scaleSize: 10,
          },
          data: pieDatas,
          startAngle: 45, //起始角度
          clockwise: false, //生长方向，是否顺时针
        },
      ],
    };
    option && myPieChart.setOption(option);
    window.addEventListener("resize", handlePieResize);
    myPieChart.on("click", function (params) {
      dataIndex.value = params.dataIndex;
      isPie.value = true;
      form.title = params.name;
      for (var i = 0; i < pieDatas.length; i++) {
        if (i != params.dataIndex) {
          myPieChart.dispatchAction({
            type: "downplay", //取消突出高亮显示;
            seriesIndex: 0,
            dataIndex: i,
          });
        }
      }
      myPieChart.dispatchAction({
        type: "hideTip",
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      myPieChart.dispatchAction({
        type: "highlight", //突出高亮显示;
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
    });
    myPieChart.on("mouseover", function (params) {
      if (params.dataIndex == dataIndex.value || params.name == form.title) {
        myPieChart.dispatchAction({
          type: "hideTip",
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
      } else {
        myPieChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
      }
    });
    myPieChart.on("mouseout", function (params) {
      myPieChart.dispatchAction({
        type: "hideTip",
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
    });
  }
};
const handlePieResize = () => {
  myPieChart.resize();
};
const handleClickOutside = event => {
  if (event.target.tagName !== "SPAN" && !isPost.value && event.target.tagName !== "BUTTON") {
    if (isPie.value) {
      getCauseGroupData(form.title);
      isPie.value = false;
      getPostData(time.value);
    } else {
      form.title = "各BG汇总";
      getPieCharts();
      getCauseGroupData("各BG汇总");
      getPostData(time.value);
    }
  }
  if (isPost.value) {
    isPost.value = false;
  }
};
//获取事业群全部数据
const getCauseGroupData = deptName => {
  if (deptName !== "各BG汇总") {
    const formData = new FormData();
    formData.append("deptName", form.title);
    getCauseGroup(formData).then(res => {
      const { code, data } = res;
      if (code === "000000000000") {
        form.c1People = data.C1;
        form.Gpeople = data.G;
        form.c2People = data.C2;
        form.sPeople = data.S;
        form.rPeople = data.R;
        form.formalPeople = data.official;
        form.partTimePeople = data.pluralistic;
        form.practicePeople = data.practice;
      }
    });
  } else {
    getCauseGroup().then(res => {
      const { code, data } = res;
      if (code === "000000000000") {
        form.c1People = data.C1;
        form.Gpeople = data.G;
        form.c2People = data.C2;
        form.sPeople = data.S;
        form.rPeople = data.R;
        form.formalPeople = data.official;
        form.partTimePeople = data.pluralistic;
        form.practicePeople = data.practice;
        form.title = "各BG汇总";
      }
    });
  }
};
// 明细
const handleDetail = () => {
  router.push({
    path: "/staticDetail",
    state: {
      deptName: form.title === "各BG汇总" ? "全部" : form.title,
    },
  });
};
// 柱状图-----------------------------------------------------------
const handleIsPost = () => {
  isPost.value = true;
};
const getPostData = val => {
  const formData = new FormData();
  formData.append("histogram", val);
  if (form.title !== "各BG汇总") {
    formData.append("deptName", form.title);
  }
  getPostChartData(formData).then(res => {
    if (res.code == "000000000000") {
      departList = [];
      entryList = [];
      formalList = [];
      xAxisList = [];
      if (val == "1") {
        res.data.forEach(item => {
          if (item.extendColumn1.slice(0, 4) !== "2022") {
            const parts = item.extendColumn1.split("-");
            const year = parts[0];
            const month = parts[1];
            var months = `${year}.${month}`;
            xAxisList.push(months);
            formalList.push(item.extendColumn2);
            entryList.push(item.extendColumn3);
            departList.push(item.extendColumn4);
          }
        });
      } else {
        res.data.forEach(item => {
          formalList.push(item.extendColumn2);
          entryList.push(item.extendColumn3);
          departList.push(item.extendColumn4);
          const date = moment(item.extendColumn1);
          const formattedDate = date.format("M/D");
          xAxisList.push(formattedDate);
        });
      }
      getPostCharts();
    }
  });
};
const getPostCharts = () => {
  if (myPostChart != null && myPostChart != "" && myPostChart != undefined) {
    myPostChart.dispose();
  }
  var chartDoms = document.getElementById("post");
  if (chartDoms) {
    myPostChart = echarts.init(chartDoms);
    const colors = ["#69D1B0", "#F98981", "#3491FA"];
    var option = {
      color: colors,
      tooltip: {
        axisPointer: {
          type: "cross",
        },
        extraCssText: "text-align: left;",
        formatter: params => {
          if (params.seriesIndex == 0) return "时间：" + params.name + "</br>" + params.seriesName + "：" + params.value;
          if (params.seriesIndex == 1) return "时间：" + params.name + "</br>" + params.seriesName + "：" + params.value;
          if (params.seriesIndex == 2) return "时间：" + params.name + "</br>" + params.seriesName + "：" + params.value;
        },
      },
      grid: {
        right: "10%",
        left: "20%",
        top: "8%",
      },
      legend: {
        data: ["入职人数", "离职人数", "在职员工人数"],
        bottom: "2%",
        itemGap: 26, //数据上下的距离
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: "auto",
          },
          data: xAxisList,
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "柱状",
          position: "left",
          alignTicks: true,
          splitLine: false,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: "{value}",
          },
        },
        {
          type: "value",
          name: "折线",
          position: "left",
          alignTicks: true,
          splitLine: false,
          offset: 50,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2],
            },
          },
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          name: "入职人数",
          type: "bar",
          data: entryList,
        },
        {
          name: "离职人数",
          type: "bar",
          data: departList,
        },
        {
          name: "在职员工人数",
          type: "line",
          yAxisIndex: 1,
          data: formalList,
        },
      ],
    };
    option && myPostChart.setOption(option);
    window.addEventListener("resize", handlePostResize);
  }
};
const handlePostResize = () => {
  myPostChart.resize();
};
// 更改时间
const changeTime = val => {
  time.value = val;
  getPostData(val);
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  form.title = history.state.deptName ? (history.state.deptName == "全部" ? "各BG汇总" : history.state.deptName) : "各BG汇总";
  getCauseGroupData(form.title);
  getPieData();
  getPostData(time.value);
});
onUnmounted(() => {
  window.removeEventListener("resize", handlePieResize);
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", handlePostResize);
});
</script>

<style scoped lang="scss">
#pie {
  height: 300px;
  width: 52%;
}
.tip {
  font-weight: 400;
  font-style: normal;
  font-size: 10px;
  color: #a8b4cc;
  display: inline-block;
  width: 50%;
  text-align: center;
}
.modal {
  width: 560px;
  box-shadow: 0px 0px 5px rgb(209, 211, 224);
  position: absolute;
  left: 45%;
  top: 7%;
}
.title {
  margin: 26px 0 0 40px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.847058823529412);
  font-family: "PingFangSC-Medium", "PingFang SC Medium";
}
.subtitle {
  margin-left: 40px;
  font-weight: 400;
  font-family: "PingFangSC-Regular", "PingFang SC";
  font-style: normal;
  font-size: 12px;
  color: #a8b4cc;
}
ul {
  width: 450px;
  margin-left: 50px;
  list-style: none;
  display: flex;
  margin-top: 30px;
}
li {
  margin: 0 60px 10px 0;
  > span:first-child {
    font-weight: 400;
    font-size: 14px;
    color: #a8b4cc;
    line-height: 22px;
  }
  > span:nth-child(2) {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #778092;
    line-height: 22px;
    margin-left: 10px;
  }
}
.button {
  position: relative;
  left: 75%;
  top: -30px;
}
.time {
  position: absolute;
  left: 61%;
  top: 46%;
}
#post {
  max-width: 90%;
  height: 400px;
  margin-top: 80px;
}
</style>
