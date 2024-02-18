import axios from "axios";
import { LOGIN_TOKEN } from '../store/mutation-types'
import { getCookie,clearCookie } from '@/utils/util'

const CancelToken = axios.CancelToken;
let source = null
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 30000, // 请求超时时间
})
// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        console.log(error.response);
    }
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    source = CancelToken.source()
    config.cancelToken = source.token
    const token = getCookie(LOGIN_TOKEN)
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        config.headers['token'] = token
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    if (response.data.code === '301') {
        clearCookie(LOGIN_TOKEN)
    }
    return Promise.resolve(response.data)
}, errorHandler)

// 手动中断请求,在全局任意地方可调用
window.handleAbortRequest =()=>{
    if(source)source.cancel('手动中断请求')
  }

export default request