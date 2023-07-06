<template>
  <div id="index-container">
    <navBar></navBar>
    <banner v-model:get="flag"></banner>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import banner from "../components/showBanner.vue";
import { ElMessageBox } from "element-plus";
import navBar from "../components/navBar.vue";
const flag = ref<string>("");
if (window.localStorage.getItem("isLogin")) {
  ElMessageBox({
    title: "提示信息",
    type: "success",
    message: "登录成功,欢迎使用图书管理系统！",
  });
  window.localStorage.removeItem("isLogin");
}
</script>
<style lang="less" scoped>
#index-container {
  display: block;
  height: 100%;
}
</style>
