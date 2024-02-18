<template>
  <div>
    <div>
      <div class="m-b-20">
        <div class="flex-between" style="height: 40px;">
          <a-radio-group type="button" size="large" :model-value="props.chekedValue" @change="radioChange">
            <a-radio v-for="item of props.tabs" :value="item.key">{{ item.name }}</a-radio>
          </a-radio-group>
          <slot></slot>
        </div>
        <div>
          <div class="tool-grid">
            <!-- 只看我的 -->
            <div v-if="props.menuName === 'USER'">
              <a-switch :value="switchStatus" @change="handleSwitch">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
              <span>只看我的</span>
            </div>
            <!-- 导出excel -->
            <a-button type="primary" v-if="props.menuName === 'USER'">
              <template #icon>
                <icon-download />
              </template>
              <template #default>导出excel</template>
            </a-button>
            <!-- 配置列 -->
            <a-button class="config" type="primary" @click="handleSetColumns" v-if="props.menuName === 'USER'">
              <template #icon>
                <icon-home />
              </template>
              <template #default>配置列</template>
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格内容 -->
    <div>
      <a-table
        :columns="(props.tableColumns.length && props.tableColumns) || tableInfo.tableColumns"
        :data="(props.tableData.length && props.tableData) || tableInfo.tableData"
        column-resizable
        :bordered="false"
        :scroll="{ x: '100%', y: props.scrollY }"
        :scrollbar="false"
        :loading="props.loading"
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
      >
        <template #type_view="{ record }">
          <div>{{ record.type === 0 ? "目录" : record.type === 1 ? "菜单" : "按钮" }}</div>
        </template>
        <template #role_view="{ record }">
          <div v-for="(item, i) in record.roles" :key="i">{{ item.name }}</div>
        </template>
        <template #flag_view="{ record }">
          <span class="red" v-if="record.flag === 0">禁用</span>
          <span class="green" v-if="record.flag === 1">启用</span>
        </template>
        <template #action="{ record }">
          <a-popconfirm content="你确定要启用这个用户吗?" type="error" @ok="handleUpdateFlag(record)">
            <a-button type="text" v-if="props.menuName == 'user' && record.flag === 0">启用</a-button>
          </a-popconfirm>
          <a-divider v-if="props.menuName == 'user' && record.flag === 0" direction="vertical" />
          <a-button type="text" v-if="props.menuName == 'user' && record.flag === 0" style="color: #999999">禁用</a-button>
          <a-button type="text" v-if="props.menuName == 'user' && record.flag === 1" style="color: #999999">启用</a-button>
          <a-divider v-if="props.menuName == 'user' && record.flag === 1" direction="vertical" />
          <a-popconfirm content="你确定要禁用这个用户吗?" type="error" @ok="handleUpdateFlag(record)">
            <a-button type="text" v-if="props.menuName == 'user' && record.flag === 1">禁用</a-button>
          </a-popconfirm>
          <!-- 查看 -->
          <a-button type="text" v-if="props.menuName == 'USER'" @click="handleDetail(record, 'view')">查看</a-button>
          <a-divider v-if="props.menuName == 'user'" direction="vertical" />
          <!-- 编辑 -->
          <a-button
            v-if="permissions.includes('menu:edit') && record.code !== 'admin'"
            type="text"
            @click="handleEdit(record, 'edit')"
          >
            编辑
          </a-button>
          <a-divider
            v-if="props.menuName == 'menu' || (props.menuName == 'role' && record.code !== 'admin')"
            direction="vertical"
          />
          <!-- 删除 -->
          <a-popconfirm content="确定要删除吗?" type="error" @ok="handleDeleteMenu(record)">
            <a-button
              type="text"
              v-if="
                permissions.includes('menu:delete') &&
                (props.menuName == 'menu' || (props.menuName == 'role' && record.code !== 'admin'))
              "
            >
              删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <!-- 表单数据 -->
    <a-modal v-model:visible="modalVisible" title="选择表格项">
      <a-checkbox-group @change="columnSelected" v-model="defaultCheckList">
        <a-checkbox v-for="item of setColumns" :key="item.dataIndex" :value="item.dataIndex">
          {{ item.title }}
        </a-checkbox>
      </a-checkbox-group>
      <template #footer>
        <a-button type="primary" @click="columnOK">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { userListColumns } from "../views/system/constColumns";
