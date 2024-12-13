import {defineStore} from "pinia";
import { ref, computed } from 'vue';

export const useUserStore = defineStore("userInfo", {
    state: () => {
        return {
            hasLogin: false,
            userInfo: {},
            loginInfo: {}
        }
    },
    getters: {
        getLoginState: (state) => {
            return state.hasLogin
        },
        getUserInfo: (state) => {
            return state.userInfo
        },
        getLoginInfo: (state) => {
            return state.loginInfo
        }
    },
    actions: {
        setLoginState(loginState) {
            this.hasLogin = loginState
        },
        setLoginInfo(loginInfo) {
            if (loginInfo) {
                this.loginInfo = loginInfo
            } else {
                this.loginInfo = {}
            }
        },
        setUserInfo(userInfo) {
            if (userInfo) {
                this.userInfo = userInfo
            } else {
                this.userInfo = {}
            }
        },
        loginOut() {
            this.setLoginState(false)
            this.setUserInfo(null)
        }
    },
    persist: {
        enable: true
    }
})



export const useUserInfoStore2 = defineStore('userInfo2', () => {
    const hasLogin = ref(false);
    const userInfo = ref({});
    const loginInfo = ref({});
    // getting对应计算属性
    const isLoggedIn = computed(() => hasLogin.value);
    // actions对应普通方法
    const setUserInfo = (info) => {
        userInfo.value = info;
        hasLogin.value = true;
    };

    const clearLogin = () => {
        hasLogin.value = false;
        userInfo.value = {};
        loginInfo.value = {};
    };

    return {
        hasLogin,
        userInfo,
        loginInfo,
        isLoggedIn,
        setUserInfo,
        clearLogin,
    };
});