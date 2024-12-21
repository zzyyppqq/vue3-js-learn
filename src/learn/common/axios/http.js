import axios from "axios";
import QS from 'qs'
import {Toast} from "vant";
import {useStore} from './store/index.js'
import {useRouter} from "vue-router";

// const router = useRouter()

const store = useStore()

// process.env.NODE_ENV 是Node.js 环境及其相关工具（Webpack、Babel 等）
// import.meta.env.MODE 是 Vite 中特有的方式，用于获取当前运行模式
const nodeEnv = import.meta.env.MODE
let baseUrl = ''
if (nodeEnv == 'development') {
    baseUrl = 'https://www.wanandroid.com'
} else if (nodeEnv == 'debug') {
    baseUrl = 'https://www.wanandroid.com'
} else if (nodeEnv == 'production') {
    baseUrl = 'https://www.wanandroid.com'
}

const instance = axios.create({
    timeout: 10 * 1000,
    baseURL: baseUrl,
    headers: {
        'ContentType': 'application/json;charset=UTF-8',
        "Authorization": "Bearer token"
    }
})
// (it => {
//     it.baseURL = baseUrl
// })(instance.defaults)
//
// Object.prototype.let = function (fn) {
//     return fn(this);
// };
// instance.defaults.let(it => {
//     it.baseURL = baseUrl
// })
//
// instance.defaults.baseURL = baseUrl
// instance.defaults.timeout = 10 * 1000;
// instance.defaults.headers.post['ContentType'] = 'application/json;charset=UTF-8'

instance.interceptors.request.use(request => {
    console.log(`axios request method: ${request.method}, url: ${request.url}`)
    const token = store.token
    token && (request.headers.Authorization = token)
    return request
}, error => {
    return Promise.error(error)
})

const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}

const doLogin = () => {
    const router = useRouter()
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

const errorHandler = (status, errorMsg) => {
    switch (status) {
        case 401: // 未登录
            doLogin()
            break
        case 403: // token过期
            tip('登录过期，请重新登录')
            localStorage.removeItem('token')
            store.setToken('')
            setTimeout(() => {
                doLogin()
            }, 1000)
            break
        case 404:
            tip('请求不存在')
            break
        default:
            tip(errorMsg)
            break
    }
}

instance.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}, error => {
    const {response} = error
    if (response) {
        errorHandler(response.state, response.data.message)
        return Promise.reject(error.response)
    } else {
        if (!window.navigate.onLine) {
            store.commit('changeNetwork', false)
        } else {
            return Promise.reject(error)
        }
    }
})

export default instance

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params), config)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
            reject(err.data)
        })
    })
}
