<template>
  <el-card class="card" shadow="hover">
    <h2>所有借书记录</h2>
    <myInput
      placeholder="请输入要查找的书籍名称"
      title="书籍名称"
      v-model:get="bookName"
      style="margin-bottom: 20px"
    ></myInput>
    <el-button
      type="primary"
      style="margin-bottom: 20px; width: 150px"
      @click="searchRecord"
      >查询</el-button
    >
    <el-table :data="resultBook" border style="width: 100%" v-if="flag">
      <el-table-column prop="userId" label="用户ID" width="100" />
      <el-table-column prop="userName" label="用户名称" width="150" />
      <el-table-column prop="logDate" label="更改日期" width="150" />
      <el-table-column prop="type" label="类型" width="150" />
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";
import myInput from "./input.vue";
import SearchBook from "./searchBook.vue";
let resultBook: any = reactive([]);
const { proxy } = getCurrentInstance();
const bookName = ref<string>("");
const flag = ref<boolean>(false);
const searchRecord = async () => {
  const token = window.localStorage.getItem("token");
  flag.value = true;
  if (token) {
    await proxy.$http
      .get(`/book/bookhistory?token=${token}&bookname=${bookName.value}`)
      .then((res: any) => {
        res.data.data.forEach((item: any) => {
          resultBook.push(item);
        });
        res.data.data.forEach((item: any) => {
          item.type = item.type == 1 ? "借出" : "已还";
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
};
</script>
<style lang="less">
.el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
