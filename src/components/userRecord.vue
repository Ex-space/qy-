<template>
  <el-card class="card" shadow="hover">
    <h2>个人借书记录</h2>
    <el-table :data="resultBook" border style="width: 100%">
      <el-table-column prop="bookId" label="书籍ID" width="100" />
      <el-table-column prop="bookName" label="书籍名称" width="150" />
      <el-table-column prop="logDate" label="更改日期" width="150" />
      <el-table-column prop="type" label="类型" width="150" />
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
let resultBook: any = reactive([]);
const { proxy } = getCurrentInstance();
onBeforeMount(async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    console.log(token);

    await proxy.$http
      .get(`/book/userhistory?token=${token}`)
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
});
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
