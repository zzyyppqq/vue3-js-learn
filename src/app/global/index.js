import {getCurrentInstance} from "vue";

export const getGlobalProperties = () => {
    const instance = getCurrentInstance();
    // const app = instance.proxy.$app;
    console.log(`getCurrentInstance() ===> ${instance}`)
    return instance.appContext.config.globalProperties
}


export class SingletonApp {
    // static instance;
    constructor() {
        if (SingletonApp.instance) {
            return SingletonApp.instance;
        }
        //将this挂载到SingletonApp这个类的instance属性上
        SingletonApp.instance = this; // 保持唯一实例
    }

    setApp(app) {
        this._app = app
        return this
    }

    getApp() {
        return this._app;
    }

    setRouter(router) {
        this._router = router
        return this
    }

    getRouter() {
        return this._router
    }
}