import './assets/main.css'

import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
// 应用实例会暴露一个 .config 对象允许我们配置一些应用级的选项
// 例如定义一个应用级的错误处理器，用来捕获所有子组件上的错误：
app.config.errorHandler = (err) => {
    console.error(err)
}
// .mount() 方法应该始终在整个应用配置和资源注册完成后被调用
app.mount('#app')

// 多个应用实例
// const app2 = createApp({
//     /* ... */
// })
// app2.mount('#container-2')