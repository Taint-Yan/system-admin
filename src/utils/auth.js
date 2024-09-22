import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  return setItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export function isCheckTimeOut() {
  // 获取当前时间戳
  const currentTime = Date.now()
  // 获取本地存储的时间戳
  const timeStamp = getTimeStamp()
  //   根据当前时间对比登录时间，看是否超过了时效时
  // 1. 如果未超过，则正常进行后续操作
  // 2. 如果超过，则进行退出登录操作
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
