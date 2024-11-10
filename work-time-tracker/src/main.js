import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import router from './router'; // 引入 router 配置
import 'element-plus/dist/index.css'; // 引入Element Plus样式
import locale from 'element-plus/dist/locale/zh-cn.js'; // 引入中文语言包
import tools from './tool/tools'

const app = createApp(App);

// 在根组件中提供全局工具
app.provide('tools', tools);

const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus, { locale }); // 设置中文
app.use(router);

app.mount('#app');
