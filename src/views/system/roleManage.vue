<template>
  <div class="defaultPadding">
    <!-- 搜索栏 -->
    <a-space>
      <span>角色编码：</span>
      <a-input v-model="roleCode" placeholder="请输入角色编码" class="w-200" />
      <a-button class="m-l-16" type="primary" @click="searchBase">
        <template #icon>
          <icon-search />
        </template>
        <template #default>搜索</template>
      </a-button>
      <a-button class="m-l-8" @click="setBase">
        <template #icon>
          <icon-refresh />
        </template>
        <template #default>重置</template>
      </a-button>
    </a-space>
    <!-- 新建角色 -->
    <div class="m-t-20">
      <a-button type="primary" @click="handleDetail({}, 'new')" v-if="permissions.includes('role:add')">
        <template #icon>
          <icon-plus />
        </template>
        <template #default>新建角色</template>
      </a-button>
    </div>
    <!-- 表格内容 -->
    <TableContainer
      class="m-t-20"
      column-resizable
      :scroll="{ y: 600 }"
      :scrollbar="false"
      :loading="dataContent.loading"
      :paginationTotal="dataContent.pagination.total"
      :paginationPageSize="dataContent.pagination.pageSize"
      :paginationCurrent="dataContent.pagination.pageNum"
      :tableColumns="dataContent.columns"
      :table-data="dataContent.dataSource"
      :menu-name="dataContent.menuName"
      @handleEdit="handleDetail"
      @handleDeleteMenu="delRoleItem"
      @paginationCurrentChange="paginationCurrentChange"
      @paginationPageSizeChange="paginationPageSizeChange"
    ></TableContainer>
    <!-- 添加角色表单 -->
    <a-modal :mask="true" v-model:visible="addRoleModal" title="添加角色">
      <a-form :model="form" ref="formRef">
        <a-form-item field="name" label="角色名称" :rules="[{ required: true, message: '请输入角色名称' }]">
          <a-input type="text" placeholder="请输入角色名称" v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item field="code" label="角色编码" :rules="[{ required: true, message: '请输入角色编码' }]">
          <a-input type="text" placeholder="请输入角色编码" v-model="form.code"></a-input>
        </a-form-item>
        <a-form-item field="remarks" label="备注" :rules="[{ required: true, message: '请输入备注' }]">
          <a-input type="text" placeholder="请输入备注" v-model="form.remarks"></a-input>
        </a-form-item>
        <a-form-item field="isShowTab" label="显示页签" :rules="[{ required: true, message: '请选择是否显示页签' }]">
          <a-radio-group v-model:model-value="form.isShowTab" style="margin-top: 10px;">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="defaultCheckedList" label="授权菜单">
          <a-tree
            :checkable="true"
            :checkStrictly="false"
            :data="casList"
            v-model:checked-keys="defaultCheckedList"
            @check="onCheckTree"
          />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="handleModalCancel">取消</a-button>
        <a-button type="primary" @click="handleModalOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw, onBeforeMount } from "vue";
import { roleListColumns } from "./constColumns";
import { roleList, addRole, editRole, delRole, roleInfo, } from "@/api/roleManage";
import { list } from "@/api/menu";
import { Message } from "@arco-design/web-vue";
import TableContainer from "@/components/tableContainer.vue";
import { useMenuStore } from "../../store/index";
import { getCurrentInstance } from "@vue/runtime-core";
const permissions = useMenuStore().getPermission;
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
onBeforeMount(() => {
  $bus.emit("updateStructure", [{ type: "text", color: "#333", msg: "角色列表" }]);
});

const roleCode = ref("");
const dataContent = reactive({
  columns: roleListColumns,
  dataSource: [],
  loading: false,
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  menuName: "role",
});
const addRoleModal = ref(false);
const form = reactive({
  name: "",
  code: "",
  remarks: "",
});
const defaultCheckedList = ref([]);
const casList = ref([]);

