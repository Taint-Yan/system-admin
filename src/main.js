import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 引入全局样式
import './styles/index.scss'
import installIcons from '@/icons' // 导入svgIcon
import './permission' // 导入权限控制

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store).use(router).mount('#app')
