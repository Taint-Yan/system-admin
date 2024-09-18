import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import md5 from 'md5'
import { TOKEN } from '@/constant'
import router from '@/router'

// 登录操作
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          this.commit('user/setToken', data.token)
          // 登录成功跳转到首页
          router.push('/')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    }
  }
}
