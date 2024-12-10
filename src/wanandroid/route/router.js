import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from "@/components/route/page/HomeView.vue";
import AboutView from "@/components/route/page/AboutView.vue";
import Home from "@/components/phone/home/Home.vue";
import Search from "@/components/phone/search/Search.vue";
import Setting from "@/components/phone/setting/Setting.vue";
import Friends from "@/components/phone/friends/Friends.vue";
import MyHome from "@/components/phone/home/MyHome.vue";
import VanListView from "@/components/list/VanListView.vue";
import ListView from "@/components/list/ListView.vue";
import VirtualListView from "@/components/list/VirtualListView.vue";
import CanvasView from "@/components/canvas/CanvasView.vue";
import WebGLView from "@/components/canvas/WebGLView.vue";
import WebGPUView from "@/components/canvas/WebGPUView.vue";
import LearnPage from "@/components/learn/LearnPage.vue";


const _routes = [
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


const otherRoutes = [
    { path: '/home', component: Home },
    { path: '/learn-page', component: LearnPage },
    { path: '/my-home', component: MyHome },
    { path: '/van-list-view', component: VanListView },
    { path: '/list-view', component: ListView },
    { path: '/virtual-list-view', component: VirtualListView },
    { path: '/search', component: Search },
    { path: '/friends', component: Friends },
    { path: '/setting', component: Setting },
    { path: '/home-view', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/canvas-view', component: CanvasView },
    { path: '/webgl-view', component: WebGLView },
    { path: '/webgpu-view', component: WebGPUView },
]

const routes = [..._routes, ...otherRoutes]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router