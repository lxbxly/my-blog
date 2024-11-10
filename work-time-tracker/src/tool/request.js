import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

// 创建 axios 实例并设置默认配置
const instance = axios.create({
  baseURL: `${baseURL}/api`, // 基本URL，可配置
  timeout: 10000,                     // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 默认 Content-Type
  },
});

// 请求拦截器：在请求发送之前执行
instance.interceptors.request.use(
  config => {
    // 可以在这里添加认证 token，或其他通用的请求头设置
    // config.headers.Authorization = `Bearer ${token}`;
    // console.log(`发送请求：${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器：在响应返回之后执行
instance.interceptors.response.use(
  response => response.data, // 直接返回响应数据
  error => {
    // 针对不同错误状态码进行处理
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('请求参数错误');
          break;
        case 401:
          console.error('未授权，请登录');
          break;
        case 403:
          console.error('无权访问');
          break;
        case 404:
          console.error('请求资源不存在');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error('其他错误');
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('请求未收到响应');
      return Promise.reject({ message: '请求未收到响应' });
    } else {
      console.error('请求配置错误:', error.message);
      return Promise.reject(error);
    }
  }
);

// 通用请求函数
const sendRequest = async ({ url, method = 'GET', data = {}, params = {}, headers = {} }) => {
  try {
    const response = await instance({
      url,
      method,
      data,
      params,
      headers,
    });
    return response;
  } catch (error) {
    console.error('请求失败:', error.message);
    throw error; // 将错误抛出，方便调用方捕获
  }
};


export default sendRequest;
