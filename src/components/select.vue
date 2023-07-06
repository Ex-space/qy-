<template>
  <div id="opt-container">
    <h3>{{ props.title }}:</h3>
    <el-select
      v-model="value"
      ref="inopt"
      class="el-opt"
      clearable
      :placeholder="props.placeholder"
      filterable
    >
      <el-option
        v-for="item in props.options"
        :key="item.typeNum"
        :label="item.typeName"
        :value="item.typeName"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import {
  getCurrentInstance,
  onMounted,
  onBeforeMount,
  ref,
  watchEffect,
} from "vue";
const props = defineProps({
  placeholder: {
    type: String,
  },
  title: {
    type: String,
  },
  inputValue: {
    type: String,
  },
  options: {
    type: Array,
  },
});
const { proxy } = getCurrentInstance();
const value = ref<string>("");
let options = ref([]);
const emit = defineEmits(["update:get"]);
const token = window.localStorage.getItem("token");
watchEffect(() => {
  emit("update:get", value.value);
});
</script>
<style lang="less">
#opt-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  width: 500px;
  h3 {
    transform: translateY(-2px);
    flex-shrink: 0;
    margin-right: 10px;
  }
  .el-opt {
    width: 250px;
    margin-right: 150px;
  }
}
</style>
