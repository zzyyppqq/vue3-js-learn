import { createWebHashHistory, createRouter } from 'vue-router'
import HomePage from "@/components/route/page/HomePage.vue";
import AboutPage from "@/components/route/page/AboutPage.vue";
import Home from "@/components/phone/home/Home.vue";
import Search from "@/components/phone/search/Search.vue";
import Setting from "@/components/phone/setting/Setting.vue";
import Friends from "@/components/phone/friends/Friends.vue";
import MyHome from "@/components/phone/home/MyHome.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/my-home', component: MyHome },
    { path: '/search', component: Search },
    { path: '/friends', component: Friends },
    { path: '/setting', component: Setting },
    { path: '/about', component: AboutPage },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router