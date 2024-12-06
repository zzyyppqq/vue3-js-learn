<script setup>
import {ref, defineProps} from 'vue'
import {
  VIEW_STATE_EMPTY,
  VIEW_STATE_ERROR,
  VIEW_STATE_LOADING,
  VIEW_STATE_NETWORK_ERROR,
  VIEW_STATE_SUCCESS
} from "@/wanandroid/const/ViewStateConstant";

const props = defineProps({
  viewState: VIEW_STATE_LOADING,
  skeleton: false,
  customSkeleton: false,
  skeletonSize: 1
})

import loading from '@/wanandroid/assets/loading.gif'

const emits = defineEmits(["retry"])
const retryClick = () => {
  emits("retry")
}


</script>

<template>
  <slot v-if="viewState===VIEW_STATE_SUCCESS"></slot>

  <div v-else-if="viewState===VIEW_STATE_EMPTY">

  </div>
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
  width: 100vw;
  height: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>