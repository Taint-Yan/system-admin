import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import md5 from 'md5'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { icode, time } = getTestICode()
    // 添加请求头
    config.headers.icode = icode
    config.headers.codeType = time
    // 同意注入 token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  response => {
    const { success, message, data } = response.data
    // 判断请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败则返回错误信息
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  error => {
    // 返回错误信息
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

/**
 * 返回 Icode 的实现
 */
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991-12-30'
  return {
    icode: md5(code),
    time: now
  }
}

export default service
