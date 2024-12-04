import { createWebHashHistory, createRouter } from 'vue-router'
import HomePage from "@/components/route/page/HomePage.vue";
import AboutPage from "@/components/route/page/AboutPage.vue";
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


const routes = [
    { path: '/', component: Home },
    { path: '/my-home', component: MyHome },
    { path: '/van-list-view', component: VanListView },
    { path: '/list-view', component: ListView },
    { path: '/virtual-list-view', component: VirtualListView },
    { path: '/search', component: Search },
    { path: '/friends', component: Friends },
    { path: '/setting', component: Setting },
    { path: '/about', component: AboutPage },
    { path: '/canvas-view', component: CanvasView },
    { path: '/webgl-view', component: WebGLView },
    { path: '/webgpu-view', component: WebGPUView },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router