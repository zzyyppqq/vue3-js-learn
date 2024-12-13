import {createWebHashHistory, createRouter} from 'vue-router'

const newBeeRoutes = [
    {
        name: 'new-home',
        path: '/',
        component: () => import('@/newbee/page/main/newHome.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        name: 'new-home',
        path: '/home',
        component: () => import('@/newbee/page/main/newHome.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        name: 'new-category',
        path: '/category',
        component: () => import('@/newbee/page/main/newCategory.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        name: 'new-cart',
        path: '/cart',
        component: () => import('@/newbee/page/main/newCart.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        name: 'new-user',
        path: '/user',
        component: () => import('@/newbee/page/main/newUser.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        name: 'new-login',
        path: '/login',
        component: () => import('@/newbee/page/login/newLogin.vue'),
        meta: {
            keepAlive: true,
        }
    },

]

export default newBeeRoutes

// const router = createRouter({
//     history: createWebHashHistory(),
//     wanAndroidRoutes,
// })
//
// export default router