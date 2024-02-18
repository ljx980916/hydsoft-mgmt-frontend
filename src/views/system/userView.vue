<template>
  <div class="defaultPadding">
    <!-- 表格内容 -->
    <tableContainer
      class="m-t-20"
      column-resizable
      :scroll="scroll"
      :scrollbar="false"
      :paginationTotal="dataContent.pagination.total"
      :paginationPageSize="dataContent.pagination.pageSize"
      :paginationCurrent="dataContent.pagination.pageNum"
      :loading="dataContent.loading"
      :tableColumns="userTableColumns"
      :table-data="dataContent.dataSource"
      :menu-name="dataContent.menuName"
      :tabs="tabList"
      :chekedValue="chekedValue"
      @handleEdit="handleEditUser"
      @radioChange="radioChange"
      @handleUpdateFlag="handleUpdateFlag"
      @paginationCurrentChange="paginationCurrentChange"
      @paginationPageSizeChange="paginationPageSizeChange"
    >
        <a-button type="primary" @click="handleDetail()" v-if="permissions.includes('user:add')">
                <template #icon>
                  <icon-plus />
                </template>
                <template #default>新建账号</template>
        </a-button>
    </tableContainer>
    <a-modal v-model:visible="accountVisible" :title="title" title-align="start" width="680px">
      <a-form ref="formRef" :mask="true" :model="form" auto-label-width :style="{ width: '580px', marginLeft: '20px' }">
        <a-form-item field="empName" label="员工姓名" :rules="[{ required: true, message: '请输入员工姓名' }]">
          <a-select
            v-model="form.empName"
            placeholder="请输入"
            :filter-option="false"
            allow-search
            :disabled="accountModalStatus === 'update'"
            @search="handleNameSearch"
            @change="changeDeptname"
          >
            <a-option v-for="(item, index) of empList" :value="item.empCode" :label="item.empName" :key="index">
              {{ item.empName }} &nbsp;({{ item.empCode }}，{{ item.deptName }})
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="empCode" label="员工工号" :rules="[{ required: true, message: '请输入员工工号' }]">
          <a-input
            v-model="form.empCode"
            placeholder="请输入"
            disabled
          >
          </a-input>
        </a-form-item>
        <a-form-item field="deptName" label="部门名称" disabled :rules="[{ required: true, message: '请输入部门名称' }]">
          <a-input v-model="form.deptName" placeholder="请输入" :disabled="accountModalStatus === 'update'"/>
        </a-form-item>
        <a-form-item v-if="hasAdmin" field="roleConfig1" label="角色" :rules="[{ required: true, message: '请输入角色设置' }]">
          <a-select v-model="form.roleConfig1" placeholder="请输入" multiple allow-search>
            <a-option v-for="item of roleList" :value="item.id" :key="item.id">{{ item.name }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item v-else field="roleConfig" label="角色" :rules="[{ required: true, message: '请选择角色设置' }]">
          <span class="m-t-8">{{ form.roleConfig }}</span>
        </a-form-item>
        <!-- <a-form-item field="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model="form.password" placeholder="请输入" allow-clear />
        </a-form-item> -->
      </a-form>
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleModalOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { userListColumns } from "./constColumns";
import { getUserList, updateFlag, getNameCodeList,listShowTabRole } from "@/api/userRole";
import { onBeforeMount, reactive, ref, shallowRef } from "vue";
import tableContainer from "@/components/tableContainer.vue";
import { getCurrentInstance } from "@vue/runtime-core";
import { Message } from "@arco-design/web-vue";
import { saveUser, userDetail } from "@/api/userRole.js";
import { postSelectRoleList } from "@/api/calendarEvents.js";
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
import { useUserInfoStore, useMenuStore } from "../../store/index";
const permissions = useMenuStore().getPermission;
const userInfo = useUserInfoStore().getUserInfo;
onBeforeMount(() => {
  $bus.emit("updateStructure", [{ type: "text", color: "#333", msg: "账号列表" }]);
  getRole();
});
const hasAdmin = ref(false);
const tabList = ref([]);
const chekedValue = ref("OMD");
const userTableColumns = ref(userListColumns);
const accountVisible = ref(false);
const form = reactive({
  roleConfig: "OMD",
  roleConfig1: [],
  empCode:'',
  empName:"",
  deptName:'',
  userName:''
});
const roles = ref([]);
const formRef = ref(null);
const scroll = {
  x: "100%",
  y: 600,
};
const empList = shallowRef([]);
const actionType = ref("");
const title = ref("");
const id = ref("");
const roleList = ref([]);
const accountModalStatus = ref('add')
// 表格配置
const dataContent = reactive({
  loading: false,
  dataSource: [],
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  menuName: "user",
});
const getRole = () => {
  postSelectRoleList().then(res => {
    if (res.code == "200") {
      roleList.value = res.data;
    }
  });
};
// 获取列表数据
const getList = () => {
  dataContent.loading = true;
  const params = {
    pageNum: dataContent.pagination.pageNum,
    pageSize: dataContent.pagination.pageSize,
    roleCode: chekedValue.value,
  };
  getUserList(params).then(res => {
    if (res.code === "000000000000") {
      res.data.list.forEach((item, i) => {
        item.key = i;
      });
      dataContent.pagination.total = parseInt(res.data.total);
      dataContent.dataSource = res.data.list;
    }
    dataContent.loading = false;
  });
};
getList();
// 新建账号
const handleDetail = () => {
  accountVisible.value = true;
  actionType.value = "";
  title.value = "新建账号";
  formRef.value.resetFields();
  form.roleConfig1 = []
  id.value = "";
  accountModalStatus.value = 'add'
  chekedValue.value === "OMD" ? (form.roleConfig = "OMD") : (form.roleConfig = "admin");
  if (userInfo.roles.indexOf("admin") != -1) {
    hasAdmin.value = true;
  } else {
    hasAdmin.value = false;
  }
};
// 更改账号状态
const handleUpdateFlag = record => {
  const params = {
    userId: record.id,
    flag: record.flag == 1 ? 0 : 1,
  };
  updateFlag(params).then(res => {
    if (res.code === "000000000000") {
      Message.success("操作成功");
      getList();
    } else {
      Message.error(res.message);
    }
  });
};
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
// 切换tab
const radioChange = val => {
  chekedValue.value = val;
  form.roleConfig = val;
  getList();
};
// 编辑
const handleEditUser = (record, type) => {
  roles.value = [];
  form.roleConfig1 = [];
  accountVisible.value = true;
  accountModalStatus.value = 'update'
  if (userInfo.roles.indexOf("admin") != -1) {
    hasAdmin.value = true;
  } else {
    hasAdmin.value = false;
  }
  userDetail({ id: record.id }).then(res => {
    const { data, code } = res;
    if (code === "000000000000") {
      form.empName = `${data.name}`;
      form.empCode = data.workNo;
      form.deptName = data.deptName;
      // form.password = data.pwd;
      form.userName = data.userName;
      data.roles.forEach(item => {
        if (form.roleConfig1.indexOf(item.id) === -1) {
          form.roleConfig1.push(item.id);
        }
      });
    }
  });
  actionType.value = type;
  title.value = "编辑账号";
  id.value = record.id;
};
const getNameCode = (params) =>{
  getNameCodeList(params).then(res => {
    if (res.code == "000000000000") {
      empList.value = res.data;
    }
  });
}
// 搜索
const handleNameSearch = val => {
  formRef.value.resetFields();
  //请求接口
  const params = {
    empName:val,
    empCode:form.empCode
  }
  getNameCode(params)
};
// 更改员工姓名
const changeDeptname = val => {
  form.empName = val;
  empList.value.forEach(item => {
    if (val.indexOf(item.empCode) !== -1) {
      form.empCode = item.empCode;
      form.deptName = item.deptName;
      form.userName = item.empEmail.slice(0, item.empEmail.indexOf("@"));
    }
  });
};
const filterEmpList = (empCode)=>{
  return empList.value.filter(item=>item.empCode===empCode)[0] || {}
}
// 取消
const handleCancel = () => {
  accountVisible.value = false;
};
const transformedArr = arr => {
  return arr.map(item => {
    return { id: item };
  });
};
const transformedObj = (name, code) => {
  if (form.roleConfig == name) {
    roleList.value.forEach(item => {
      if (item.code == code) {
        roles.value.push({ id: item.id });
      }
    });
  }
};
// 确定
const handleModalOk = () => {
  formRef.value.validate(err => {
    if (!err) {
      accountVisible.value = false;
      if (!hasAdmin.value) {
        transformedObj("OMD", "OMD");
        transformedObj("admin", "admin");
      }
      let accountName = title.value === "新建账号"?filterEmpList(form.empCode).empName : form.empName
      const params = {
        id: id.value,
        name: accountName,
        workNo: form.empCode,
        deptName: form.deptName,
        // pwd: form.password,
        roles: hasAdmin.value ? transformedArr(form.roleConfig1) : roles.value,
        roleCode: chekedValue.value,
        userName: form.userName || form.empName
      };
      saveUser(params)
        .then(res => {
          if (res.code === "000000000000") {
            Message.success("操作成功");
            getList();
          } else {
            Message.error(res.message);
          }
        })
        .catch(err => {
          Message.error(err.message || '数据请求失败');
        });
    }
  });
};
const getTabShow = ()=>{
  listShowTabRole().then(res=>{
    if(res.code === '000000000000'){
      tabList.value = res.data.map(item=>{
        return {
            key: item.code,
            name: item.name,
          }
      })
    }else {
      Message.error(res.message);
    }
  }).catch(err=>{
    Message.error(err.message || '数据请求失败');
  })
} 
getTabShow()
</script>

<style lang="scss">
.flex-between {
  display: flex;
  justify-content: space-between;
}

.m-t-20 {
  margin-top: 20px;
}

.tableResize {
  .arco-table-container .arco-table-content {
    .arco-table-header {
      .arco-table-element {
        thead tr:first-child .arco-table-th:last-child {
          transform: translateX(16.5px);
        }
      }
    }
  }
}
</style>
