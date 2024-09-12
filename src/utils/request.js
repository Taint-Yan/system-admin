import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

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
      ElMessage.Error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  error => {
    // 返回错误信息
    ElMessage.Error(error.message)
    return Promise.reject(error)
  }
)

export default service
