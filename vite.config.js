import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import DefineOptions from 'unplugin-vue-define-options/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9999, // 指定端口号
    host: '0.0.0.0', // 允许局域网访问
    proxy: {
      "/api": {
        target: "https://www.wanandroid.com",   // 要请求的后台地址
        changeOrigin: true,    // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    hmr: {
      host: 'localhost', // 配置 HMR 的 host
      clientPort: 9999,  // 客户端端口
    },
  },
  plugins: [
    vue(),
    //vueDevTools(),
    DefineOptions(), // 启用 DefineOptions 插件
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 允许 Less 中的 JS 表达式（如：计算）
      },
    },
  }
})
