<script setup lang="ts">
import { routerKey } from "vue-router";
const key = Math.random();
</script>

<template>
  <div id="app-container">
    <router-view :key:any="key"></router-view>
  </div>
</template>

<style lang="less">
#app-container {
  display: block;
  width: 100%;
  height: 100%;
}
#app {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
