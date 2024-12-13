import {createRouter, createWebHashHistory} from "vue-router";
import wanAndroidRoutes from "@/wanandroid/router/index.js";
import newBeeRoutes from "@/newbee/router/index.js";
import learnRoutes from "@/learn/router/index.js";


const routes = [...wanAndroidRoutes, ...newBeeRoutes, ...learnRoutes]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router