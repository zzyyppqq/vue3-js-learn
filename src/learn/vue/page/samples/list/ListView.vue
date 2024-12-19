<template>
  <div class="scroll-list" @scroll="onScroll">
    <div v-for="(item, index) in visibleItems" :key="index" class="list-item">
      {{ item }}
    </div>
    <div v-if="loading" class="loading">Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref(Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`))
const visibleItems = ref(items.value.slice(0, 20))
const loading = ref(false)

const onScroll = (event) => {
  const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight
  if (bottom && !loading.value) {
    loading.value = true
    // 模拟加载数据
    setTimeout(() => {
      const nextItems = items.value.slice(visibleItems.value.length, visibleItems.value.length + 20)
      visibleItems.value = [...visibleItems.value, ...nextItems]
      loading.value = false
    }, 1000)
  }
}

onMounted(() => {
  // 初始化加载更多数据
})
</script>

<style scoped>
.scroll-list {
  height: 100%;
  overflow-y: auto;
}

.list-item {
  padding: 10px;
  align-content: center;
  height: 50px;
  background-color: #63b9e4;
  margin: 2px;
}

.loading {
  text-align: center;
}


</style>
