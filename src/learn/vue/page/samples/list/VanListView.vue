<script setup>
import {ref} from 'vue';

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(() => {
    console.log('refreshing.value: ', refreshing.value)
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
      console.log("init")
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }

  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};


const onClickLeft = () => history.back();
const onChange = (state) =>  {
  console.log(`onChange ${JSON.stringify(state)}`)
}

</script>

<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed placeholder @click-left="onClickLeft"/>
    <!--  下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，
          操作完成后将 v-model 设置为 false，表示加载完成。  -->
    <!--   是否处于加载中状态 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" @change="onChange">
      <!--  finished：是否已加载完成，加载完成后不再触发 load 事件    -->
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <!--   key是 Vue 特有的一个 特殊属性，用于在渲染列表（如使用 v-for）时优化性能。     -->
        <van-cell v-for="item in list" :key="item" :title="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>

</style>