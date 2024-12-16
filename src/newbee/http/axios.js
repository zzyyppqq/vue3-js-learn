import axios from "axios";
import {showFailToast} from "vant";
import router from '../router'
import {getLocal, setLocal} from "@/newbee/utils/storageUtil.js";

console.log('import.meta.env: ', import.meta.env)

axios.defaults.baseURL = import.meta.env.MODE == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = getLocal('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((req) => {
    console.log(`axios request method: ${req.method}, url: ${req.url}`)
})

axios.interceptors.response.use((resp) => {
    if (typeof resp.data != 'object') {
        showFailToast('服务器异常！')
        return Promise.reject(resp)
    }
    console.log(`axios response resultCode: ${resp.data.resultCode}`)
    if (resp.data.resultCode != 200) {
        if (resp.data.message) showFailToast(resp.data.message)
        if (resp.data.resultCode == 416) {
            router.push({ path: '/login'})
        }
        if (resp.data.data && window.location.hash == '#/login') {
            setLocal('token', resp.data.data)
            axios.defaults.headers['token'] == resp.data.data
        }
        return Promise.reject(resp.data)
    }
    return resp.data
})

export default axios
