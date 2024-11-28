<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
console.log("route: ",JSON.stringify(route))
console.log("router: ",JSON.stringify(router))


</script>

<template>
  <div id="app">
    <RouterView class="router-view"/>
  </div>
</template>


<style scoped>

/* tabbar.css 或 App.vue 的 style */
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll; /* 允许滚动 */
  overflow: auto; /* 添加滚动条 */
  background-color: white;
}

* {
  box-sizing: border-box;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
}

/*路由区域全屏，且没有边距*/
.router-view {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
  background-color: white;
}

</style>