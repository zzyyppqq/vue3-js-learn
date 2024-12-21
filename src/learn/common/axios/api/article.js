import axios from "@/learn/common/axios/http.js";
import qs from "qs";

const article = {
    articleList() {
        return axios.get('/topics')
    },
    articleDetail (id, params) {
        return axios.get(`/topic/${id}`, {
            params: params
        });
    },
    // post提交
    login (params) {
        return axios.post(`/accesstoken`, qs.stringify(params));
    }
}

export default article