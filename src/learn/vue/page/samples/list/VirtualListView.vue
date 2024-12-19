<script setup>
import { ref } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'

const initItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}))

const items = ref(initItems)

const loading = ref(false)

const loadMoreItems = () => {
  if (refreshing.value) {
    items.value = initItems;
    refreshing.value = false;
    console.log("init")
  }
  if (items.value.length > 200) {
    return;
  }

  if (loading.value) return
  loading.value = true

  // 模拟加载更多数据
  setTimeout(() => {
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: items.value.length + i + 1,
      name: `Item ${items.value.length + i + 1}`
    }))

    items.value = [...items.value, ...newItems]
    loading.value = false
  }, 2000)
}

const onUpdate = (viewStartIndex, viewEndIndex, visibleStartIndex, visibleEndIndex) => {
  console.log(`onUpdate: ${viewStartIndex}, ${viewEndIndex}, ${visibleStartIndex}, ${visibleEndIndex}`)
}

const onVisible = () => {
  console.log('visible')
}

const onHidden = () => {
  console.log('hidden')
}

const onScrollStart = () => {
  console.log('scroll start')
}

const onScrollEnd = () => {
  console.log('scroll end')
  //onScrollEnd 加载数据，会导致自动执行，故使用onScroll回调
  loadMoreItems()
}


const refreshing = ref(false);

const onRefresh = () => {
  console.log("onRefresh")
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  loadMoreItems();
};

const onScroll = (event) => {
  const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight
  console.log(`bottom: ${bottom}`)
  if (bottom) {
    loadMoreItems()
  }
}

const onClickLeft = () => history.back();
</script>

<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed placeholder @click-left="onClickLeft"/>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <RecycleScroller
          class="scroller"
          :buffer="200"
          :items="items"
          :item-size="50"
          v-slot="{item}"
          @update="onUpdate"
          @visible="onVisible"
          @hidden="onHidden"
          @scroll-start="onScrollStart"
          @scroll-end="onScrollEnd"
      >
          <div class="user">
            {{ item.name }}
          </div>
      </RecycleScroller>
    </van-pull-refresh>
    <div v-if="loading" class="loading">加载更多数据...</div>
  </div>
</template>

<style scoped>

.loading {
  height: 50px;
  display: flex;
  justify-content: center; /* 主轴：水平居中 */
  align-items: center; /* 交叉轴: 垂直居中 */
  padding: 5px;
  font-size: 16px;
  background-color: #63b9e4;
}

.scroller {
   height: 100%;
 }

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
