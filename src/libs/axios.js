import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers heres
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  baseURL: 'http://167.86.93.80:8765',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
      // eslint-disable-next-line no-param-reassign
      config.headers['Content-Type'] = 'application/json'
    } else {
      // Do something... Usually logout user.
    }
    return config
  },
  error => {
    console.log(error)
    if (error.response.status === 401) {
      console.log(error)
    }
    return Promise.reject(error)
  },
)

// Add request/response interceptor
axiosIns.interceptors.response.use(
  response => response,
  error => {
    // const { config, response: { status } } = error
    const { config, response } = error
    // const originalRequest = config

    // if (status === 401) {
    if (response && response.status === 401) {
      return response
    }
    return Promise.reject(error)
  },
)

Vue.prototype.$http = axiosIns

export default axiosIns
