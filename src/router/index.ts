import { createRouter, createWebHistory } from "vue-router";

const routes: any = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/login.vue"),
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // 判断有没有登录
  console.log(!window.localStorage.getItem("token"));

  if (!window.localStorage.getItem("token")) {
    if (to.href == "/login") {
      next();
    } else {
      router.push("login");
    }
  } else {
    next();
  }
});
export default router;
