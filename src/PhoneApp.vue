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

/* main.css 或 App.vue 的 style */
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/*路由区域全屏，且没有边距*/
.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
  background-color: white;
}

.van-badge--fixed {
  z-index: 1000;
}
</style>