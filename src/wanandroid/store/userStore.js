import {defineStore} from "pinia";


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