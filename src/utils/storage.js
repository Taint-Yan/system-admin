/**
 * @description: 本地存储
 * 存储数据
 */

export const setItem = (key, value) => {
  // value 分为两种情况：
  // 1.基本数据类型
  // 2.复杂数据类型
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
  const data = window.localStorage.getItem(key)
  try {
    // 尝试将value转换为json对象
    return JSON.parse(data)
  } catch (error) {
    // 如果转换失败则直接返回
    return data
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
