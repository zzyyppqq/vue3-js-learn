import axios from "axios"
// 使用自定义配置创建新的 axios 实例。
const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10 * 1000,
    headers: {},
})

function request(config) {
    return new Promise((resolve, reject) => {
        axiosInstance
            .request(config)
            .then(res => {
                resolve(res);
            })
            .catch((err) => {
                console.log("request err: " + err)
                // 处理全局错误
                if (err) {
                    reject(err);
                }
            });
    });
}

const fetchHome = () => {
    axiosInstance.get("/article/list/0/json").then((reponse) => {
        console.log("json: ", JSON.stringify(reponse))
    })
}

const fetchHome2 = () => {
    request({url: "/article/list/0/json" }).then((reponse) => {
        console.log("json: ", JSON.stringify(reponse))
    })
}

export default {
    fetchHome,
    fetchHome2
}
