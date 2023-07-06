<template>
  <el-card class="card" shadow="hover">
    <h2>查找书籍</h2>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      "
    >
      <selectOpt
        placeholder="请选择类别"
        title="按类别查找"
        :options="options"
        v-model:get="type"
      ></selectOpt>
      <el-button type="primary" class="search" @click="searchBook"
        >查找</el-button
      >
      <el-table :data="resultBook" border style="width: 100%">
        <el-table-column prop="bookName" label="书籍名称" width="150" />
        <el-table-column prop="bookId" label="书籍编号" width="140" />
        <el-table-column prop="bookAuthor" label="书籍作者" width="150" />
        <el-table-column prop="bookPress" label="书籍作者" width="150" />
        <el-table-column
          prop="bookPublicationDate"
          label="出版时间"
          width="150"
        />
        <el-table-column prop="alive" label="状态" width="100" />
      </el-table>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import selectOpt from "./select.vue";
import { ref, onBeforeMount, getCurrentInstance, reactive } from "vue";
const { proxy } = getCurrentInstance();
const type = ref<string>("");
let options = ref([]);
onBeforeMount(async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    await proxy.$http
      .get(`/booktype/find?token=${token}`)
      .then((res: any) => {
        options.value = res.data.data;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
});
let resultBook: any = reactive([]);
const searchBook = async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    await proxy.$http
      .get(`/book/find?token=${token}&typename=${type.value}`)
      .then((res: any) => {
        res.data.data.forEach((item: any) => {
          resultBook.push(item);
        });
        console.log(resultBook)
        resultBook.forEach((item: any) => {
          item.alive = item.alive ? "可借" : "不可借";
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
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 20px;
  }
  .search {
    width: 150px;
    margin-top: 20px;
  }
}
</style>
