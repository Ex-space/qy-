<template>
  <div id="nav-conatiner">
    <span v-if="userName">欢迎您,尊敬的{{ userName }}</span>
    <div :class="auth == '1' ? 'authTag' : 'tag'" v-if="auth">
      权限级别：{{ auth == "1" ? "管理员" : "用户" }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const userName = window.localStorage.getItem("userName");
const auth = window.localStorage.getItem("auth");
</script>
<style lang="less" scoped>
@keyframes heightIn {
  0% {
    height: 0;
  }
  100% {
    height: 55px;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#nav-conatiner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  animation: heightIn 1s alternate;
  width: 100%;
  height: 8%;
  backdrop-filter: blur(4px);
  background-color: #393939;
  display: flex;
  justify-content: end;
  align-items: center;
  span {
    animation: fadeIn 1s alternate;
    margin-right: 15px;
    font-size: 18px;
    font-weight: bold;
    color: aliceblue;
  }
  .tag {
    display: grid;
    place-content: center;
    background-color: #40a0ff54;
    padding: 3px 10px;
    color: rgb(239, 239, 239);
    font-weight: bold;
    font-size: 13px;
    border-radius: 4px;
    margin-right: 10px;
    border: 2px solid #409eff;
  }
  .authTag {
    display: grid;
    place-content: center;
    background-color: rgba(255, 166, 0, 0.341);
    padding: 3px 10px;
    color: rgb(255, 187, 0);
    font-weight: bold;
    border-radius: 4px;
    font-size: 13px;
    margin-right: 10px;
    border: 2px solid orange;
  }
}
</style>
