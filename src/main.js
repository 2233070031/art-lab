import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import 'element-plus/dist/index.css'
import '@/router/permission'
import * as ELIcons from '@element-plus/icons-vue'
import i18n from '@/i18n'

import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

// 自己项目的重置样式和公用样式
import '@/styles/common.css'

const app = createApp(App)
// for (const iconName in ELIcons) {
//   app.component(iconName, ELIcons[iconName])
// }
for (const [key, component] of Object.entries(ELIcons)) {
  app.component(key, component)
}

app.use(ArcoVue)

SvgIcon(app)
app.use(store).use(router).use(i18n).mount('#app')
