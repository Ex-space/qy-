import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router/index";
import axios from "axios";
const app = createApp(App);
axios.defaults.baseURL = "http://112.124.10.96:8080";
//在Vue的原型对象上挂载axios方法
// const pinia = createPinia();
app.config.globalProperties.$http = axios;
app.use(ElementPlus).use(router).mount("#app");
