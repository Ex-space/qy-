<template>
  <el-card class="card" shadow="hover">
    <h2>添加新书</h2>
    <myInput
      placeholder="请填入书名"
      title="书名"
      v-model:get="bookName"
    ></myInput>
    <myInput
      placeholder="请填入作者"
      title="作者"
      v-model:get="author"
    ></myInput>
    <myInput
      placeholder="请填入出版社"
      title="出版社"
      v-model:get="publish"
    ></myInput>
    <selectOPT
      placeholder="请选择类别"
      title="类别"
      :options="options"
      v-model:get="type"
    ></selectOPT>
    <div class="time">
      <h3>出版日期:</h3>
      <el-date-picker
        class="picker"
        v-model="date"
        format="YYYY/MM/DD"
        type="date"
        placeholder="选择出版日期"
      />
    </div>
    <el-button class="addbtn" @click="addBook" type="primary"
      >确认添加</el-button
    >
  </el-card>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, onBeforeMount } from "vue";
import myInput from "./input.vue";
import { ElMessage, ElMessageBox } from "element-plus";

import selectOPT from "./select.vue";
import { dataType } from "element-plus/es/components/table-v2/src/common.js";
const bookName = ref<string>("");
const author = ref<string>("");
const publish = ref<string>("");
const type = ref<string>("");
const date = ref<string>("");
const { proxy } = getCurrentInstance();
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
const addBook = () => {
  if (bookName.value && author.value && publish.value && type.value && date.value) {
    ElMessageBox.confirm("确定要添加该书籍吗?", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
          var datestr = new Date(date.value);
          var year = datestr.getFullYear();
          var month =
            datestr.getMonth() + 1 > 9
              ? datestr.getMonth() + 1
              : "0" + (datestr.getMonth() + 1);
          var day =
            datestr.getDate() > 9 ? datestr.getDate() : "0" + datestr.getDate();

          let dt = year + "/" + month + "/" + day;

          proxy.$http
            .post(
              "/book/add",
              {
                token: token,
                name: bookName.value,
                type: encodeURIComponent(type.value),
                writer: author.value,
                date: dt,
                press: publish.value,
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
                  type: "success",
                  message: "添加成功!",
                });
              } else {
                ElMessage({
                  type: "error",
                  message: "添加失败,您没有权限!",
                });
              }
            })
            .catch((err: any) => {
              console.log(err);
            });
        } else {
          ElMessage.error("登录信息过期,请重新登录！");
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消添加",
        });
      });
  } else {
    ElMessage({
      type: "error",
      message: "请完善表单信息!",
    });
  }
};
</script>
<style lang="less">
.el-card__body,
.card {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: auto;
  width: 65%;
  
}
h2 {
  margin: 0 auto 10px;
  font-size: 30px;
}
.addbtn {
  margin-top: 20px;
  width: 150px;
  margin-left: 50%;
  transform: translate(-100%);
}
.time {
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.picker {
  width: 200px;
  margin-right: 180px;
}
</style>
