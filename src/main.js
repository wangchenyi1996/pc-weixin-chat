import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置样式
import './static/css/reset.css'

// 引入 font.css
import './assets/fonts/iconfont.css';

// 引入 element-ui
import '@/elementui/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
