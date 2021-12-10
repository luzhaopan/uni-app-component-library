
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import * as echarts  from 'echarts'
Vue.prototype.$echarts = echarts

//注册echarts 主题
import customed from '@/components/charts/theme/customed.js'
echarts.registerTheme('customed',customed)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif