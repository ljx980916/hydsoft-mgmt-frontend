import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
//import "@/assets/styles/main.css";
import'./assets/styles/pubilc.css'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
//import '@arco-design/web-vue/dist/arco.css';
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'//引入pinia数据持久化插件
import '@arco-themes/vue-phone-shop/index.less'
import './permission'
import mitt from "mitt"
import vue3TreeOrg from 'vue3-tree-org';
import "vue3-tree-org/lib/vue3-tree-org.css";
window.joint = require('jointjs');
import { saveTokenCookie } from '@/utils/util.js'
const $bus = {}
const emitter = mitt()
$bus.on = emitter.on
$bus.emit = emitter.emit
$bus.off = emitter.off
// saveTokenCookie('66087058-29b7-48a8-a4af-605decaf4db7')
const pinia = createPinia()
pinia.use(piniaPluginPersist)
let app = createApp(App)
app.use(ArcoVue)
app.use(pinia)
app.use(ArcoVueIcon)
app.use(router)
app.use(vue3TreeOrg)
app.mount('#app')
app.config.globalProperties.$bus = $bus
