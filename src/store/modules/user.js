import { login } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import md5 from 'md5'
import TOKEN from '@/constant'

// 登录操作
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    login(context, useInfo) {
      const { username, password } = useInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          context.commit('user/setToken', data.data.data.token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
