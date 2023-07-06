<template>
  <div id="slideBar-container">
    <div id="all" v-for="(item, index) in slideContent">
      <div
        class="main"
        @click="changeVisible(index)"
        :style="'animation-delay:' + (index * 0.2 + 1) + 's;'"
      >
        {{ item.main }}
      </div>
      <div
        class="inside"
        v-for="i in item.inside"
        v-if="item.openFlag"
        :class="i.value == nowComponent ? 'active' : ''"
        @click="selectBanner(i)"
      >
        {{ i.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
  watchEffect,
} from "vue";
const props = defineProps({
  flag: {
    type: String,
  },
});
const emit = defineEmits(["update:get"]);
let nowComponent = ref<string>("录入新书");
const selectBanner = (i: any) => {
  nowComponent.value = i.value;
  emit("update:get", i.value);
};
const { proxy } = getCurrentInstance();
let slideContent = reactive([
  {
    main: "书籍管理",
    openFlag: false,
    inside: [
      ref("录入新书"),
      ref("新建类别"),
      ref("查询书籍"),
      ref("申请借书"),
      ref("申请还书"),
    ],
  },
  {
    main: "借阅信息",
    openFlag: false,
    inside: [ref("所有记录"), ref("个人记录")],
  },
  {
    main: "用户管理",
    openFlag: false,
    inside: [ref("查询用户"), ref("删除用户")],
  },
]);
onBeforeMount(async () => {
  const auth = window.localStorage.getItem("auth");
  const token = window.localStorage.getItem("token");
  if (token) {
    if (auth == "0") {
      slideContent[0].inside.shift();
      slideContent[0].inside.shift();
      slideContent.pop();
      slideContent[1].inside.shift();
      selectBanner(ref<string>("查询书籍"));
    } else {
      selectBanner(ref<string>("录入新书"));
    }
  }
});
const changeVisible = (index: number) => {
  slideContent[index].openFlag = !slideContent[index].openFlag;
};
</script>
<style lang="less" scoped>
@keyframes slideIn {
  0% {
    width: 150px;
  }
  100% {
    width: 13%;
  }
}
@keyframes heightIn {
  0% {
    height: 0;
  }
  100% {
    width: 30px;
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
@keyframes goTopIn {
  0% {
    opacity: 0.4;
    transform: translateY(400px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.active {
  background-color: #409eff !important;
}
#slideBar-container {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

  z-index: 80;
  animation: slideIn 1s alternate;
  background-color: #878fa5;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  // padding-top: 3.8%;
  width: 13%;
  min-width: 150px;
  #all {
    animation: fadeIn 1s alternate;
    white-space: nowrap;
    width: 100%;
    .main,
    .inside {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .main {
      animation: goTopIn 1s alternate ease-in-out forwards;
      opacity: 0;
      font-weight: 600;
      cursor: pointer;
      height: 40px;
      font-size: 16px;
      // border: 1px solid #ccc;
      background-color: #525a6e;
      color: white;
      // box-shadow: -2px 0px 1px 0px #949494;
    }
    .main:hover {
      background-color: rgb(125, 125, 125);
    }
    .inside {
      font-size: 13px;
      // animation: heightIn 1s alternate;
      cursor: pointer;
      height: 30px;
      background-color: #3e3650;
      color: white;
    }
    .inside:hover {
      background-color: #000000;
    }
  }
}
</style>
