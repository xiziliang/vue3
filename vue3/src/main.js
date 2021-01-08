import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  TeleportModal from "./components/Teleport.vue"
import { AsyncComp } from './utils/asyncomp'

let app = createApp(App);
app.component('TeleportModal',TeleportModal);
app.component('async-component',AsyncComp);
app.use(store);
app.use(router);
app.mount('#app');
