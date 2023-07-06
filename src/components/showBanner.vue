<template>
  <div id="banner-container">
    <div class="content">
      <component class="component" :is="nowComponent"></component>
      <slideBar v-model:get="selectValue"></slideBar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import slideBar from "../components/slideBar.vue";
import addBook from "./addBook.vue";
import addType from "./addType.vue";
import searchBook from "./searchBook.vue";
import allRecord from "./searchAllRecord.vue";
import userRecord from "./userRecord.vue";
import returnBook from "./returnBook.vue";
import lendBook from "./lendBook.vue";
import deleteUser from "./deleteUser.vue";
import searchUser from "./searchUser.vue";
import { ref, watchEffect } from "vue";
import myInput from "./input.vue";
import selectOPT from "./select.vue";
const selectValue = ref<string>();
const nowComponent = ref();
watchEffect(() => {
  if (selectValue.value == "录入新书") {
    nowComponent.value = addBook;
  } else if (selectValue.value == "新建类别") {
    nowComponent.value = addType;
  } else if (selectValue.value == "查询书籍") {
    nowComponent.value = searchBook;
  } else if (selectValue.value == "申请借书") {
    nowComponent.value = lendBook;
  } else if (selectValue.value == "申请还书") {
    nowComponent.value = returnBook;
  } else if (selectValue.value == "查询用户") {
    nowComponent.value = searchUser;
  } else if (selectValue.value == "所有记录") {
    nowComponent.value = allRecord;
  } else if (selectValue.value == "个人记录") {
    nowComponent.value = userRecord;
  } else if (selectValue.value == "删除用户") {
    nowComponent.value = deleteUser;
  }
});
</script>
<style lang="less">
@keyframes scaleIn {
  0% {
    opacity: 0.4;
    transform: translateY(-50%) scale(0.4);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}
#banner-container {
  width: 100%;
  height: 100%;
  background-color: rgba(164, 164, 164, 0.266);
  right: 0;
  bottom: 0;
  .content {
    height: 92%;
    width: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .component {
    animation: scaleIn 1s alternate;
    position: absolute;
    right: 10vw;
    top: 50%;
    transform: translateY(-50%);
    min-width: 600px;
  }
}
@media screen and (max-width: 900px) {
  .component {
    right: 3vw !important;
  }
}
</style>
