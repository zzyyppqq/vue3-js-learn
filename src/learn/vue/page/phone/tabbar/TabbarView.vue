<script setup>

import {ref} from "vue";
import {showToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()


const active = ref(0);
const onTabBarChange = (index) => {
  showToast(`标签 ${index}, ${active.value}`);
  if (index == 0) {
    router.push({ path: '/' })
  } else if (index == 1) {
    router.push({ path: '/search' })
  } else if (index == 2) {
    router.push({ path: '/friends' })
  } else if (index == 3) {
    router.push({ path: '/setting' })
  } else {
    router.push({ path: '/' })
  }
}
</script>

<template>
  <div>
<!--    <van-tabbar v-model="active" @change="onTabBarChange">-->
<!--      <van-tabbar-item icon="home-o">Home</van-tabbar-item>-->
<!--      <van-tabbar-item icon="search" dot>Search</van-tabbar-item>-->
<!--      <van-tabbar-item icon="friends-o" badge="5">Friends</van-tabbar-item>-->
<!--      <van-tabbar-item icon="setting-o" badge="20">Setting</van-tabbar-item>-->
<!--    </van-tabbar>-->

    <!-- 路由模式-->
    <van-tabbar route fixed placeholder>
      <van-tabbar-item replace to="/" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search" dot>Search</van-tabbar-item>
      <van-tabbar-item replace to="/friends" icon="friends-o" badge="5">Friends</van-tabbar-item>
      <van-tabbar-item replace to="/setting" icon="setting-o" badge="20">Setting</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>

</style>