import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
import storage from './storage'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

const service  = axios.create({
  baseURL: config.baseURL,
  timeout: 8000
})

service.interceptors.request.use((req) => {
  const {token = ""} = storage.getItem('userInfo') || {}

  if (!req.headers.Authorization) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

service.interceptors.response.use((res) => {
  const {code, data, msg} = res.data

  if (code === 200) {
    return data
  } else if (code === 500001) {
    ElMessage.error(TOKEN_INVALID)

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)

    return Promise.reject(msg || NETWORK_ERROR)
  }
})

/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
 function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
      options.params = options.data;
  }
  let isMock = config.mock;
  if (typeof options.mock != 'undefined') {
      isMock = options.mock;
  }
  if (config.env === 'prod') {
      service.defaults.baseURL = config.baseApi
  } else {
      service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
      return request({
          url,
          data,
          method: item,
          ...options
      })
  }
})

export default request;