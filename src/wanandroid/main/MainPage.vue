<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref, provide, watch} from "vue";
import {useUserStore} from "@/wanandroid/store/userStore.js";
import {showToast} from "vant";

const route = useRoute()
const router = useRouter()
console.log("MainPage index fullPath: ", route.fullPath)

const titles = ["首页","体系","公众号","项目","导航"]

const userStore = useUserStore()

const titleBar = ref(null)
const toolBarHeight = ref(0)

onMounted(() => {
  setTimeout(() => {
    if (titleBar.value) {
      toolBarHeight.value = titleBar.value.clientHeight
    }
  })
})
watch(toolBarHeight, (value, oldValue, onCleanup) => {
  console.log(`toolBarHeight: ${value}`)
})
provide("toolBarHeight", toolBarHeight)

const state = reactive({
  title: titles[0],
})

const onTabChange = (index) => {
  state.title = titles[index]
}

const showLeft = ref(false)
const openDrawer = () => {
  showLeft.value = true
}

const closeDrawer = () => {
  showLeft.value = false
}

const login = () => {
  if (userStore.hasLogin) {
    showToast("您已经登录了")
    return
  }
  router.push("/loginPage")
}

const logout = () => {
  if (!userStore.hasLogin) {
    showToast({
      message: "您还未登录呢",
      position: "bottom"
    })
    return
  }
  userStore.loginOut()
  showToast("退出登录成功")
}

</script>

<template>
  <div class="vertical-layout">
    <div ref="titleBar">
      <van-nav-bar :title="state.title" active-color="#ee0a24" fixed placeholder @click-left="openDrawer">
        <!--   声明具名插槽的内容      -->
        <template #left>
          <van-icon name="wap-nav" color="white" size="18"></van-icon>
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
    <van-tabbar route fixed placeholder @change="onTabChange" v-model="activeIndex">
      <van-tabbar-item replace to="/homePage" icon="home-o">{{ titles[0]}}</van-tabbar-item>
      <van-tabbar-item replace to="/systemPage" icon="search" badge="20">{{ titles[1]}}</van-tabbar-item>
      <van-tabbar-item replace to="/wechatPage" icon="friends-o" badge="5">{{ titles[2]}}</van-tabbar-item>
      <van-tabbar-item replace to="/projectPage" icon="friends-o" dot>{{ titles[3]}}</van-tabbar-item>
      <van-tabbar-item replace to="/siteMapPage" icon="setting-o" dot>{{ titles[4]}}</van-tabbar-item>
    </van-tabbar>
    <van-popup
        v-model:show="showLeft"
        position="left"
        :style="{ width: '70%', height: '100%', background: '#DFDFDF' }"
    >
      <div class="drawer-wrap">
        <div class="top-wrap" @click="login">
          <img class="avator-style" src="../assets/avator.png" />
          <div class="user-name">{{ !userStore.hasLogin ? '登录/注册' : userStore.userInfo.username}}</div>
        </div>
        <van-cell-group>
          <van-cell value="我的收藏" icon="like-o" is-link @click="$router.push('/collectPage');closeDrawer()"/>
          <van-cell value="TODO" icon="add-o" is-link/>
          <van-cell value="退出登录" icon="share" @click="logout"/>
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>


<style lang="less" scoped>
.main-content {
  flex: auto;
}

.drawer-wrap {
  display: flex;
  width: 100%;
  flex-direction: column;

  .top-wrap {
    height: 200px;
    background-image: url('../assets/drawer-back.jpg');
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avator-style {
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }

    .user-name {
      margin-top: 15px;
      font-size: 18px;
      color: white;
    }
  }
}
</style>