import axios from '../http/axios'

function getHome() {
    return axios.get('/index-infos');
}

export default {
  getHome
}

