import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router/index";

const app = createApp(App);
// const pinia = createPinia();
app.use(ElementPlus).use(router).mount("#app");
