import axios from 'axios'
// import { ElMessage } from 'element-plus'

const baseURL = ''

const instance = axios.create({
  baseURL,
  timeout: 1000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

// instance.interceptors.response.use(
//   (res) => {
//     if (res.data.code === 0) {
//       return res
//     }
//   }
// )

export default instance
export { baseURL }
