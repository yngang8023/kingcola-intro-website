import axios from 'axios'
// import { ElMessage } from 'element-plus'

// 替换为实际的后端API地址
const baseURL = 'http://localhost:8800'

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (response.data.code === 200) {
      return Promise.resolve(response.data)
    } else {
      // 否则的话抛出错误
      return Promise.reject(response.data)
    }
  },
  (error) => {
    if (error.response && error.response.status) {
      return Promise.reject(error.response)
    }
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
