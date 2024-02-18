<template>
  <a-space>
    <a-month-picker v-model="dateNow" @change="changeMonth" style="width: 140px" />
  </a-space>
  <a-space class="tagTip">
    <div v-for="item in tipList" :key="item.name" class="flex-center m-l-40">
      <span
        :style="{
          borderRadius: '50%',
          width: '14px',
          height: '14px',
          borderColor: item.borderColor,
          borderStyle: 'solid',
          borderWidth: '1px',
          backgroundColor: item.bgColor,
        }"
      ></span>
      <span class="m-l-8">
        {{ item.name }}
      </span>
    </div>
  </a-space>
  <div class="date">
    <ul>
      <li class="week" v-for="item in weeks" :key="item">
        {{ item }}
      </li>
      <li
        class="day"
        v-for="item in dates"
        :key="item.dateNowVal"
        :class="{
          isPrep: item.isPrep,
          isNext: item.isNext,
          isSelected: item.dateNowVal == selectedDate,
          isDisabled: item.caleType == 5 || item.caleType == 6 || item.isPrep || item.isNext,
        }"
      >
      <!-- <span >{{ item.dateNowVal }}--{{selectedDate}}</span> -->
        <span class="days">{{ item.dayVal }}</span>
        <div v-for="jtem in item.eventList" :key="jtem.dept" class="m-t-8 m-l-4">
          <span
            :style="{
              width: '120px',
              height: '25px',
              backgroundColor: jtem.bgColor,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: jtem.borderColor,
              color: jtem.color,
              fontSize: '14px',
              lineHeight: '25px',
              display: 'inline-block',
              textAlign: 'center',
            }"
          >
            {{ jtem.eventDescription }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getCurrentTime } from "@/utils/util.js";