import { Message } from "@arco-design/web-vue";
import { useMenuStore } from "../store/index";
const permissions = useMenuStore().getPermission;
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  chekedValue: {
    type: String,
    default: "",
  },
  // 表头
  tableColumns: {
    type: Array,
    default: () => [],
  },
  // 表单数据
  tableData: {
    type: Array,
    default: () => [],
  },
  // 菜单名称(根据菜单名称判断显示指定按钮)
  menuName: {
    type: String,
    default: "",
  },
  loading : {
    type : Boolean,
    default : false
  },
  scrollY : {
    type : String,
    default : '600px'
  },
  setColumns: {
    type: Array,
    default: () => [],
  },
  switchStatus: {
    type: Boolean,
    default: false,
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
// 表头信息
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
const emit = defineEmits([
  "switchClick",
  "paginationCurrentChange",
  "paginationPageSizeChange",
  "handleEdit",
  "handleDeleteMenu",
  "handleUpdateFlag",
  "columnOK",
  "radioChange",
]);
const modalVisible = ref(false);
const defaultCheckList = ref([]);
const checkedValues = ref([]);
const userTableColumns = ref(userListColumns);
let actionColumn = userListColumns.filter(item => item.dataIndex !== "action") || [];
// 打开配置列
const handleSetColumns = () => {
  modalVisible.value = true;
};
// 配置列多选框更改
const columnSelected = values => {
  checkedValues.value = values;
};
// 打开配置列勾选表格中已有的表头
const setTableColumns = () => {
  let cachColumns = JSON.parse(localStorage.getItem("userListColumns"));
  if (cachColumns) {
    userTableColumns.value = cachColumns;
    defaultCheckList.value = cachColumns.map(item => item.dataIndex);
  } else {
    var selectedColumsArr = [];
    actionColumn.forEach(item => {
      selectedColumsArr.push(item.dataIndex);
      defaultCheckList.value = selectedColumsArr;
    });
  }
};
setTableColumns();
// 配置列确认
const columnOK = () => {
  if (defaultCheckList.value.length === 1 && defaultCheckList.value[0] === "action") {
    return Message.error("至少选择一项");
  } else {
    emit("columnOK", defaultCheckList.value);
    modalVisible.value = false;
  }
};
// 只看我的
const handleSwitch = bool => {
  emit("switchClick", !bool);
};
// 更改当前页
const paginationChange = current => {
  emit("paginationCurrentChange", current);
};
// 更改页容量
const paginationPageSizeChange = pageSize => {
  emit("paginationPageSizeChange", pageSize);
};
// 编辑
const handleEdit = (record, type) => {
  emit("handleEdit", record, type);
};
// 删除
const handleDeleteMenu = record => {
  emit("handleDeleteMenu", record);
};
// 查看
const handleDetail = record => {
  emit("handleDetail", record);
};
// 更改状态
const handleUpdateFlag = record => {
  emit("handleUpdateFlag", record);
};
//tab切换
const radioChange = val => {
  emit("radioChange", val);
};
</script>

<style lang="scss" scoped>
.header-grid {
  display: grid;
  grid-template-columns: 10fr 6fr;
  gap: 20px;
}
.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 15px;
  row-gap: 20px;
  grid-auto-flow: row;
}
.m-b-20 {
  margin-bottom: 20px;
}
.config {
  position: absolute;
  width: 100px;
  top: 210px;
  height: 36px;
  right: 70px;
}
</style>
