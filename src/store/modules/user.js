import { login } from '@/api/sys'
import md5 from 'md5'

// 登录操作
export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    login(context, useInfo) {
      const { username, password } = useInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
