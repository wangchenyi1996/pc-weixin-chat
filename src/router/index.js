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
      component: () => import('@/page/chat/chat.vue'),
      meta: {
        keepAlive: true, // true :缓存  false :不缓存
        isBack: false, //用于判断上一个页面是哪个
        isShowAside: true
      }
    },
    {
      path: '/friend',
      component: () => import('@/page/friend/friend.vue'),
       meta: {
        keepAlive: true, // true :缓存  false :不缓存
        isBack: false, //用于判断上一个页面是哪个
        isShowAside: true
      }
    },
    {
      path: '/my',
      component: () => import('@/page/resume/resume.vue'),
       meta: {
        keepAlive: true, // true :缓存  false :不缓存
        isBack: false, //用于判断上一个页面是哪个
        isShowAside: true
      }
    },
    {
      path: '/myfile',
      component: () => import('@/page/myfile/myfile.vue'),
       meta: {
        keepAlive: true, // true :缓存  false :不缓存
        isBack: false, //用于判断上一个页面是哪个
        isShowAside: true
      }
    },
    {
      path: '/login',
      component: () => import('@/page/login/login.vue'),
      meta: {
        keepAlive: true, // true :缓存  false :不缓存
        isBack: false, //用于判断上一个页面是哪个
        isShowAside: false
      }
    },
  ],
  linkActiveClass: 'active'
})

export default router