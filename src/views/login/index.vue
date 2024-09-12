<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <!-- 登录标题 -->
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- userName -->
      <el-form-item prop="userName">
        <span class="svg-container">
          <!-- <el-icon>
            <Avatar />
          </el-icon> -->
          <!-- <SvgIcon icon="https://res.lgdsunday.club/user.svg" /> -->
          <svg-icon icon="user" />
        </span>
        <el-input
          v-model="loginForm.userName"
          name="userName"
          placeholder="请输入用户名"
          type="text"
        ></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <el-icon> <Avatar /></el-icon> -->
          <svg-icon icon="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          placeholder="请输入密码"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <el-icon>
            <!-- <Avatar /> -->
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </el-icon>
        </span>
      </el-form-item>
      <!--登录按钮 -->
      <el-button
        type="primary"
        :loading="loading"
        @click="handleLogin"
        style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules'
// import SvgIcon from '@/components/SvgIcon/index.vue'
// import { Avatar } from '@element-plus/icons'
// 登录用户名密码
const loginForm = ref({
  userName: 'super-admin',
  password: '123456'
})
// 登录验证规则
const loginRules = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
}
// 密码显示隐藏
const passwordType = ref('password')
// 点击图标密码显示隐藏
const onChangePwdType = () => {
  // passwordType的值为password时，改为text，否则改为password
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录按钮
const loading = ref(false)
const loginFromRef = ref(null)
const store = useStore()

const handleLogin = () => {
  loginFromRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // TODO: 登录成功后的操作
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  width: 100%;
  min-height: 100%;
  background-image: url('../../../public/home.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: fill;
  overflow: hidden;
  position: absolute;
  // .login-container-one {
  //   position: absolute;
  //   inset: 0;
  // background: linear-gradient(to right, rgb(25, 25, 27), rgb(56, 52, 53));
  // }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 0px 35px;
    margin: 0 auto;
    overflow: hidden;
    background: $bg;
    // background: transparent;
    opacity: 0.9;
    transform: translate(0, 50%); //垂直居中

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      padding-top: 30px;
      box-sizing: border-box;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
