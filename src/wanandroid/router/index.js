import { createWebHashHistory, createRouter } from 'vue-router'

const wanAndroidRoutes = [
    {
        name: 'mainPage',
        path: '/',
        component: () => import('@/wanandroid/main/MainPage.vue'),
        meta: {
            keepAlive: true,
        },
        children: [
            // 子路由
            {
                name: "homePage",
                path: "/homePage",
                component: () => import("@/wanandroid/main/tab/HomePage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "projectPage",
                path: "/projectPage",
                // component: () => import("../wanandroid/main/tab/ProjectPage.vue"),
                component: () => import("@/wanandroid/main/tab/ProjectPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "siteMapPage",
                path: "/siteMapPage",
                component: () => import("@/wanandroid/main/tab/SiteMapPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "wechatPage",
                path: "/wechatPage",
                component: () => import("@/wanandroid/main/tab/WechatPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "systemPage",
                path: "/systemPage",
                component: () => import("@/wanandroid/main/tab/SystemPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
        ]
    },
    {
        name: 'loginPage',
        path: '/loginPage',
        component: () => import('@/wanandroid/login/LoginPage.vue'),
        meta: {
            keepAlive: true,
        },
    }
]

export default wanAndroidRoutes

// const router = createRouter({
//     history: createWebHashHistory(),
//     wanAndroidRoutes,
// })
//
// export default router