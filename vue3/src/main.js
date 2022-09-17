import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Components from './components';

const app = createApp(App);
app.use(ElementPlus).use(store).use(router).use(Components).mount('#app');


