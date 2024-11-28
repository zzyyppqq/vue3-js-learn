import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9999, // 指定端口号
    host: '0.0.0.0', // 允许局域网访问
    proxy: {
      // 可选的代理配置
    },
    hmr: {
      host: 'localhost', // 配置 HMR 的 host
      clientPort: 9999,  // 客户端端口
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
