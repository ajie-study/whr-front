<template>
  <!-- 登录组件 -->
  <div class="login">
    <el-form :model="loginForm">
      <h1>用户登录</h1>
      <el-form-item label="用户名" label-width="80px">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" label-width="80px" class="code">
        <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
        <img :src="verifyCodeUrl" alt="验证码" @click="updateCode()" />
      </el-form-item>
      <el-button type="success">登录</el-button>
      <el-button type="info" @click="resetFrom">重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单
      loginForm: {
        username: '',
        password: '',
        // 验证码
        code: ''
      },
      verifyCodeUrl: ''
    }
  },
  methods: {
    // 重置表单
    resetFrom () {

    },
    // 修改验证码
    updateCode () {
      // 加上时间戳，防止缓存
      this.verifyCodeUrl = this.$axios.defaults.baseURL + 'verifyCode/' + new Date()
    }
  },
  created () {
    this.updateCode()
  }

}
</script>

<style lang="scss" scoped>
.login {
  // fixed: 背景图片不会随着页面的滚动而滚动
  background: url("../assets/login.jpg") no-repeat fixed;
  height: 100%;
  // 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
  background-size: cover;
  // 内容会被修剪，并且其余内容是不可见的。
  overflow: hidden;
  .el-form {
    border: 1px solid #fff;
    background: rgba(0, 0, 0, 0.3);
    width: 400px;
    padding: 40px 45px 15px;
    border-radius: 10px;
    margin: 150px auto;
    color: #fff;
    ::v-deep.el-form-item__label {
      position: relative;
      color: #fff;
      font-size: 16px;
    }
    h1 {
      padding-bottom: 40px;
      text-align: center;
    }
    .code {
      width: 260px;
    }
  }

  .el-button {
    margin-left: 80px;
  }

  img {
    position: absolute;
    right: -40px;
    transform: translate(100%, -50%);
    top: 50%;
    cursor: pointer;
  }
}
</style>
