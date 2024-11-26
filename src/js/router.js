import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from "@/components/route/page/HomePage.vue";
import AboutPage from "@/components/route/page/AboutPage.vue";


const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router