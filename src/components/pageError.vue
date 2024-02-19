<template>
  <div>
    <div class="img-container">
      <img :src="img">
      <span>管理驾驶舱获取用户角色失败，请联系管理员</span>
      <a-button type="primary" @click="handleRefresh">刷新</a-button>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/images/error.png'
import { useMenuStore } from "../store/index";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
const router = useRouter();
let menuStore = useMenuStore();
//刷新
const handleRefresh = () => {
  let resArr = menuStore.menuSideBar();
  resArr.then(res=>{
      if(res.code =="000000000000"){
          const menuList = res.data.menuList
          // 默认首页跳转至有权限的菜单下的第一个页面
          const firstMenuPath = menuList[0]?.children[0]?.url;
          if(firstMenuPath){
              router.replace(firstMenuPath)
          }
      }else{
          Message.error(res.message)
      }
  }).catch(err=>{
      Message.error(err)
  })
}
</script>

<style lang="scss" scoped>
  .img-container {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    text-align: center;
    display: flex;
    align-items: center;  
    flex-direction: column;
    & > span {
      font-weight: 550;
      color: #646566;
      margin-bottom: 60px;
      font-size:24px;
      font-style: normal;
      font-family: 'PingFangSC-Regular', 'PingFang SC';
      margin-top:80px;
      line-height: 28px;
    }
  }
</style>