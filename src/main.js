// import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'
import myDirective, {installPlugin} from "@/js/directive.js";
import i18nPlugin from "@/plugin/i18n.js";
import {createPinia} from "pinia";
import router from "@/router/router.js";
import FullScreenApp from "@/FullScreenApp.vue";
import PhoneApp from "@/PhoneApp.vue";
// 1. 引入你需要的组件
import {Button, Slider, Tabbar, TabbarItem, Search, NavBar, PullRefresh, List, Cell} from "vant";
// 2. 引入组件样式
import 'vant/lib/index.css';
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(PhoneApp)
// const app = createApp(App)
// const app = createApp(FullScreenApp)
// 使 v-focus 在所有组件中都可用
app.directive('focus', {
    /* ... */
})

app.provide('appInstance', app);
app.config.globalProperties.$app = app
// 异步组件可以使用 app.component() 全局注册
app.component('AsyncComponent', defineAsyncComponent(() =>
    import('./components/async_component/SubComp.vue')
))
// 应用实例会暴露一个 .config 对象允许我们配置一些应用级的选项
// 例如定义一个应用级的错误处理器，用来捕获所有子组件上的错误：
app.config.errorHandler = (err) => {
    console.error(err)
}

installPlugin(app)
// 全局指令：可以在 tabbar.js 或专门的文件中注册，然后通过 app.directive() 注册。
// 局部指令：可以直接在组件内定义和使用。
// 使用插件注册指令
app.use(myDirective)
// 创建一个 pinia 实例 (根 store) 并将其传递给应用
const pinia = createPinia()
app.use(pinia)

app.use(i18nPlugin, {
    greetings: {
        hello: 'Bonjour!'
    }
})
/**
 * 全局注册 RouterView 和 RouterLink 组件。
 * 添加全局 $router 和 $route 属性。
 * 启用 useRouter() 和 useRoute() 组合式函数。
 */
app.use(router)

app.use(VueVirtualScroller)

app.use(Button)
    .use(Slider)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Search)
    .use(NavBar)
    .use(PullRefresh)
    .use(List)
    .use(Cell)

// .mount() 方法应该始终在整个应用配置和资源注册完成后被调用
app.mount('#app')

// 多个应用实例
// const app2 = createApp({
//     /* ... */
// })
// app2.mount('#container-2')