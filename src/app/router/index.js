import {createRouter, createWebHashHistory} from "vue-router";
import wanAndroidRoutes from "@/wanandroid/router/index.js";
import newBeeRoutes from "@/newbee/router/index.js";
import learnRoutes from "@/learn/vue/router/index.js";


const fn = () => {
    const result = createRouter({
        history: createWebHashHistory(),
        routes,
    })
    console.log(`createRouter: ${result}`)
    return result
}
const routes = [...wanAndroidRoutes, ...newBeeRoutes, ...learnRoutes]
const router = fn()

export default router