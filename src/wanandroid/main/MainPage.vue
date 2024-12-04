<script setup>
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";

const route = useRoute()
const router = useRouter()
console.log("MainPage route fullPath: ", route.fullPath)

// router.push("/homePage")

const state = reactive({
  title: "首页",
})

const openDrawer = () => {

}
</script>

<template>
  <div class="vertical-layout">
    <div>
      <van-nav-bar :title="state.title" active-color="#ee0a24" fixed placeholder @click-left="openDrawer">
        <template #left>
          <van-icon name="wap-nav" color="white" size="18"></van-icon>
<!--          <van-icon name="chat-o" />-->
        </template>
        <template #right>
          <van-icon name="search" color="white" size="18"></van-icon>
        </template>
      </van-nav-bar>
    </div>
    <div class="main-content" id="main-content">
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"></component>
        </keep-alive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"></component>
      </RouterView>
    </div>
    <van-tabbar route fixed placeholder>
      <van-tabbar-item replace to="/homePage" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/projectPage" icon="search" dot>项目</van-tabbar-item>
      <van-tabbar-item replace to="/siteMapPage" icon="search" dot>搜索</van-tabbar-item>
      <van-tabbar-item replace to="/wechatPage" icon="friends-o" badge="5">公众号</van-tabbar-item>
      <van-tabbar-item replace to="/systemPage" icon="setting-o" badge="20">导航</van-tabbar-item>
    </van-tabbar>
    <van-popup>
      <div class="drawer-wrap">

      </div>
    </van-popup>
  </div>
</template>


<style scoped>
.main-content {
  background-color: #f4607b;
}
</style>