<template>
  <a-layout class="layout-demo">
    <a-layout-sider breakpoint="lg" :width="innerWidth>1800?240:180" :collapsed="collapsed" class="menu-container" @collapse="onCollapse">
      <!-- logo部分 -->
      <div class="logo">
        <span v-if="!collapsed">经营管理系统</span>
        <span v-else>
          <img src="../../public/huibo.png" width="24" />
        </span>
      </div>
      <!-- 菜单  -->
      <a-menu
        :default-open-keys="[(breadListStore.breadList.length > 0 && breadListStore.breadList[0].name)?breadListStore.breadList[0].name:'业务体验']"
        v-model:selected-keys="selectedKeys"
        show-collapse-button
        :class="['aside-menu-content', { 'aside-menu': !collapsed }]"
        auto-open
        @collapse="onCollapse"
      >
        <a-sub-menu v-for="item of menuStore.getMenuList" :key="item.name">
          <template #title>
            <span>
              <component :is="item.icon"></component>
              {{ item.name }}
            </span>
          </template>
          <a-menu-item v-for="jtem of item.children" :key="jtem.name" @click="handleMenuItem(item, jtem)">
            {{ jtem.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="content">
      <a-layout-header class="menu-horizontal flex-between-noCenter" style="padding: 0 24px">
        <div>
          <div
            v-if="
              [
                'drill',
                'empStatistics',
                'ringContrastChart',
                'lookChart',
                'customerRingSame',
                'projectRingSame',
                'staticPicture',
                'staticDetail',
              ].includes(currentRoute.name)
            "
            style="padding-left: 20px; font-size: 14px; min-height: 30px; color: #333; font-weight: 500"
          >
            <template v-for="(item, index) of showStructureArr" :key="index">
              <span v-if="item.type === 'text'" :style="{ color: item.color, lineHeight: '32px' }">
                {{ item.msg }}
              </span>
              <a-button
                type="text"
                v-else-if="item.type === 'button'"
                @click="goPage(item.params, item.isBack)"
                :disabled="goBackDisabled"
              >
                {{ item.msg }}
              </a-button>
              <span v-if="index < showStructureArr.length - 1" class="m-l-4 m-r-4">/</span>
            </template>
          </div>
          <!-- 面包屑  -->
          <div v-else>
            <a-breadcrumb :style="{ margin: '16px 0' }">
              <a-breadcrumb-item v-for="item of breadList" :key="item.name">{{ item.name }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </div>
        <div>
          <!-- 日历 -->
          <a-space class="m-r-24">
            <a-button shape="round" @click="handleCalender">
              <template #icon>
                <span class="blue"><icon-calendar size="medium" /></span>
              </template>
              {{ dateNow }}
            </a-button>
          </a-space>
          <!-- 退出登录部门 -->
          <a-space class="userContent">
            <img src="huibo.png" width="20" />
            <a-dropdown trigger="hover">
              <span class="pointer">
                {{ userInfoContent.info.name || userInfoContent.info.userName || userInfoContent.info.nickName }}
              </span>
              <template #content>
                <a-doption v-if="isTest" @click="restPwdModal">修改密码</a-doption>
                <a-doption @click="logoutModalVisible = true">退出登录</a-doption>
              </template>
            </a-dropdown>
          </a-space>
        </div>
      </a-layout-header>
      <a-layout id='a-layout-main' class="main" style="padding: 10px 10px 0 10px;margin:10px;">
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <!-- 内容区底部  -->
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
    </a-layout>
  </a-layout>
  <div class="dropDownContainer"></div>
  <a-modal
    v-model:visible="logoutModalVisible"
    width="400px"
    @ok="handleLogoutOk"
    @cancel="logoutModalVisible = false"
    okText="确定"
    cancelText="取消"
    unmountOnClose
  >
    <template #title>退出登录</template>
    <div>确定退出登录吗？</div>
  </a-modal>
  <a-modal :ok-loading="confirmLoading" v-model:visible="restPwdModalVisible" title="修改密码">
    <a-form
      :model="restModalForm"
      :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }"
      :wrapperCol="{ xs: { span: 24 }, sm: { span: 16 } }"
      ref="formRef"
    >
      <a-form-item label="旧密码" field="sourcePassword" :rules="[{ required: true, message: '请填写旧密码' }]" :feedback="true">
        <a-input-password placeholder="请输入旧密码" v-model="restModalForm.sourcePassword" />
      </a-form-item>
      <a-form-item
        label="新密码"
        field="newPassword"
        :rules="[{ required: true, message: '请填写新密码' }, { validator: validateToNextPassword }]"
        :feedback="true"
        :validate-trigger="['change', 'input', 'blur']"
      >
        <a-input-password placeholder="请输入新密码" v-model="restModalForm.newPassword" />
      </a-form-item>
      <a-form-item
        label="确认新密码"
        field="confirmPassword"
        :rules="[{ required: true, message: '请再次输入新密码' }, { validator: compareToFirstPassword }]"
        :feedback="true"
        :validate-trigger="['change', 'input', 'blur']"
      >
        <a-input-password placeholder="请再次输入新密码" v-model="restModalForm.confirmPassword" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="handleRestPwdModalCancel">取消</a-button>
      <a-button type="primary" @click="handleRestPwdModalOK">确定</a-button>
    </template>
  </a-modal>
  <a-modal
    v-model:visible="calenderVisible"
    width="1044px"
    :footer="false"
    :simple="true"
    :modalStyle="{ padding: '0 24px 10px' }"
  >
    <template #title>
      <span class="close" @click="handleCloseCalender">
        <icon-close />
      </span>
    </template>
    <calenderTable />
  </a-modal>
</template>
<script setup>
import { reactive, ref, onMounted, onUnmounted, onBeforeMount} from "vue";
import { Message } from "@arco-design/web-vue";
import calenderTable from "@/components/calenderTable.vue";
import { useMenuStore, useBreadListStore, useUserInfoStore } from "../store/index";
import { storeToRefs } from "pinia";
import { menuSideBar,getDetailList } from "../api/menu";
import { __canvasWM } from "../utils/watermark";
import { useRouter} from "vue-router";
import { getCurrentInstance } from "@vue/runtime-core";
import { getCurrentTime,clearAllCookies } from "@/utils/util.js";
import { goLogin } from "@/utils/getToken";
import { password } from "@/api/login";
const router = useRouter();
const currentRoute = router.currentRoute;
let { year, month, day } = getCurrentTime();
let currentDate = `${year}/${month}/${day}`;
const dateNow = ref(currentDate);
const selectedKeys = ref([]);
const innerWidth = window.innerWidth

/*-------------- 面包屑导航-start------------------- */
let breadListStore = useBreadListStore();
const { breadList } = storeToRefs(breadListStore);
/*-----------侧边栏菜单-start-------------------- */
let menuStore = useMenuStore();
const collapsed = ref(false);
//页面刷新后,根据当前页面path从菜单中找出对应的菜单key高亮显示，并更改导航路径
// const menuShowActive = ref(true)
const newPwdReg = ref('/^[0-9a-zA-Z!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]{8,}$/')
const minLength = ref('')
const complexityStatus = ref()
const regList =ref([])
const ruleArry=ref([])
const regTip = ref('')
const handleMenuItem = (item, jtem) => {
  let menuArr = [];
  menuArr.push({ name: item.name });
  menuArr.push({ name: jtem.name });
  breadListStore.breadList = menuArr;
  router.push(jtem.url);
};
const onCollapse = (val, type) => {
  collapsed.value = val;
};
/*---------------菜单切换事件总线通信-start---------------- */
let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
$bus.on("updateMenu", () => {
  menuSideBar()
    .then(res => {
      if (res.code === "000000000000") {
        menuStore.$patch(state => {
          state.menuList = res.data.menuList;
          state.permissions = res.data.permissions;
        });
      }
    })
    .catch(err => {
      Message.error(err.message || "菜单更新失败");
    });
});
onUnmounted(() => {
  $bus.off("updateMenu");
});

/************* 返回禁用状态-start********************* */
const goBackDisabled = ref(false);
$bus.on("goBackDisabled", bool => {
  goBackDisabled.value = bool;
});
/*--------------获取登录用户信息-start-------------------- */
const userStore = useUserInfoStore();
const userInfoContent = reactive({
  info: {},
});
const calenderVisible = ref(false);
const getInfo = async () => {
  let userInfo = userStore.getUserInfo;
  userInfoContent.info = userInfo;
  __canvasWM({
    content: `${userInfo.name || userInfo.userName || userInfo.nickName} ${userInfo.workNo}`,
  });
};
onBeforeMount(() => {
  getInfo();
});
/**----------- 修改密码modal-start ------------- */
const formRef = ref(null);
const confirmLoading = ref(false);
const restPwdModalVisible = ref(false);
const restModalForm = reactive({
  sourcePassword: "",
  newPassword: "",
  confirmPassword: "",
});
const restPwdModal = ()=>{
  restPwdModalVisible.value= true
  getUserDetail()
}
// 获取详情
const getUserDetail = () => {
  getDetailList()
    .then(res => {
      if (res.code === "000000000000") {
        minLength.value = String(res.data.complexityMinLength);
        complexityStatus.value = res.data.complexityStatus;
        regList.value = [
          {
            id:0,
            reg:`^(?=.*[A-Z]){${minLength.value},}.+$`,
            regTip:`请输入包含大写字母的密码`
          }, 
          {
            id:1,
            reg:`^(?=.*[a-z]){${minLength.value},}.+$`,
            regTip:`请输入包含小写字母的密码`
          },
          {
            id:2,
            reg:`^(?=.*[0-9]){${minLength.value},}.+$`,
            regTip:`请输入包含数字的密码`
          },
          {
            id:3,
            reg:`^(?=.*[A-Z])(?=.*[a-z]){${minLength.value},}.+$`,
            regTip:`请输入包含字母的密码`
          },
           {
            id:4,
            reg:`^(?=.*[A-Z])(?=.*[0-9]){${minLength.value},}.+$`,
            regTip:`请输入包含大写字母和数字的密码`
          },
          {
            id:5,
            reg:`^(?=.*[a-z])(?=.*[0-9]){${minLength.value},}.+$`,
            regTip:`请输入包含小写字母和数字的密码`
          },
          {
            id:6,
            reg:`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]){${minLength.value},}.+$`,
            regTip:`请输入包含字母和数字的密码`
          },
        ]
        ruleArry.value = res.data.complexityRule.split(',').map(Number);
        if(complexityStatus.value){
          if(!ruleArry.value.includes(4)){
              if(ruleArry.value.includes(1) && ruleArry.value.includes(2) && !ruleArry.value.includes(3)){
                newPwdReg.value = regList.value[3].reg;
                regTip.value = regList.value[3].regTip
              }else
              if(ruleArry.value.includes(1) && ruleArry.value.includes(3)&& !ruleArry.value.includes(2)){
                newPwdReg.value = regList.value[4].reg;
                regTip.value = regList.value[4].regTip
              }else
              if(ruleArry.value.includes(2) && ruleArry.value.includes(3) && !ruleArry.value.includes(1)){
                newPwdReg.value = regList.value[5].reg;
                regTip.value = regList.value[5].regTip
              }else
              if(ruleArry.value.includes(1) && ruleArry.value.includes(2)&& ruleArry.value.includes(3)){
                newPwdReg.value = regList.value[6].reg;
                regTip.value = regList.value[6].regTip
              }else
              if(ruleArry.value.includes(1)&& !ruleArry.value.includes(2)&& !ruleArry.value.includes(3)){
                newPwdReg.value =regList.value[0].reg;
                regTip.value = regList.value[0].regTip
              }else
              if(ruleArry.value.includes(2) && !ruleArry.value.includes(1) && !ruleArry.value.includes(3)){
                newPwdReg.value = regList.value[1].reg;
                  regTip.value = regList.value[1].regTip
              }else
              if(ruleArry.value.includes(3) && !ruleArry.value.includes(1) && !ruleArry.value.includes(2)){
                newPwdReg.value = regList.value[2].reg;
                regTip.value = regList.value[2].regTip
              }
          }
        }
      }
    })
    .catch(err => {
      Message.error(err || "获取密码策略失败");
    });
};
// 校验密码
const validateToNextPassword = (value, callback) => {
  if(complexityStatus.value){
      if(restModalForm.newPassword.length < Number(minLength.value)){
        callback(`请输入长度大于或等于${minLength.value}位的密码`);
      }
      if(ruleArry.value.includes(4) && ruleArry.value.includes(1)&& ruleArry.value.includes(2) && ruleArry.value.includes(3)){
          // let reg = new RegExp(/^[A-Za-z0-9!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由字母、数字或特殊字符组成的密码`);
          callback(`请输入包含字母、数字和特殊字符的密码`);
      }
      if(ruleArry.value.includes(4) && ruleArry.value.includes(1) && !ruleArry.value.includes(3) && !ruleArry.value.includes(2)){
          // let reg = new RegExp(/^[A-Z!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由大写字母或特殊字符组成的密码`);
          callback(`请输入包含大写字母和特殊字符的密码`);
      }
      if(ruleArry.value.includes(4) && ruleArry.value.includes(2) && !ruleArry.value.includes(3) && !ruleArry.value.includes(1)){
          // let reg = new RegExp(/^[a-z!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由小写字母或特殊字符组成的密码`);
          callback(`请输入包含小写字母和特殊字符的密码`);
      }
      if(ruleArry.value.includes(4) && ruleArry.value.includes(3) && !ruleArry.value.includes(1) && !ruleArry.value.includes(2)){
          // let reg = new RegExp(/^[0-9!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由数字或特殊字符组成的密码`);
          callback(`请输入包含数字和特殊字符的密码`);
      }
      if(ruleArry.value.includes(4) && ruleArry.value.includes(1)&& ruleArry.value.includes(2) && !ruleArry.value.includes(3)){
          // let reg = new RegExp(/^[A-Za-z!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由字母或特殊字符组成的密码`);
          callback(`请输入包含字母和特殊字符的密码`);
      }
      if(ruleArry.value.includes(4) && ruleArry.value.includes(1)&&  ruleArry.value.includes(3) && !ruleArry.value.includes(2)){
          // let reg = new RegExp(/^[A-Z0-9!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由大写字母、数字或特殊字符组成的密码`);
          callback(`请输入包含大写字母、数字和特殊字符的密码`);
      }
      if(ruleArry.value.includes(4) && ruleArry.value.includes(2)&&  ruleArry.value.includes(3) && !ruleArry.value.includes(1)){
          // let reg = new RegExp(/^[a-z0-9!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由小写字母、数字或特殊字符组成的密码`);
          callback(`请输入包含小写字母、数字和特殊字符的密码`);
      }   
      if(ruleArry.value.includes(4) && !ruleArry.value.includes(3) && !ruleArry.value.includes(2) && !ruleArry.value.includes(1)){
          // let reg = new RegExp(/^[!@#$%^&*()\-_=+\[\]{};:\'",<.>\/?~]+$/)
          let reg = new RegExp(/^(?=.*[!@#$%^&*()\-_=+\[\]{}\\|;:'",<.>/\?~]).+$/)
          if (reg.test(value)) {
              callback();
              return;
          }
          // callback(`请输入由特殊字符组成的密码`);
          callback(`请输入包含特殊字符的密码`);
      }   
      let reg = new RegExp(newPwdReg.value)
          if (reg.test(value)) {
              callback();
              return;
          }
          callback(regTip.value);
  }else{
    callback();
    return;
  }
};
const compareToFirstPassword = (value, callback) => {
  if (value && value !== restModalForm.newPassword) {
    callback("两次输入的密码不一致 (｡•́︿•̀｡)");
    return;
  }
  callback();
};
const handleRestPwdModalCancel = () => {
  restPwdModalVisible.value = false;
  confirmLoading.value = false;
  formRef.value.resetFields();
};
const handleRestPwdModalOK = () => {
  confirmLoading.value = true;
  formRef.value.validate(err => {
    if (!err) {
      const formData = new FormData();
      formData.append("oldPwd", restModalForm.sourcePassword);
      formData.append("newPwd", restModalForm.newPassword);
      password(formData)
        .then(res => {
          if (res.code === "000000000000") {
            Message.success(res.message);
            restPwdModalVisible.value = false;
            userStore
              .Logout()
              .then(res => {
                Message.success(res.message);
                clearAllCookies()
                setTimeout(() => {
                  goLogin();
                }, 600);
              })
              .catch(err => {
                Message.error(err || "退出失败");
              });
          } else {
            Message.error(res.message);
          }
        })
        .finally(() => {
          confirmLoading.value = false;
        });
    }
  });
};
/*------- 退出登录modal-start -----------*/
const logoutModalVisible = ref(false);
const handleLogoutOk = () => {
  userStore
    .Logout()
    .then(res => {
      Message.success(res.message);
      clearAllCookies()
      setTimeout(() => {
        goLogin();
      }, 600);
    })
    .catch(err => {
      Message.error(err || "退出失败");
    });
};
// 点击日历
const handleCalender = () => {
  calenderVisible.value = true;
};
// 关闭日历
const handleCloseCalender = () => {
  calenderVisible.value = false;
};
/*---------- 左上角显示结构---------------*/
const showStructureArr = ref([]);
$bus.on("updateStructure", val => {
  showStructureArr.value = (Array.isArray(val) && val) || [];
});
onUnmounted(() => {
  $bus.off("updateStructure");
});
const goPage = (params, isBack = false) => {
  if (isBack) {
    router.go(-1);
    return;
  }
  $bus.emit("goBack", params);
};

/**滚动条滚动事件 */
onMounted(()=>{
  selectedKeys.value = [(breadListStore.breadList.length > 0 && breadListStore.breadList[1].name)?breadListStore.breadList[1].name:'下钻分析'];
  let layoutMainDom = document.querySelector('#a-layout-main')
  let prevScrollPos = layoutMainDom.pageYOffset || layoutMainDom.scrollTop
  layoutMainDom.addEventListener('scroll',e=>{
    let currentScrollPos = layoutMainDom.pageYOffset || layoutMainDom.scrollTop
    if (currentScrollPos > prevScrollPos){
      $bus.emit('handleScroll', {
        scrollTop : e.target.scrollTop,
        direction : 'down'
      })
    } else {
      $bus.emit('handleScroll', {
        scrollTop : e.target.scrollTop,
        direction : 'up'
      })
    }
    prevScrollPos = currentScrollPos;
    
  })
})
</script>
<style lang="scss" scoped>
.close {
  font-size: 26px;
  position: absolute;
  left: 95%;
  top: 2%;
  z-index: 9999999;
}
.menu-container :deep(.arco-layout-sider-children) {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(144, 147, 153, 0.5);
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: transparent;
  }
}
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo .content {
  overflow: visible;
  width: calc(100vw - 240px);
}
.layout-demo :deep(.arco-layout-sider) {
  &::-webkit-scrollbar {
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(144, 147, 153, 0.5);
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: transparent;
  }
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 64px;
  text-align: center;
  line-height: 64px;
  font-weight: bold;
  font-size: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
}
// .layout-demo :deep(.arco-layout-sider-light) .logo{
//   background: var(--color-fill-2);
// }
.layout-demo .menu-horizontal :deep(.arco-menu-light) {
  background-color: transparent;
}
.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
  //background-color: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
  // padding: 30px;
}
.layout-demo .main {
  //background: var(--color-bg-3);
  background-color: var(--color-fill-2);
  overflow-y: auto;
}
.layout-demo :deep(.arco-menu) {
  min-height: calc(100vh - 78px);
}
.layout-demo .aside-menu :deep(.arco-menu-collapse-button) {
  position: fixed;
  left: 140px;
  bottom: 14px;
}
.layout-demo .aside-menu-content {
  margin-top: 13px;
}
.layout-demo .aside-menu-content :deep(.arco-menu-inner) {
  padding-right: 0;
}
.layout-demo .aside-menu-content :deep(.arco-menu-item.arco-menu-selected) {
  border-right: 4px solid #5370ff;
}
.userContent {
  float: right;
  color: var(--color-text-2);
  margin-right: 20px;
}
.dropDownContainer {
  position: absolute;
}
.dropDownContainer :deep(.arco-dropdown .arco-scrollbar) {
  height: 390px;
}
.dropDownContainer :deep(.arco-dropdown .arco-scrollbar .arco-scrollbar-track) {
  display: none;
}
.dropDownContainer :deep(.arco-dropdown-list-wrapper) {
  max-height: none !important;
  overflow-y: visible !important;
}
.grey {
  color: #5a5a5a;
}
.bold {
  font-weight: bold;
}
.gray {
  color: #bfb4a9;
}
.font-14 {
  font-size: 12px;
}
.mr-10 {
  margin-right: 10px;
}
.close {
  color: #dddddd;
}
.m-t-15 {
  margin-top: 15px;
}

.pointer {
  cursor: pointer;
}
</style>
