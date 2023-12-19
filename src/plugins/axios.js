import axios from 'axios'
import { core } from '@/config/pluginInit'
import Swal from 'sweetalert2/dist/sweetalert2.js'
axios.interceptors.request.use(config => {
  config.baseURL = 'http://18.225.144.67:5650/api'
  config.headers = {
    // Referer: 'http://18.225.144.67:5650/',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMy4xMzMuMTE1LjE3ODo1NjUwL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzAxNjQzOTYzLCJleHAiOjE3MTc0MTE5NjMsIm5iZiI6MTcwMTY0Mzk2MywianRpIjoiNnZoRFMzNjYzdEZDd1BJSSIsInN1YiI6IjlhYjZjYTljLTEzNTQtNGZiMC05ZmMxLWM3MWIwNWFhZjU2MyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.I7gT5Gyr_kEXzH0LQYOOrjzBgptlpEgDyU-aq4DSm8s'
  }
  core.index()
  return config
})

axios.interceptors.response.use((response) => {
  if (response.config.method !== 'get') {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: response.data.message,
      showConfirmButton: false,
      timer: 1500
    })
  }
  core.index()

  return response
}, (error) => {
  // error.config.method == 'get' ? store.state.getLoading = false : ''
  console.log(error.response)
  if (error.response.status === 400) {
    var errorMsg = ''
    for (var key in error.response.data) {
      errorMsg += `-${error.response.data[key][0]} \n`
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMsg,
      showConfirmButton: false,
      timer: 5000
    })
  }
  core.index()
  return Promise.reject(error)
}
)

export default axios
