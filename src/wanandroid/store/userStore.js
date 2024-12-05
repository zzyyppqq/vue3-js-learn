import {defineStore} from "pinia";


export const useUserStore = defineStore("userInfo", {
    state: () => {
        return {
            hasLogin: false,
            userInfo: {},
        }
    },
    getters: {
        getLoginState: (state) => {
            return state.hasLogin
        },
        getUserInfo: (state) => {
            return state.userInfo
        }
    },
    actions: {
        setLoginState(loginState) {
            this.hasLogin = loginState
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