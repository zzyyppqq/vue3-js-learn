<script setup>
import {ref, defineProps} from 'vue'
import {
  VIEW_STATE_EMPTY,
  VIEW_STATE_ERROR,
  VIEW_STATE_LOADING,
  VIEW_STATE_NETWORK_ERROR,
  VIEW_STATE_SUCCESS
} from "@/wanandroid/const/ViewStateConstant";

import emptyImage from "@/wanandroid/assets/img/common_empty_content.png"
import timeoutImage from "@/wanandroid/assets/img/timeout.png"
import loading from "@/wanandroid/assets/img/loading.gif"

const props = defineProps({
  viewState: VIEW_STATE_LOADING,
  skeleton: false,
  customSkeleton: false,
  skeletonSize: 1
})


const emits = defineEmits(["retry"])
const retryClick = () => {
  emits("retry")
}


</script>

<template>
  <!-- 成功状态 -->
  <slot v-if="viewState===VIEW_STATE_SUCCESS"></slot>
  <!--  普通错误  -->
  <div v-else-if="viewState===VIEW_STATE_ERROR" class="loading-content-wrap">
    <van-image width="200px" :src="emptyImage"></van-image>
    <div class="loading-text-tips">数据异常</div>
    <van-button class="loading-text-button" @click="retryClick">点我重试</van-button>
  </div>
  <!--  网络错误状态-->
  <div v-else-if="viewState === VIEW_STATE_NETWORK_ERROR" class="loading-content-wrap">
    <van-image width="200px" :src="timeoutImage"></van-image>
    <div class="loading-text-tips">网络异常</div>
    <van-button class="loading-text-button" @click="retryClick">点我重试</van-button>
  </div>
  <!--  空页面状态-->
  <div v-else-if="viewState === VIEW_STATE_EMPTY" class="loading-content-wrap">
    <van-image width="200px" :src="emptyImage"></van-image>
    <div class="loading-text-tips">暂无数据</div>
    <van-button class="loading-text-button" @click="retryClick">点我重试</van-button>
  </div>
  <!--  骨架屏或者loading-->
  <div v-else>
    <template v-if="skeleton">
      <template v-for="(item, index) in skeletonSize">
        <!--   自定义骨架屏     -->
        <slot name="skeleton" v-if="customSkeleton"></slot>
        <!--   默认骨架屏     -->
        <van-skeleton v-else title :row="3" style="margin-top: 10px; margin-bottom: 10px"></van-skeleton>
      </template>
    </template>
    <!--  普通loading  -->
    <div v-else class="loading-content-wrap">
      <van-image :src="loading"></van-image>
    </div>
  </div>
</template>

<style scoped>
.loading-content-wrap {
  flex-direction: column;
  display: flex;
  width: 100vw;
  height: 70vh;
  align-items: center;
  justify-content: center;
}

.loading-text-tips {
  font-size: 15px;
  color: #333333;
}

.loading-text-button {
  margin-top: 10px;
  line-height: 30px;
  color: #ff6900;
  font-size: 15px;
  height: 30px;
  width: 120px;
  text-align: center;
  border: 1px solid #FF6900;
  border-radius: 20px;
}
</style>