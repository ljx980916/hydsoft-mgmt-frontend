<template>
    <div id="userLayout">
      <div class="container">
        <div class="content-box">
          <div class="login-container">
            <div class="login-content">
              <div></div>
              <div class="login-form">
                <!-- <div class="overflow-hidden">
                  <div class="float-right padding-4 pointer" v-if="showLoginRq" @click="showLoginRq=!showLoginRq">
                      <a class="m-r-12 vertical-30 blue">二维码登录</a>
                      <div class="loginImg">
                          <img :src="pwdLogin" alt="" width="50">
                      </div>
                  </div>
                  <div class="float-right padding-4 pointer" v-else @click="showLoginRq=!showLoginRq">
                      <a class="m-r-12 vertical-30 blue">密码登录</a>
                      <div class="loginImg">
                          <img :src="loginRq" alt="" width="50">
                      </div>
                  </div>
                </div> -->
                <h1 class="login-form-title">OMS系统登录</h1>
                <h3 class="login-form-version" :style="{marginBottom: showLoginRq?'50px':'30px'}">V{{ version }}</h3>
                <div class="login-form-container" v-if="showLoginRq">
                    <a-form :model="form" @submit-success="handleSubmitSuccess">
                        <a-form-item field="userName" :hide-label="true" :rules="[{ required: true, message: '请输入账号' }]" :validate-trigger="['change','input']">
                            <a-input
                                size="large"
                                type="text"
                                placeholder="请输入账号"
                                v-model="form.userName"
                            >
                            <template #prefix>
                            <icon-user :style="{ color: 'rgba(0,0,0,.25)' }"/>
                            </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item field="password" :hide-label="true" :rules="[{ required: true, message: '请输入密码' }]" :validate-trigger="['change','input']"> 
                            <a-input-password
                                size="large"
                                placeholder="请输入密码"
                                v-model="form.password"
                            >
                            <template #prefix>
                            <icon-lock :style="{ color: 'rgba(0,0,0,.25)' }"/>
                            </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item :hide-label="true">
                            <a-checkbox v-model="isChecked" style="margin-right: 4px;" />
                            勾选表示您已同意<a-button type="text" @click="showAgreementModal">《用户服务协议》</a-button>
                        </a-form-item>
                        <a-form-item :hide-label="true">
                            <a-button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                class="login-button"
                                :loading="loginBtn"
                                :disabled="!isChecked"
                            >登 录</a-button>
                        </a-form-item>
                    </a-form>
                </div>
                <div v-else>
                    <div class="rqContainer">
                        <div class="rqContent m-b-15">
                            <img :src="bigLoginRq" alt="" width="150" srcset="">
                        </div>
                    </div>
                    <div class="m-b-66 black text-center">
                        请使用微信扫描二维码登录
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mask"></div>
      </div>
    </div>
    <a-modal
        title="OMS用户服务协议"
        v-model:visible="modalVisible"
        :footer="null"
        :width="900"
        :modal-style="{height:'600px',overflowY :'scroll'}"
      >
        <div class="m-b-20">欢迎使用OMS！在使用本OMS前，请仔细阅读以下的《用户服务协议》（以下简称“协议”）。</div>
        <div v-for="(item, i) in modalDt" :key="i" class="m-t-14">
          <div>{{ item.title }}</div>
          <div v-for="(jtem, j) in item.children" :key="i + j">
            {{ jtem }}
          </div>
        </div>
      </a-modal>
  </template>
  
  <script setup>
    import { reactive,ref,onBeforeMount } from 'vue';
    import modalData from '@/utils/data.json';
    import { Notification } from '@arco-design/web-vue';
    import { timeFix,version } from '@/utils/util'
    import { Message } from '@arco-design/web-vue';
    import { useRouter } from 'vue-router'
    import { useUserInfoStore } from '../store/index'
    import { removeWaterMask } from '../utils/watermark'
    const store = useUserInfoStore()
    const logo = require('../assets/images/logo.png')
    const bigImg = require('../assets/images/talent-agent.jpg')
    const pwdLogin = require('../assets/images/pwdLogin.svg')
    const loginRq = require('../assets/images/rq.svg')
    const bigLoginRq = require('../assets/images/loginRq.png')
    const router = useRouter()

    const showLoginRq = ref(true)

    const form = reactive({
        userName : localStorage.getItem('loginUserName') || '',
        password : ''
    })
    const isChecked = ref(localStorage.getItem('checkBox') === '1')
    const loginBtn = ref(false)
    const modalVisible = ref(false)
    const modalDt = ref(JSON.parse(JSON.stringify(modalData)))
    onBeforeMount(()=>{
        removeWaterMask()
    })
    const showAgreementModal = ()=>{
        modalVisible.value = true
    }
    const handleSubmitSuccess = (record)=>{
        loginBtn.value = true
        store.Login(record).then(()=>{
            router.push({ path: '/' });
                // 延迟 1 秒显示欢迎信息
                setTimeout(() => {
                    Notification.success({
                        title: '登录成功',
                        content: `${timeFix()}，欢迎回来`
                    });
                }, 1000);
                localStorage.setItem('checkBox', '1');
        }).catch(err=>{
            Message.error(err || '登陆失败');
        }).finally(()=>{
            loginBtn.value = false;
        })
    }
  </script>
  
  <style lang="scss" scoped>
  #userLayout{
    height: 100vh;
  }
  .container {
    width: 100%;
    min-height: 100%;
    background: url(~@/assets/images/loginBanner.jpg) no-repeat center;
    background-size: cover;
    position: relative;
    .mask{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.45);
    }
    .content-box{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .login-container{
    display: flex;
    justify-content: center;
    .login-content{
      position: relative;
      z-index: 1;
      width: 1005px;
      height: 510px;
      & >  div{
        width: 50%;
        height: 100%;
        display: inline-block;
        box-sizing: border-box;
      }
      & > div:first-child{
        position: absolute;
        left: 0;
        top: 0;
        background: url(~@/assets/images/loginBanner.jpg) no-repeat;
        background-size: cover;
        background-position: 44%;
        background-origin :content-box;
      }
      & > div:last-child{
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .login-form{
      background-color: #F2F2F2;
      padding-top: 40px;
      .loginImg{
          display: inline-block;
          position: relative;
          overflow: hidden;
      }
      .loginImg::after{
          content: '';
          position: absolute;
          left: -20px;
          top: 20px;
          width: 40px;
          height: 50px;
          transform: rotate(45deg);
          background-color: #F2F2F2;
      }
      .login-form-title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        text-align: center;
        font-size: 22px;
      }
      .login-form-version{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
      }
      .login-form-container{
        padding: 0 42px;
      }
      .login-button {
        width: 100%;
      }
      
    }
    .rqContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        .rqContent{
            padding: 24px;
            background: #fff;
            border: 1px solid #CCCCCC;
        }
    }
  }
    :deep(.ant-modal-body) {
      height: 600px !important;
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
    .overflow-hidden{
        overflow: hidden;
    }
    .float-right{
        float: right;
    }
    .vertical-30{
        vertical-align: 30px;
    }
    .padding-4{
        padding: 4px;
    }
    .blue {
        color: #1890FF;
    }
    .black{
        color: #333;
    }
    .text-center{
      text-align: center;
    }
    .m-b-15{
        margin-bottom: 15px;
    }
    .m-b-66{
        margin-bottom: 66px;
    }
  </style>
  