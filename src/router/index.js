import Axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

// 异步加载组件，按需加载 /* webpackChunkName: "home" */  给组件进行分组打包
const Home = () => import(/* webpackChunkName: "home" */ '../components/Home.vue')

// 将axios绑定到vue原型上
Vue.prototype.$axios = Axios

// 设置默认的baseUrl
Axios.defaults.baseURL = 'http://127.0.0.1:9000/api/'

// 请求拦截器
Axios.interceptors.request.use(function (config) {
  // 拦截到每一个请求，给这些请求的config添加一个headers,配置token
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
// 默认false 会导致后台接收到的同一用户的不同请求sessionid都不同,需要改为true
// Axios.defaults.withCredentials = true

// 响应拦截器
Axios.interceptors.response.use(function (res) {
  // 判断token是否已过期
  console.log(res)
  return res.data
})

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/login', name: 'login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

export default router
