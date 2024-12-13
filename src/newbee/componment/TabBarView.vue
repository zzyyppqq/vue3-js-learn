<script setup>
import {userCartStore} from "@/newbee/store/index.js";
import {onMounted} from "vue";
import {getLocal} from "@/newbee/utils/storageUtil.js";
import {useRoute, useRouter} from "vue-router";
const cart = userCartStore()

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const token = getLocal('token')
  const path = route.path
  if (token && !['/home', '/category'].includes(path)) {
    cart.updateCart()
  }
})

</script>

<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link class="nav-list-item active" to="home">
        <li class="nbicon nblvsefenkaicankaoxianban-1"></li>
        <span>首页</span>
      </router-link>
      <router-link  class="nav-list-item" to="category">
        <li class="nbicon nbfenlei"></li>
        <span>分类</span>
      </router-link>
      <router-link  class="nav-list-item" to="cart">
        <li>
          <van-icon  name="shopping-cart-o" :badge="!cart.count ? '' : cart.count" />
        </li>
        <span>购物车</span>
      </router-link>
      <router-link  class="nav-list-item" to="user">
        <li class="nbicon nblvsefenkaicankaoxianban-"></li>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<style scoped lang="less">
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1;
  padding: 5px 0;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  .nav-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;

    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;

      li {
        text-align: center;
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }

      .van-icon-shopping-cart-o {
        margin: 0 auto;
        margin-bottom: 2px;
      }
    }
  }

}
</style>