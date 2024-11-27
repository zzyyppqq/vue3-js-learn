import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from "@/components/route/page/HomePage.vue";
import AboutPage from "@/components/route/page/AboutPage.vue";
import Home from "@/components/phone/home/Home.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/about', component: AboutPage },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router