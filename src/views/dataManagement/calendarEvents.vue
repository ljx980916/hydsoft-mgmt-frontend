<template>
  <div class="defaultPadding">
    <a-button type="primary" @click="handleAdd">新建设置事件</a-button>
    <a-table
      class="m-t-20"
      :columns="dataContent.columns"
      :data="dataContent.dataSource"
      :loading="dataContent.loading"
      :scroll="{ x: true }"
      :pagination="{
        total: dataContent.pagination.total,
        current: dataContent.pagination.pageNum,
        pageSize: dataContent.pagination.pageSize,
        showTotal: true,
        showPageSize: true,
        showJumper: true,
        onChange: paginationChange,
        onPageSizeChange: paginationPageSizeChange,
      }"
    >
      <template #period="{ record }">
        <span v-if="record.isWorkday === 0 && record.period > 0">每月第{{ record.period }}个工作日</span>
        <span v-if="record.isWorkday === 0 && record.period < 0">每月倒数第{{ record.period.slice(1) }}个工作日</span>
        <span v-if="record.isWorkday === 1 && record.period > 0">每月{{ record.period }}号</span>
        <span v-if="record.isWorkday === 1 && record.period < 0">每月倒数第{{ record.period.slice(1) }}天</span>
      </template>
      <template #action="{ record }">
        <a-button type="text" @click="handleUpdate(record)">编辑</a-button>
        <a-popconfirm content="确定要删除此行数据吗?" type="warning" @ok="handleDelete(record)">
          <a-button type="text" class="m-l-8">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal v-model:visible="eventVisible" :title="title" title-align="start">
      <a-form ref="formRef" :mask="true" :model="form" auto-label-width>
        <a-form-item field="period" label="周期规则" :rules="[{ required: true, message: '请选择周期规则' }]">
          <a-select v-if="form.isWorkday == '0'" v-model="form.period" :style="{ width: '180px' }" placeholder="请选择周期规则">
            <a-option v-for="(item, index) of workDayList" :value="item.label" :key="index">{{ item.value }}</a-option>
          </a-select>
          <a-select v-if="form.isWorkday == '1'" v-model="form.period" :style="{ width: '180px' }" placeholder="请选择周期规则">
            <a-option v-for="(item, index) of naturalDayList" :value="item.label" :key="index">{{ item.value }}</a-option>
          </a-select>
          <a-radio-group type="button" v-model="form.isWorkday" size="large">
            <a-radio value="0">工作日</a-radio>
            <a-radio value="1">自然日</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="visibleRole" label="可见角色" :rules="[{ required: true, message: '请选择可见角色' }]">
          <a-select v-model="form.visibleRole" :style="{ width: '180px' }" placeholder="请选择可见角色" multiple allow-clear>
            <a-option v-for="item of visibleRoleList" :value="item.code" :key="item.code">{{ item.name }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="relationDept" label="关联部门" :rules="[{ required: true, message: '请选择关联部门' }]">
          <a-cascader
            v-model="form.relationDept"
            :options="relationDeptList"
            :field-names="fieldNames"
            :style="{ width: '320px' }"
            placeholder="请选择关联部门"
            check-strictly
            allow-clear
          />
        </a-form-item>
        <a-form-item field="eventDescription" label="事件描述" :rules="[{ required: true, message: '请输入事件描述' }]">
          <a-input v-model="form.eventDescription" :max-length="8" placeholder="汉字不超过8个" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleModalOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { calendarColumns } from "./constColumns";
import {
  postCalendarEventList,
  postSelectRoleList,
  getSelectDeptList,
  postAddInsertEvent,
  postUpdateInsertEvent,
  deleteInsertEvent,
} from "@/api/calendarEvents.js";
import { workDayList, naturalDayList } from "@/utils/enum.js";
import { Message } from "@arco-design/web-vue";
// 表格配置信息
const dataContent = reactive({
  columns: calendarColumns,
  dataSource: [],
  loading: false,
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
});
// 新增/编辑API权限弹窗开关
const eventVisible = ref(false);
const form = reactive({
  isWorkday: "0",
});
const formRef = ref();
const title = ref("");
const visibleRoleList = ref([]);
const relationDeptList = ref([]);
const fieldNames = ref({ value: "deptName", label: "deptName" });
const id = ref("");
// 获取列表数据
const getList = () => {
  dataContent.loading = true;
  postCalendarEventList()
    .then(res => {
      if (res.code === "200") {
        res.data.forEach((item, index) => {
          item.key = item.id;
          item.NO = index + 1;
        });
        dataContent.dataSource = res.data;
        dataContent.pagination.total = res.data.length;
      } else {
        Message.error(res.desc || "请求数据失败");
      }
    })
    .catch(err => {
      Message.error(err || "请求数据失败");
    })
    .finally(() => {
      dataContent.loading = false;
    });
};
getList();
// 更改页码
const paginationChange = current => {
  dataContent.pagination.pageNum = current;
  getList();
};
// 更改页容量
const paginationPageSizeChange = pageSize => {
  dataContent.pagination.pageSize = pageSize;
  dataContent.pagination.pageNum = 1;
  getList();
};
//获取可见角色
const getSelectRoleOption = () => {
  postSelectRoleList().then(res => {
    if (res.code === "200") {
      visibleRoleList.value = res.data;
    }
  });
};
// 构造部门数据结构
const constructOptions = arr => {
  Array.isArray(arr) &&
    arr.forEach(item => {
      if (item.children && item.children.length === 0) {
        delete item.children;
      }
      if (item.children && item.children.length) {
        constructOptions(item.children);
      }
    });
  return arr;
};
// 获取关联部门
const getSelectDeptOption = () => {
  getSelectDeptList().then(res => {
    if (res.code === "200") {
      relationDeptList.value = constructOptions(res.data);
    }
  });
};
// 新建设置事件
const handleAdd = () => {
  id.value = "";
  title.value = "新建日历事件";
  eventVisible.value = true;
  getSelectRoleOption();
  getSelectDeptOption();
  formRef.value.resetFields();
};
// 取消
const handleCancel = () => {
  eventVisible.value = false;
};
// 确定
const handleModalOk = () => {
  formRef.value.validate(err => {
    if (!err) {
      if (!id.value) {
        const calendarEventEntity = {
          period: form.period,
          isWorkday: form.isWorkday,
          visibleRole: String(form.visibleRole),
          relationDept: form.relationDept,
          eventDescription: form.eventDescription,
        };
        postAddInsertEvent(calendarEventEntity)
          .then(res => {
            if (res.code === "200") {
              Message.success("保存成功");
              eventVisible.value = false;
              getList();
            } else {
              Message.error(res.desc || "保存失败");
            }
          })
          .catch(err => {
            Message.err(err || "保存失败");
          });
      } else {
        const calendarEventEntity = {
          period: form.period,
          isWorkday: form.isWorkday,
          visibleRole: String(form.visibleRole),
          relationDept: form.relationDept,
          eventDescription: form.eventDescription,
          id: id.value,
        };
        postUpdateInsertEvent(calendarEventEntity)
          .then(res => {
            if (res.code === "200") {
              Message.success("保存成功");
              eventVisible.value = false;
              getList();
            } else {
              Message.error(res.desc || "保存失败");
            }
          })
          .catch(err => {
            Message.err(err || "保存失败");
          });
      }
    }
  });
};
// 处理工作日、自然日天数
const construcPeriod = (arr, value) => {
  return arr[arr.findIndex(item => item.label === Number(value))].label;
};
// 编辑
const handleUpdate = record => {
  title.value = "编辑日历事件";
  eventVisible.value = true;
  getSelectRoleOption();
  getSelectDeptOption();
  form.isWorkday = String(record.isWorkday);
  record.isWorkday === 0
    ? (form.period = construcPeriod(workDayList, record.period))
    : (form.period = construcPeriod(naturalDayList, record.period));
  form.visibleRole = record.visibleRole.split(",");
  form.relationDept = record.relationDept;
  form.eventDescription = record.eventDescription;
  id.value = record.id;
};
// 删除
const handleDelete = record => {
  deleteInsertEvent({ id: record.id })
    .then(res => {
      if (res.code == "200") {
        Message.success("删除成功");
        getList();
      } else {
        Message.error(res.desc || "删除失败");
      }
    })
    .catch(err => {
      Message.error(err || "删除失败");
    });
};
</script>

<style lang="scss" scoped></style>