const roleId = ref("");
const selectedList = ref([]);
const formRef = ref();

const treeData = arr => {
  const treeArr = [];
  arr.forEach(item => {
    let obj = { title: item.name, key: item.id };
    if (item.children && item.children.length) {
      obj.children = treeData(item.children);
      treeArr.push(obj);
    } else {
      treeArr.push(obj);
    }
  });
  return treeArr;
};
// 获取角色管理列表
const getRoleList = () => {
  dataContent.loading = true;
  let obj = {
    code: roleCode.value,
    pageNum: dataContent.pagination.pageNum,
    pageSize: dataContent.pagination.pageSize,
  };
  roleList(obj).then(res => {
    if (res.code === "000000000000") {
      res.data.list.forEach((item, i) => {
        item.key = i;
      });
      dataContent.dataSource = res.data.list;
      dataContent.pagination.total = Number(res.data.total);
    }
    dataContent.loading = false;
  });
};
getRoleList();
// 获取菜单列表
const getMenuList = () => {
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
      casList.value = treeData(arr.slice());
    }
  });
};
getMenuList();
// 查询
const searchBase = () => {
  getRoleList();
};
// 重置
const setBase = () => {
  roleCode.value = "";
  getRoleList();
};
// 编辑
const handleDetail = (obj, type) => {
  formRef.value.resetFields();
  addRoleModal.value = true;
  roleId.value = type === "new" ? "" : obj.id;
  if (type === "edit") {
    roleInfo(obj).then(res => {
      form.name = res.data.name;
      form.code = res.data.code;
      form.remarks = res.data.remarks;
      form.isShowTab = res.data.isShowTab
      let newArr = [];
      selectedList.value = res.data.menuIdList;
      res.data.menuIdList.forEach(item => {
        checkedSelect(item, casList.value, newArr);
      });
      defaultCheckedList.value = newArr;
    });
  }
};
// 多选
const checkedSelect = (id, data, newArr) => {
  data = toRaw(data);
  data.forEach(item => {
    if (item.key === id) {
      if (!item.children) {
        newArr.push(item.key);
      }
    } else {
      if (item.children && item.children.length > 0) {
        checkedSelect(id, item.children, newArr);
      }
    }
  });
};
// 删除
const delRoleItem = record => {
  delRole(record).then(res => {
    if (res.code === "000000000000") {
      Message.success("删除成功!");
      getRoleList();
    } else {
      Message.error(res.message);
    }
  });
};
// 表单取消
const handleModalCancel = () => {
  addRoleModal.value = false;
};
// 表单确定
const handleModalOk = () => {
  if (selectedList.value.length === 0) {
    Message.error("请选择菜单权限");
    return;
  }
  let values = toRaw(form);
  values.id = roleId.value;
  values.menuIdList = selectedList.value;
  formRef.value.validate(err => {
    if (!err) {
      values.isShowTab = values.isShowTab?1:0
      if (values.id === "") {
        addRole(values).then(res => {
          if (res.code === "000000000000") {
            Message.success("新建成功!");
            getRoleList();
          } else {
            Message.error(res.message);
          }
        });
      } else {
        editRole(values).then(res => {
          if (res.code === "000000000000") {
            Message.success("更新成功!");
            getRoleList();
          } else {
            Message.error(res.message);
          }
        });
      }
      addRoleModal.value = false;
    }
  });
};
const onCheckTree = (checkedKeys, info) => {
  let list = [];
  list = list.concat(checkedKeys).concat(info.halfCheckedKeys);
  selectedList.value = list;
};
// 更改当前页码
const paginationCurrentChange = current => {
  dataContent.pagination.pageNum = current;
  getRoleList();
};
// 更改页容量
const paginationPageSizeChange = pageSize => {
  dataContent.pagination.pageSize = pageSize;
  getRoleList();
};
</script>

<style lang="scss">
.w-200 {
  width: 200px;
}

.m-t-20 {
  margin-top: 20px;
}
</style>
