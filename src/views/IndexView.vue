<template>
    <div>
    </div>
</template>

<script setup>
import { useMenuStore ,useUserInfoStore } from "../store/index";
import { useRouter } from "vue-router";
const router = useRouter();
let menuStore = useMenuStore();
// 只有角色为developer才能看到实验室这一菜单
const userStore = useUserInfoStore();
let userInfo = userStore.getUserInfo;
const menuList = menuStore.getMenuList;
let index = menuList.findIndex(item => item.name === "实验室");
  if (userInfo.roles && userInfo.roles.indexOf("developer") == -1 && index !== -1) {
    menuList.splice(index, 1);
  }
// 默认首页跳转至有权限的菜单下的第一个页面
const firstMenuPath = menuList[0]?.children[0]?.url
if(firstMenuPath){
    router.replace(firstMenuPath)
}
</script>

<style lang="scss" scoped>

</style>