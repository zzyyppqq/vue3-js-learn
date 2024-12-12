import {createRouter, createWebHashHistory} from "vue-router";
import wanAndroidRoutes from "@/wanandroid/router/index.js";
import learnRoutes from "@/learn/router/index.js";


const routes = [...wanAndroidRoutes, ...learnRoutes]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router