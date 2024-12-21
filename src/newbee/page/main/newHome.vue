<script setup>

import {getCurrentInstance, nextTick, onMounted, reactive} from "vue";
import {userCartStore} from "@/newbee/store";
import {getLocal} from "@/newbee/utils/storageUtil.js";
import {closeToast, showLoadingToast} from "vant";
import {categoryList} from "@/newbee/data/data.js";
import TabBarView from "@/newbee/componment/TabBarView.vue";
import {getHome} from "@/newbee/service/homeApi.js"
import {useRouter} from "vue-router";
import router from "@/app/router"

const router1 = useRouter()
// 这两个实例是基于同一个 Vue Router 管理的，但它们在不同的上下文中被创建和获取，
// 因此 在内存地址上是不同的，即 router !== router1。
// router1 是你通过 useRouter() 获取的 当前组件实例中的路由实例。
// 这个实例可能是 Vue Router 自动注入到每个组件中的。
console.log(`router === router1: ${router === router1}`)

const {count, cartStore} = userCartStore()

const state = reactive({
  swiperList: [],
  isLogin: false,
  headerScroll: false, // 滚动透明判断
  categoryList: categoryList,
  newGoodses: [],
  hots: [],
  recommends: [],
  allGoodses: [],
})

const goodTitles = ['新品上线', '热门商品', '最新推荐']

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

  const {data} = await getHome()
  state.swiperList = data.carousels

  state.newGoodses = data.newGoodses
  state.hots = data.hotGoodses
  state.recommends = data.recommendGoodses

  state.allGoodses.push(data.newGoodses)
  state.allGoodses.push(data.hotGoodses)
  state.allGoodses.push(data.recommendGoodses)

  state.loading = false
  closeToast()
})

nextTick(() => {
  console.log('newHome nextTick')
  // document.body 不触发滚动事件的原因通常是页面没有足够的内容可以滚动，或者 body 的 overflow 属性未正确设置。
  // 使用 window 或特定的容器元素（例如具有 overflow: auto 或 overflow: scroll 的元素）通常能解决这个问题
  document.body.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    scrollTop > 100 ? state.headerScroll = true : state.headerScroll = false
  })
})

const goTo = (url) => {
  window.open(url)
}

</script>

<template>
  <div>
    <header class="home-header wrap" :class="{ 'active': state.headerScroll}">
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
        <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)" style="width: 100%; height: 100%"/>
      </van-swipe-item>
    </van-swipe>
    <div class="category-list">
      <div v-for="(item, index) in state.categoryList">
        <img :src="item.imgUrl"/>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <template v-for="(goodTitle, index) in goodTitles">
      <div class="good">
        <header class="good-header">{{ goodTitle }}</header>
        <van-skeleton title :row="3" :loading="state.loading">
          <div class="good-box">
            <div class="good-item" v-for="item in state.allGoodses[index]" :key="item.goodsId"
                 @click="goToDetail(item)">
              <img :src="$filters.prefix(item.goodsCoverImg)" alt="" :style="{ width: '100%', height: '100%' }">
              <!--              <img :src="item.goodsCoverImg" alt="" :style="{ width: '100%', height: '100%' }">-->
              <div class="good-desc">
                <div class="title">{{ item.goodsName }}</div>
                <div class="price">¥ {{ item.sellingPrice }}</div>
              </div>
            </div>
          </div>
        </van-skeleton>
      </div>
    </template>

    <TabBarView/>
  </div>

</template>

<style scoped lang="less">
@import "@/newbee/common/style/mixin";

.home-header {
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

  .nbmenu2 {
    color: @primary;
  }

  &.active {
    background: @primary;

    .nbmenu2 {
      color: #fff;
    }

    .login {
      color: #fff;
    }
  }

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
      color: @primary;
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
    color: @primary;
    line-height: 52px;
  }
}

.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;

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
      margin: 13px auto 8px auto;
    }
  }
}

.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }

  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .good-item {
      display: flex;
      width: 50%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;

      .img {
        display: block;
        width: 120px;
        margin: 0px auto;
      }

      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;

        .title {
          color: #fff;
        }

        .price {
          color: @primary;
        }
      }

      /*
      & 代表当前选择器（父元素）。
      :nth-child() 是一个伪类，用于选择父元素中符合特定规则的子元素。
      :nth-child(2n + 1) 选择该父元素下所有奇数位置的子元素（即第 1, 3, 5, 7, 等等）。
      border-right: 1px solid #e9e9e9 为这些奇数位置的子元素添加一个右边框。
      */
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>