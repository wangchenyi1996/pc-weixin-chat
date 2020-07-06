import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
// 共三个页面： 聊天页面，好友页面，个人简历分别对应一下路由
  routes: [
    {
      path: '/',
      redirect: '/chat'
    },
    {
      path: '/chat',
      component: () => import('@/page/chat/chat.vue')
    },
    {
      path: '/friend',
      component: () => import('@/page/friend/friend.vue')
    },
    {
      path: '/my',
      component: () => import('@/page/resume/resume.vue')
    },
    {
      path: '/myfile',
      component: () => import('@/page/myfile/myfile.vue')
    },
  ],
  linkActiveClass: 'active'
})

export default router