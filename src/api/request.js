import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: 'http://192.168.1.35:8888',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

// service.interceptors.response.use(
//   (response) => {
//     const { data, meta } = response.data
//     if (meta.status === 200 || meta.status === 201) {
//       return data
//     } else {
//       ElMessage.error(meta.msg)
//       return Promise.reject(new Error(meta.msg))
//     }
//   },
//   (error) => {
//     console.log(error.response)
//     error.response && ElMessage.error(error.response.data)
//     return Promise.reject(new Error(error.response.data))
//   }
// )

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response.data)
    const { data, code, message } = response.data
    if (code === 0) {
      return data
    } 
  },
  (error) => {
    console.log(error.response)
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)

export default service

