<template>
  <el-card class="card" shadow="hover">
    <h2>新建类别</h2>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      "
    >
      <myInput
        placeholder="请填入类别"
        title="类别"
        v-model:get="type"
      ></myInput>
      <el-button type="primary" @click="addType">添加类别</el-button>
    </div>
    <el-table
      class="table"
      ref="typeTable"
      :data="tableData"
      lazy
      border
      style="width: 100%"
    >
      <el-table-column prop="typeNum" label="类型编号" width="200" />
      <el-table-column prop="typeName" label="类型名称" width="200" />
      <el-table-column type="index" align="center" label="操作" width="225">
        <template v-slot="scope">
          <el-button
            class="btn"
            link
            type="primary"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            class="btn"
            link
            type="primary"
            @click="handlePut(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import myInput from "./input.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, onBeforeMount, getCurrentInstance, reactive } from "vue";
const number = ref("");
const type = ref("");
let tableData: any = reactive([]);
const token = window.localStorage.getItem("token");
const { ctx, proxy } = getCurrentInstance();
const _this = ctx;
const addType = async () => {
  if (token) {
    await proxy.$http
      .post(
        `/booktype/add`,
        {
          typename: type.value,
          token: token,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async (res: any) => {
        if (res.data.code == 1) {
          ElMessage({
            message: "添加类型成功!",
            type: "success",
          });
          if (token) {
            await proxy.$http
              .get(
                `/booktype/find?token=${token}`,
                {},
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((res: any) => {
                tableData.forEach((item: any, index: number) => {
                  tableData.pop();
                });
                res.data.data.forEach((item: any) => {
                  tableData.push(item);
                });
              })
              .catch((err: any) => {
                console.error(err);
              });
          }
        } else {
          ElMessage({
            message: "该类型已存在!",
            type: "error",
          });
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
};
onBeforeMount(async () => {
  if (token) {
    await proxy.$http
      .get(
        `/booktype/find?token=${token}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res: any) => {
        res.data.data.forEach((item: any) => {
          tableData.push(item);
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
});
const handleDelete = async (row: any) => {
  if (token) {
    console.log(1);

    await proxy.$http
      .post(
        `/booktype/delete`,
        {
          token: token,
          typename: row.typeName,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async (res: any) => {
        if (token) {
          console.log(res);

          if (res.data.code == 1) {
            ElMessage({
              type: "success",
              message: "删除成功!",
            });
            await proxy.$http
              .get(
                `/booktype/find?token=${token}`,
                {},
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((response: any) => {
                tableData.forEach((item: any, index: number) => {
                  tableData.pop();
                });
                tableData.pop();
                response.data.data.forEach((item: any) => {
                  tableData.push(item);
                });
              })
              .catch((err: any) => {
                console.error(err);
              });
          } else if (res.data.code == 2) {
            ElMessage({
              type: "error",
              message: "该类型不存在!",
            });
          } else {
            ElMessage({
              type: "error",
              message: "您没有权限删除类型!",
            });
          }
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
};
const handlePut = async (row: any) => {
  ElMessageBox.prompt("请输入修改后的新类型:", "提示信息", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(async ({ value }) => {
      if (token) {
        await proxy.$http
          .post(
            `/booktype/change`,
            {
              token: token,
              oldtypename: row.typeName,
              newtypename: value,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(async (res: any) => {
            if (token) {
              if (res.data.code == 1) {
                ElMessage({
                  type: "success",
                  message: "修改成功!",
                });
                await proxy.$http
                  .get(
                    `/booktype/find?token=${token}`,
                    {},
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  )
                  .then((response: any) => {
                    tableData.forEach((item: any, index: number) => {
                      tableData.pop();
                    });
                    tableData.pop();
                    response.data.data.forEach((item: any) => {
                      tableData.push(item);
                    });
                  })
                  .catch((err: any) => {
                    console.error(err);
                  });
              } else if (res.data.code == 2) {
                ElMessage({
                  type: "error",
                  message: "目标类别已存在!",
                });
              } else {
                ElMessage({
                  type: "error",
                  message: "您没有权限修改类型!",
                });
              }
            }
          })
          .catch((err: any) => {
            console.error(err);
          });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消修改",
      });
    });
};
</script>
<style lang="less">
.table {
  margin-top: 20px;
  h2 {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .btn:focus {
    outline: none;
  }
}
</style>
