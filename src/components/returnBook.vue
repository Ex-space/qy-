<template>
  <el-card class="card" shadow="hover">
    <h2>还书申请</h2>
    <myInput
      placeholder="请输入书籍ID"
      title="书籍ID"
      v-model:get="bookId"
    ></myInput>
    <el-button
      type="primary"
      style="margin-top: 20px; margin-bottom: 10px; width: 150px"
      @click="lendBook"
      >申请还书</el-button
    >
  </el-card>
</template>

<script lang="ts" setup>
import myInput from "./input.vue";
import { ElMessage,ElMessageBox } from "element-plus";
import { getCurrentInstance, ref } from "vue";
const bookId = ref("");
const { proxy } = getCurrentInstance();
const lendBook = async () => {
    if (bookId.value) {
    ElMessageBox.confirm("确定要归还该书籍吗?", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        const token = window.localStorage.getItem("token");
        if (token) {
          await proxy.$http
            .post(
              `/book/return`,
              {
                token: token,
                bookid: bookId.value,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res: any) => {
              if (res.data.code == 1) {
                ElMessage({
                  message: "还书成功!",
                  type: "success",
                });
              } else if (res.data.code == 2) {
                ElMessage({
                  message: "您未借阅过此书!",
                  type: "error",
                });
              } else {
                ElMessage({
                  message: "该书不存在!",
                  type: "error",
                });
              }
            })
            .catch((err: any) => {
              console.error(err);
            });
        } else {
          ElMessage({
            message: "登录信息过期!",
            type: "error",
          });
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消申请",
        });
      });
  } else {
    ElMessage({
      message: "请填写还书信息!",
      type: "warning",
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
    margin-bottom: 20px;
  }
}
</style>
