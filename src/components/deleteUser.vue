<template>
  <el-card class="card" shadow="hover">
    <h2>删除用户</h2>
    <myInput
      placeholder="请输入用户ID"
      title="用户ID"
      v-model:get="userId"
    ></myInput>
    <el-button
      type="primary"
      style="margin-top: 20px; margin-bottom: 10px; width: 150px"
      @click="deleteUser"
      >删除用户</el-button
    >
  </el-card>
</template>

<script lang="ts" setup>
import myInput from "./input.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getCurrentInstance, ref } from "vue";
const userId = ref("");
const { proxy } = getCurrentInstance();
const deleteUser = async () => {
  if (userId.value) {
    ElMessageBox.confirm(
      "确定删除该用户吗?",
      // "Warning",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(async () => {
        const token = window.localStorage.getItem("token");
        if (token) {
          await proxy.$http
            .post(
              `/user/delete`,
              {
                token: token,
                userid: userId.value,
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
                  message: "删除成功!",
                  type: "success",
                });
              } else if (res.data.code == 2) {
                ElMessage({
                  message: "该用户不存在，删除用户失败!",
                  type: "error",
                });
              } else {
                ElMessage({
                  message: "您没有权限删除此用户!",
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
          message: "已取消删除",
        });
      });
  } else {
    ElMessage({
      type: "warning",
      message: "请填入用户ID",
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
