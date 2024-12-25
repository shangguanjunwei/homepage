import { createApp } from 'vue'
import App from './App.vue'
// fontawesome 图标组件库地址：https://fontawesome.com/v4/icons/
import "font-awesome/css/font-awesome.min.css"
import router from "@/routers/index";
import "@/styles/common.less"

createApp(App)
  .use(router)
  .mount('#app')
