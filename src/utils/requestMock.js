import axios from 'axios';
// import { ACCESS_TOKEN } from '@/store/mutation-types';
// import storage from 'store';
import { getCookie,clearCookie } from '@/utils/util'
import { LOGIN_TOKEN } from '@/store/mutation-types.js'
// 创建 axios 实例
const request = axios.create({
	// API 请求的默认前缀
	baseURL: 'https://mock.presstime.cn/mock/657968548c77effb7a84a822/mock',
	timeout: 30000, // 请求超时时间
});
// 异常拦截处理器
const errorHandler = (error) => {
	if (error.response) {
	}
	return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use(config => {
	const token = getCookie(LOGIN_TOKEN)
	// 如果 token 存在
	// 让每个请求携带自定义 token 请根据实际情况自行修改
	if (token) {
		config.headers['Authorization'] = token;
	}
	return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
	if (response.data.code === '301') {
		clearCookie(LOGIN_TOKEN)
  }
	return response.data;
}, errorHandler);

export default request;