/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-06 09:19:13
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-16 09:05:00
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 全局样式
import '@/common/global.css'

// 重置样式
import './static/css/reset.css'

// 引入 font.css
import './assets/fonts/iconfont.css';

// 引入 element-ui
import '@/elementui/index.js'

// socket
import io from '@/assets/socket/socket.io.js'
Vue.prototype.socket = io('http://localhost:8888')
// console.log(Vue.prototype.socket)


// import Router from 'vue-router'
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
