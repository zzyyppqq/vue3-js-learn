import {defineStore} from "pinia";
import {reactive, ref} from "vue";


export const useStore = defineStore("token",  () => {
    const token = ref('')
    const networkInfo = reactive({
        key: '',
        value: ''
    })
    function setToken(token) {
        token.value = token
    }
    function commit(key, value) {
        networkInfo.key = key
        networkInfo.value = value
    }
    return {token, setToken, networkInfo, commit}
})

