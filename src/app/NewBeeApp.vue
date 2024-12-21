<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
console.log("NewBeeApp index fullPath: ", route.fullPath)

</script>

<template>
  <div id="app">
    <RouterView class="router-view"></RouterView>
  </div>
</template>

<!--app中的style 不要加scope，需要是全局的-->
<style lang="less">

/* tabbar.css 或 App.vue 的 style */
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll; /* 允许滚动 */
  overflow: auto; /* 添加滚动条 */
  /*background-color: white;*/
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  /*color: #2c3e50;*/
  /*background-color: white;*/

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
  /*background-color: white;*/
}

</style>