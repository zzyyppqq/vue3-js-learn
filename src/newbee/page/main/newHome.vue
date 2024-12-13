<script setup>

import {onMounted, reactive} from "vue";
import homeApi from "@/newbee/service/homeApi.js"
import {userCartStore} from "@/newbee/store";
import {getLocal} from "@/newbee/utils/storageUtil.js";
import {closeToast, showLoadingToast} from "vant";
import {categoryList} from "@/newbee/data/data.js";
import TabBarView from "@/newbee/componment/TabBarView.vue";

const {count, cartStore} = userCartStore()

const state = reactive({
  swiperList: [],
  isLogin: false,
  categoryList: categoryList,
  newGoodses: [],
  recommends: [],
})

onMounted(async () => {
  const token = getLocal('token')
  if (token) {
    state.isLogin = true
    cartStore.updateCart()
  }
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  });
  try  {
    const {data} = await homeApi.getHome()
    console.log('Home data: ', data)
    state.swiperList = data.carousels
    state.newGoodses = data.newGoodses
    state.hots = data.hotGoodses
    state.recommends = data.recommendGoodses
    state.loading = false
  } catch (err) {
    console.error('err: ', err)
  }
  closeToast()
})



const goTo = (url) => {
  window.open(url)
}

</script>

<template>
  <div>
    <header class="home-content wrap">
      <router-link tag="i" to="./category">
        <i class="nbicon nbmenu2"></i>
      </router-link>
      <div class="head-search">
        <span class="app-name">阿里商城</span>
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="/">山河无恙</router-link>
      </div>
      <router-link class="login" to="./login" v-if="!state.isLogin">登录</router-link>
      <router-link class="login" to="./user" v-else>
        <van-icon name="manager-o"></van-icon>
      </router-link>
    </header>
    <van-swipe class="banner-content" :autoplay="3000" indicator-color="#1baeae">
      <van-swipe-item v-for="(item, index) in state.swiperList">
        <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)"/>
      </van-swipe-item>
    </van-swipe>
    <div class="category-list">
      <div v-for="(item, index) in state.categoryList">
        <img :src="item.imgUrl"/>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">新品上线</header>
      <van-skeleton title :row="3" :loading="state.loading">
          <div class="good-box">
            <div class="good-item" v-for="item in state.newGoodses" :key="item.goodsId" @click="goToDetail(item)">
<!--              <img :src="$filters.prefix(item.goodsCoverImg)" alt="">-->
              <img :src="item.goodsCoverImg" alt="" :style="{ width: '100%', height: '100%' }">
              <div class="good-desc">
                <div class="title">{{ item.goodsName }}</div>
                <div class="price">¥ {{ item.sellingPrice }}</div>
              </div>
            </div>
          </div>
      </van-skeleton>
    </div>
    <TabBarView />
  </div>

</template>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.home-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

  .head-search {
    width: 74%;
    display: flex;
    color: #232326;
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    background: rgba(255, 255, 255, .7);
    border-radius: 20px;

    .app-name {
      padding: 0 10px;
      color: #1baeae;
      font-size: 20px;
      font-weight: bold;
      border-right: 1px solid #666;
    }

    .icon-search {
      padding: 0 10px;
      font-size: 17px;
    }

    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }

  .login {
    color: #1baeae;
    line-height: 52px;
  }
}

img {
  width: 100%;
  height: 100%;
}

.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;

  div {
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    img {
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
    }
  }
}
.good-box {
  display: flex;
  flex-wrap: wrap;

  .good-item {
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    img {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
    }

  }
}
</style>