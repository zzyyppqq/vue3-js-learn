import axios from '../http/axios'

export function getHome() {
    return axios.get('/index-infos');
}

