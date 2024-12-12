import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from "@/learn/page/samples/route/page/HomeView.vue";
import AboutView from "@/learn/page/samples/route/page/AboutView.vue";
import VanListView from "@/learn/page/samples/list/VanListView.vue";
import ListView from "@/learn/page/samples/list/ListView.vue";
import VirtualListView from "@/learn/page/samples/list/VirtualListView.vue";
import CanvasView from "@/learn/page/samples/canvas/CanvasView.vue";
import WebGLView from "@/learn/page/samples/canvas/WebGLView.vue";
import WebGPUView from "@/learn/page/samples/canvas/WebGPUView.vue";
import LearnPage from "@/learn/page/samples/learn/LearnPage.vue";

import Home from "@/learn/page/phone/home/Home.vue";
import Search from "@/learn/page/phone/search/Search.vue";
import Setting from "@/learn/page/phone/setting/Setting.vue";
import Friends from "@/learn/page/phone/friends/Friends.vue";
import MyHome from "@/learn/page/phone/home/MyHome.vue";

const learnRoutes = [
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

export default learnRoutes

// const router = createRouter({
//     history: createWebHashHistory(),
//     learnRoutes,
// })

// export default router