<template>
  <!-- 登录组件 -->
  <div class="login">
    <!--
      model: 绑定的数据对象
      :rules: 对数据进行检验，配合prop使用
    -->
    <el-form :model="loginForm" :rules="rules" label-width="80px" status-icon ref="form">
      <h1>用户登录</h1>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" class="code" prop="code">
        <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
        <img :src="verifyCodeUrl" alt="验证码" @click="updateCode()" />
      </el-form-item>
      <el-button type="success" @click="login">登录</el-button>
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
      verifyCodeUrl: '',
      // 校验
      rules: {
        // blur 当文本框获得焦点后，没有输入任何内容触发
        // change 当文本框获得焦点后，输入任何内容触发
        username: [
          { required: true, message: '用户名不能为空', trigger: ['change', 'blur'] },
          { min: 4, max: 10, message: '用户名长度在 4 到 10 个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: ['change', 'blur'] },
          { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: ['change', 'blur'] }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: ['change', 'blur'] },
          { min: 4, max: 4, message: '验证码为 4 个字符', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    // 重置表单
    resetFrom () {
      this.$refs.form.resetFields()
    },
    // 修改验证码
    updateCode () {
      // 加上时间戳，防止缓存
      this.verifyCodeUrl = this.$axios.defaults.baseURL + 'verifyCode/' + new Date()
    },
    // 登录
    async login () {
      try {
        await this.$refs.form.validate()
        console.log('发请求')
        // 发送请求
        const res = await this.$axios.post('login', {
          ...this.loginForm,
          // 对密码进行base64加密
          password: btoa(this.loginForm.password)
        })

        if (res.status === 200) {
          // 登录成功，跳转到首页，并将token存入localStorage
          this.$router.push('/home')
          localStorage.setItem('vhr_token', res.data)
          this.$message.success('登录成功')
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        return false
      }
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
