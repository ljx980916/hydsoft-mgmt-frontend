<template>
  <!-- 返回上一级 -->
  <div style="height: 5px">
    <img src="@/assets/images/goBack.svg" title="返回上一层" width="24" height="24" class="pointer fixed" @click="returnLast" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const returnLast = () => {
  router.go(-1);
};
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>
