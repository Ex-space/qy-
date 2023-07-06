<template>
  <div id="input-container">
    <h3>{{ props.title }}:</h3>
    <el-date-picker
      v-model="inputValue"
      type="date"
      :placeholder="placeholder"
      @input="getValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
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
});
let inputValue = ref<string>("");
watchEffect(() => {
  inputValue.value = props.inputValue!;
});
const emit = defineEmits(["update:get"]);
const getValue = () => {
  emit("update:get", inputValue.value);
};
</script>
<style lang="less">
#input-container {
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
  .el-ipt {
    width: 400px;
  }
}
</style>
