<script setup>

import TabBarView from "@/newbee/componment/TabBarView.vue";
import ListScroll from "@/newbee/componment/ListScroll.vue";
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {closeToast, showLoadingToast} from "vant";
import {getCategory} from "@/newbee/service/goodApi.js";

const route = useRoute()
const router = useRouter()

const searchWrap = ref(null)

const state = reactive({
  categoryData: [],
  currentIndex: 15,
})

onMounted(async () => {
  const screenHeight = document.documentElement.clientHeight
  console.log(`searchWrap.value: ${searchWrap.value}, screenHeight: ${screenHeight}`)
  searchWrap.value.style.height = screenHeight - 100 + 'px'
  showLoadingToast("加载中...")
  const {data} = await getCategory()
  state.categoryData = data
  closeToast()
})

</script>

<template>
  <div class="category">
    <header class="category-header wrap van-hairline--bottom">
      <i class="nbicon nbfanhui" @click="router.push('home')"></i>
      <div class="header-search">
        <i class="nbicon nbSearch"></i>
        <router-link to="./prouct-list?from=category">全场50元起步</router-link>
      </div>
    </header>
    <div class="search-wrap" ref="searchWrap">
      <ListScroll :scroll-data="state.categoryData" class="nav-side-wrapper">
        <!--    左侧导航    -->
        <ul class="nav-side">
          <li
              v-for="item in state.categoryData"
              v-text="item.categoryName"
              :key="item.categoryId"
              :class="{'active': state.currentIndex == item.categoryId}"
              @click="state.currentIndex = item.categoryId"
          ></li>
        </ul>
      </ListScroll>
      <div class="search-content">
        <ListScroll :scroll-data="state.categoryData">
          <div class="swiper-container">
            <template v-for="(category, index) in state.categoryData">
              <div class="swiper-side" v-if="state.currentIndex == category.categoryId" :key="index">
                <div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS" :key="index">
                  <p class="category-title">{{products.categoryName}}</p>
                  <div class="product-item" v-for="(product, index) in products.thirdLevelCategoryVOS" :key="index" @click="selectProduct(product)">
                    <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" class="product-img"/>
                    <p v-text="product.categoryName" class="product-title"></p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </ListScroll>
      </div>
    </div>
    <TabBarView />
  </div>
</template>

<style scoped>
.category {
  .category-header {
    display: flex;
    padding: 10px;
    i {
      font-size: 22px;
      padding: 0 10px;
    }
    .header-search {
      width: 100%;
      display: flex;
      color: #eeeeee;
      margin-left: 20px;
      align-items: center;
      justify-content: start;
      background-color: #9c9999;
      border-radius: 20px;

      i {
        font-size: 22px;
        padding: 0 10px;
      }
    }
  }

  .search-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;


    .nav-side-wrapper {
      width: 28%;
      height: 100%;

      .nav-side {
        width: 100%;

        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;
          &.active {
            color: #63b9e4;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      padding: 0 10px;
      overflow-y: scroll;
      touch-action: pan-y;
      * {
        touch-action: pan-y;
      }

      .swiper-container {
        .swiper-side {
          .category-list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-shrik: 0;
            .category-title {
              width: 100%;
              font-size: 17px;
              font-width: 500;
              padding: 20px 0;
            }
            .product-item {
              width: 33.3333%;
            }
            .product-img {
              width: 30px;
              height: 30px;
            }
            .product-title {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>