import router from '@/router'
import store from './store'

/**
 * @description: 路由守卫
 * @param {Object} to 要进入的目标路由对象
 * @param {Object} from 离开的路由对象
 * @param {Function} next 用来 resolve 这个钩子。一定要调用该方法来返回
 */
// 白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 获取token
  if (store.getters.token) {
    // 用户已登录，则不允许进入登录页面
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 用户未登录，则只能进入登录页面
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
