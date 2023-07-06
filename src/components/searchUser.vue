<template>
  <el-card class="card" shadow="hover">
    <h2>查询用户信息</h2>
    <el-table :data="resultUser" border style="width: 100%">
      <el-table-column prop="userId" label="用户ID" width="150" />
      <el-table-column prop="userName" label="用户名称" width="150" />
      <el-table-column prop="permission" label="权限" width="100" />
      <el-table-column prop="idCard" label="学生卡号" width="225" />
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
let resultUser: any = reactive([]);
const { proxy } = getCurrentInstance();
onBeforeMount(async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    await proxy.$http
      .get(`/user/find?token=${token}`)
      .then((res: any) => {
        
        res.data.data.forEach((item: any) => {
          resultUser.push(item);
        });
        resultUser.forEach((item: any) => {
          item.permission = item.permission ? "管理员" : "用户";
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
