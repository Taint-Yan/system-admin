// Desc: Vuex Store Getters
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  // 如果获取为 true 表示存在用户信息
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}

export default getters
