<template>
  <div class="defaultPadding">
    <!-- 添加菜单 -->
    <a-button type="primary" v-if="permissions.includes('menu:add')" @click="handleAddMenu">
      <template #icon>
        <icon-plus />
      </template>
      <template #default>添加菜单</template>
    </a-button>
    <!-- 表格内容 -->
    <TableContainer
      class="m-t-20"
      column-resizable
      :scroll="{ y: 600 }"
      :scrollbar="false"
      :paginationTotal="dataContent.pagination.total"
      :paginationPageSize="dataContent.pagination.pageSize"
      :paginationCurrent="dataContent.pagination.pageNum"
      :loading="dataContent.loading"
      :tableColumns="dataContent.columns"
      :table-data="dataContent.dataSource"
      :menu-name="dataContent.menuName"
      @handleEdit="handleEditMenu"
      @handleDeleteMenu="handleDeleteMenu"
      @paginationCurrentChange="paginationCurrentChange"
      @paginationPageSizeChange="paginationPageSizeChange"
    ></TableContainer>
    <!-- 添加菜单表单 -->
    <a-modal :mask="true" v-model:visible="addMenuModal" title="添加菜单" @ok="handleFormOk">
      <a-form :model="form">
        <a-form-item field="类型" label="类型">
          <a-radio-group v-model="form.type">
            <a-radio :value="0">目录</a-radio>
            <a-radio :value="1">菜单</a-radio>
            <a-radio :value="2">按钮</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="菜单名称" label="菜单名称">
          <a-input type="text" placeholder="请输入菜单名称" v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item field="上级菜单" label="上级菜单">
          <a-cascader
            v-model="form.parentId"
            :options="casList"
            :expandTrigger="'hover'"
            check-strictly
            placeholder="请选择上级菜单"
          />
        </a-form-item>
        <a-form-item field="菜单URL" label="菜单URL">
          <a-input type="text" placeholder="请输入菜单路径" v-model="form.url"></a-input>
        </a-form-item>
        <a-form-item field="授权标识" label="授权标识">
          <a-input type="text" placeholder="请输入授权标识" v-model="form.perms"></a-input>
        </a-form-item>
        <a-form-item field="排序号" label="排序号">
          <a-input-number placeholder="请输入排序号" v-model="form.sort"></a-input-number>
        </a-form-item>
        <a-form-item field="图标" label="图标">
          <a-input type="text" placeholder="请输入图标" v-model="form.icon"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw, onBeforeMount } from "vue";
import { useMenuStore } from "../../store/index";
import { menuListColumns } from "./constColumns";
import { list, addList, editMenu, delMenu } from "@/api/menu";
import { getCurrentInstance } from "@vue/runtime-core";
import { Message } from "@arco-design/web-vue";
import TableContainer from "@/components/tableContainer.vue";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
const menuStore = useMenuStore()
const permissions = menuStore.getPermission;
onBeforeMount(() => {
  $bus.emit("updateStructure", [{ type: "text", color: "#333", msg: "菜单列表" }]);
});
// 表格配置信息
const dataContent = reactive({
  columns: menuListColumns,
  dataSource: [],
  loading: false,
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  menuName: "menu",
});
const addMenuModal = ref(false);
const form = reactive({
  type: "",
  name: "",
  parentId: "",
  url: "",
  perms: "",
  sort: undefined,
  icon: "",
});
const menuId = ref("");
const casList = ref([]);
const treeData = arr => {
  const treeArr = [];
  arr.forEach(item => {
    let obj = { label: item.name, value: item.id };
    if (item.children && item.children.length) {
      obj.children = treeData(item.children);
      treeArr.push(obj);
    } else {
      treeArr.push(obj);
    }
  });
  return treeArr;
};
// 获取列表数据
const getList = () => {
  list().then(res => {
    if (res.code === "000000000000") {
      let arr = [];
      res.data.forEach(item => {
        item.children = [];
        item.key = item.id;
        if (item.parentId === "000000") {
          arr.push(item);
        }
        res.data.forEach(val => {
          if (val.parentId === item.id) {
            item.children.push(val);
          }
        });
      });
      dataContent.dataSource = arr;
      dataContent.pagination.total = Number(dataContent.dataSource.length);
      casList.value = [
        {
          label: "一级菜单",
          value: "000000",
          children: treeData(arr.slice()),
        },
      ];
    }
  });
};
getList();
// 更改当前页码
const paginationCurrentChange = current => {
  dataContent.pagination.pageNum = current;
  getList();
};
// 更改页容量
const paginationPageSizeChange = pageSize => {
  dataContent.pagination.pageSize = pageSize;
  getList();
};
// 添加菜单
const handleAddMenu = () => {
  addMenuModal.value = true;
  (form.type = ""),
    (form.name = ""),
    (form.parentId = ""),
    (form.url = ""),
    (form.perms = ""),
    (form.sort = undefined),
    (form.icon = "");
};
// 编辑
const handleEditMenu = record => {
  addMenuModal.value = true;
  menuId.value = record.id;
  (form.type = record.type),
    (form.name = record.name),
    (form.parentId = record.parentId),
    (form.url = record.url),
    (form.perms = record.perms),
    (form.sort = record.sort),
    (form.icon = record.icon);
};
// 删除
const handleDeleteMenu = record => {
  delMenu(record).then(res => {
    if (res.code === "000000000000") {
      Message.success("删除成功");
      getList();
      $bus.emit("updateMenu");
      menuStore.menuSideBar().then(()=>{
        Message.success("菜单已更新");
      })
    } else {
      Message.error(res.message);
    }
  });
};
// 添加菜单 确定
const handleFormOk = () => {
  let values = toRaw(form);
  values.id = menuId.value;
  if (menuId.value === "") {
    addList(values).then(res => {
      if (res.code === "000000000000") {
        Message.success("新建成功!");
        getList();
        $bus.emit("updateMenu");
      } else {
        Message.error(res.message);
      }
    });
  } else {
    editMenu(values).then(res => {
      if (res.code === "000000000000") {
        Message.success("更新成功!");
        getList();
        $bus.emit("updateMenu");
      } else {
        Message.error(res.message);
      }
    });
    menuId.value = "";
  }
  menuStore.menuSideBar().then(()=>{
    Message.success("菜单已更新");
  })
};
</script>

<style lang="scss">
.m-t-20 {
  margin-top: 20px;
}
</style>
