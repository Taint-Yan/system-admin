/**
 * @description: 本地存储
 * 存储数据
 */

export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为json字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * @description: 存储数据
 * 获取数据
 */

export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    // 尝试将value转换为json对象
    return JSON.parse(value)
  } catch (error) {
    // 如果转换失败则直接返回
    return value
  }
}

/**
 * @description: 本地存储
 * 删除数据
 */

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * @description: 本地存储
 * 删除所有数据
 */

export const removeAllItem = () => {
  window.localStorage.clear()
}
