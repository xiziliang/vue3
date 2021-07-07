import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.less'
import  TeleportModal from "./components/Teleport.vue"
import { AsyncComp } from './utils/asyncomp'
import directive from './utils/directive'
import "./assets/js/flexible/index.js"
let app = createApp(App);
directive(app);
app.component('TeleportModal',TeleportModal);
app.component('async-component',AsyncComp);
app.use(store);
app.use(router);
app.mount('#app');
