// import './assets/main.css'

import {createApp, defineAsyncComponent, defineComponent} from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'
import myDirective, {installPlugin} from "@/learn/vue/util/directive.js";
import i18nPlugin from "@/learn/vue/plugin/i18n.js";
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import router from "@/app/router";
// 1. 引入你需要的组件
import Vant from "vant";
// 2. 引入组件样式
import 'vant/lib/index.css';

import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import {SingletonApp} from '@/app/global'

const app = createApp(App)

const appName = 'newbee'
app.config.globalProperties.$appName = appName

// 主题
// 动态导入不同的 CSS 文件
const loadTheme = (theme) => {
    if (theme === 'wanandroid') {
        import('@/wanandroid/css/style.css').then(() => {
            console.log('wanandroid theme');
        });
    } else if (theme === 'newbee') {
        import('@/newbee/assets/main.css').then(() => {
            console.log('newbee theme');
        });
        import('@/newbee/common/style/theme.css').then(() => {
            console.log('newbee theme');
        });
    }
};
loadTheme(appName)

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
    /* ... */
})

app.provide('appInstance', app);

app.config.globalProperties.$app = app
app.config.globalProperties.$router = router

new SingletonApp()
    .setApp(app)
    .setRouter(router)

// const app = getCurrentInstance()?.proxy?.$app;

// 在 Vue 3 中，Vue.extend 已被移除, 在Vue 3 中的替代方法defineComponent
// 通过 Vue.extend() 创建的构造器可以用 new 来实例化，适合局部使用，不必注册到全局。
// 动态创建组件：适用于动态创建和管理组件，尤其是插件或一些库需要动态渲染组件时。
// 代码复用：可以通过创建组件构造器实现代码复用，适合场景中需要多个实例化的地方。
defineComponent({
    name: 'MyComponent',
    template: `<div>Hello {{ msg }}</div>`,
    data() {
        return {
            msg: 'Vue 3 defineComponent'
        };
    }
});
// 在 Vue 3 中，Vue.component 仍然可以使用，但它是全局注册组件的方式。官方更推荐使用 局部组件注册 或 动态组件注册。

// 异步组件可以使用 app.component() 全局注册
app.component('AsyncComponent', defineAsyncComponent(() =>
    import('./learn/vue/page/samples/async_component/SubComp.vue')
))
// 应用实例会暴露一个 .config 对象允许我们配置一些应用级的选项
// 例如定义一个应用级的错误处理器，用来捕获所有子组件上的错误：
app.config.errorHandler = (err, instance, info) => {
    console.error("err==>", err)
    console.error("instance==>", instance)
    console.error("info==>", info)
}

installPlugin(app)
// 全局指令：可以在 tabbar.util 或专门的文件中注册，然后通过 app.directive() 注册。
// 局部指令：可以直接在组件内定义和使用。
// 使用插件注册指令
app.use(myDirective)
// 创建一个 pinia 实例 (根 store) 并将其传递给应用
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.use(i18nPlugin, {
    greetings: {
        hello: 'Bonjour!'
    }
})

// 全局过滤器
app.config.globalProperties.$filters = {
    prefix(url) {
        if (url && url.startsWith('http')) {
            return url
        } else {
            url = `http://backend-api-01.newbee.ltd${url}`
            return url
        }
    }
}

/**
 * 全局注册 RouterView 和 RouterLink 组件。
 * 添加全局 $index 和 $index 属性。
 * 启用 useRouter() 和 useRoute() 组合式函数。
 */
app.provide('router', router);
app.config.globalProperties.$router = router
app.use(router)

app.use(VueVirtualScroller)

app.use(Vant)
app.use(Vant.Lazyload)

// .mount() 方法应该始终在整个应用配置和资源注册完成后被调用
app.mount('#app')

// 多个应用实例
// const app2 = createApp({
//     /* ... */
// })
// app2.mount('#container-2')