import { workingCalendar } from "@/api/login.js";
let { year, month, day } = getCurrentTime();
let currentDate = `${year}-${month}`;
let selectedVal = `${year}/${month}/${day}`;
const dateNow = ref(currentDate);
const weeks = ref(["周日", "周一", "周二", "周三", "周四", "周五", "周六"]);
const dates = ref([]);
const selectedDate = ref("");
const yearNow = ref(year);
const monthNow = ref(month);
const calenderEvents = ref([]);
const tipList = ref([
  {
    borderColor: "#C3E7FE",
    bgColor: "#E8F3FF", // 蓝
    name: "FIN",
  },
  {
    borderColor: "#FDCDC5",
    bgColor: "#FFECE8", // 红
    name: "BMD",
  },
  {
    borderColor: "#FFE4BA",
    bgColor: "#FFF7E8", // 橘
    name: "HR",
  },
]);
// 更改month
const changeMonth = value => {
  yearNow.value = value.slice(0, 4);
  monthNow.value = value.slice(5);
  dates.value = [];
  getList();
  initCalendar();
};
// 初始化日历
const initCalendar = () => {
  if (Number(selectedVal.split("/")[2]) < 10) {
    selectedDate.value = `${selectedVal.split("/")[0]}/${selectedVal.split("/")[1]}/0${selectedVal.split("/")[2]}`;
  } else {
    selectedDate.value = `${selectedVal.split("/")[0]}/${selectedVal.split("/")[1]}/${selectedVal.split("/")[2]}`;
  }
  // ⚠️注意：new Date中的month要减1才是真正的本月月数，即本月：month - 1，下个月：month
  // ⚠️注意：下个月的第0天即为本月的最后一天
  // 上个月总天数（本月第0天日期）
  const prepMonthDays = new Date(yearNow.value, monthNow.value - 1, 0).getDate();
  // 上个月最后一天星期几（本月第0天星期数）
  const prepMonthEndDayWeek = new Date(yearNow.value, monthNow.value - 1, 0).getDay();
  // 当前月总天数（下个月第0天日期）
  const thisMonthDays = new Date(yearNow.value, monthNow.value, 0).getDate();
  // 当前月第一天是星期几
  const firstDayWeek = new Date(yearNow.value, monthNow.value - 1, 1).getDay();
  // 当前月最后一天是星期几（下个月第0天星期数）
  const thisEndDayWeek = new Date(yearNow.value, monthNow.value, 0).getDay();
  // 需要计算的总天数
  var totalDays = firstDayWeek + thisMonthDays;
  if (thisEndDayWeek < 6) {
    // 星期天开始且本月最后一天是星期天之前，需补满最后一行
    totalDays += 6 - thisEndDayWeek;
  }
  var index = 0;
  for (index; index < totalDays; index++) {
    // 上个月月底
    if (index < firstDayWeek) {
      // 上个月天数 - 上个月最后一天星期数 + 下标 (如：31 - 5 + 0)
      const day = prepMonthDays - prepMonthEndDayWeek + index;
      const date = new Date(yearNow.value, monthNow.value - 2, day).toLocaleDateString();
      if (Number(date.split("/")[2]) < 10) {
        var dateNowVal = `${date.split("/")[0]}/${date.split("/")[1]}/0${date.split("/")[2]}`;
      } else {
        var dateNowVal = `${date.split("/")[0]}/${date.split("/")[1]}/${date.split("/")[2]}`;
      }
      if (day < 10) {
        var dayVal = 0 + `${day}`;
      } else {
        var dayVal = day;
      }
      dates.value.push({ isPrep: true, dayVal, dateNowVal });
    } else if (index >= firstDayWeek + thisMonthDays) {
      // 下个月月初
      // 下标 - 当前月总天数 - 当前月第一天星期数 + 1 (如：30 - 31 + 1 + 1)
      const day = index - thisMonthDays - firstDayWeek + 1;
      const date = new Date(yearNow.value, monthNow.value, day).toLocaleDateString();
      if (Number(date.split("/")[2]) < 10) {
        var dateNowVal = `${date.split("/")[0]}/${date.split("/")[1]}/0${date.split("/")[2]}`;
      } else {
        var dateNowVal = `${date.split("/")[0]}/${date.split("/")[1]}/${date.split("/")[2]}`;
      }
      if (day < 10) {
        var dayVal = 0 + `${day}`;
      } else {
        var dayVal = day;
      }
      dates.value.push({ isNext: true, dayVal, dateNowVal });
    } else {
      // 本月
      // 下标 - 当前月第一天星期数 + 1 (如：5 - 5 + 1)
      const day = index - firstDayWeek + 1;
      const date = new Date(yearNow.value, monthNow.value - 1, day).toLocaleDateString();
      if (Number(date.split("/")[2]) < 10) {
        var dateNowVal = `${date.split("/")[0]}/${date.split("/")[1]}/0${date.split("/")[2]}`;
      } else {
        var dateNowVal = `${date.split("/")[0]}/${date.split("/")[1]}/${date.split("/")[2]}`;
      }
      if (day < 10) {
        var dayVal = 0 + `${day}`;
      } else {
        var dayVal = day;
      }
      dates.value.push({ dayVal, dateNowVal });
    }
  }
};
initCalendar();
// 获取日历事件
const getList = () => {
  workingCalendar({ month: dateNow.value }).then(res => {
    if (res.code == "200") {
      calenderEvents.value = res.data;
      calenderEvents.value.forEach(item => {
        if (item.caleDate.split("-")[1][0] == 0) {
          let date = `${item.caleDate.split("-")[0]}/${item.caleDate.split("-")[1][1]}/${item.caleDate.split("-")[2]}`;
          item.caleDate = date;
        } else {
          let date = `${item.caleDate.split("-")[0]}/${item.caleDate.split("-")[1]}/${item.caleDate.split("-")[2]}`;
          item.caleDate = date;
        }
        dates.value.forEach(ele => {
          if (item.caleDate === ele.dateNowVal) {
            ele.eventList = item.item;
            ele.caleType = item.caleType;
            ele.eventList.forEach(jtem => {
              if (jtem.dept === "FG4-HR") {
                jtem.borderColor = "#FFE4BA"; // 橘
                jtem.bgColor = "#FFF7E8";
                jtem.color = "#FF7D00";
              }
              if (jtem.dept === "FG4-BMD") {
                jtem.bgColor = "#FFECE8"; // 红
                jtem.borderColor = "#FDCDC5";
                jtem.color = "#F53F3F";
              }
              if (jtem.dept === "FG4-FIN") {
                jtem.bgColor = "#E8F3FF"; // 蓝
                jtem.borderColor = "#C3E7FE";
                jtem.color = "#4080FF";
              }
            });
          }
        });
      });
    }
  });
};
getList();
</script>

<style lang="scss" scoped>
.tagTip {
  margin-left: 17%;
}
.date {
  overflow: hidden;
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding-left: 0px;
    width: 1080px;
    li {
      width: 140px;
      border-width: 1px 1px 0 0;
      border-color: #e0e6f1;
      border-style: solid;
      padding-left: 8px;
      &.week {
        height: 32px;
        z-index: 999;
        font-size: 14px;
        color: #86909c;
        font-family: "PingFangSC-Regular", "PingFang SC";
        background-color: #f4f5ff;
        display: flex;
        align-items: center;
      }
      &.day {
        height: 110px;
        cursor: pointer;
        font-size: 16px;
        color: #86909c;
        // 上个月、下个月
        &.isNext,
        &.isPrep {
          cursor: default;
          color: #a9aeb8;
        }
        .days {
          display: inline-block;
          text-align: center;
          line-height: 28px;
          width: 28px;
          height: 28px;
          margin-top: 8px;
          font-size: 16px;
        }
        // 选中、hover
        // &:hover,
        &.isSelected {
          .days {
            background: #5370ff;
            border-radius: 50%;
            color: #fff;
          }
        }
        &.isDisabled {
          background-color: #f7f8fa;
          color: #a9aeb8;
        }
      }
    }
    li:first-child,
    :nth-child(7n + 1) {
      border-left-width: 1px;
    }
    li:nth-last-child(7),
    :nth-last-child(6),
    :nth-last-child(5),
    :nth-last-child(4),
    :nth-last-child(3),
    :nth-last-child(2),
    :nth-last-child(1) {
      border-bottom-width: 1px;
    }
  }
}
</style>
