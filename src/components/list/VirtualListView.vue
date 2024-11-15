<template>
  <div class="scroll-list">
<!--    <RecycleScroller-->
<!--        :items="items"-->
<!--        :item-height="50"-->
<!--        @update:visible="onVisibleItemsUpdated">-->
<!--      <template #default="{ item }">-->
<!--        <div class="item">{{ item.name }}</div>-->
<!--      </template>-->
<!--    </RecycleScroller>-->

    <RecycleScroller
        class="scroller"
        :items="items"
        :item-size="10">
      <template #before>
        Hey! I'm a message displayed before the items!
      </template>

      <template v-slot="{ item }">
        <div class="user">
          {{ item.name }}
        </div>
      </template>
    </RecycleScroller>

    <div v-if="loading" class="loading">Loading...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'

const items = ref(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`
    }))
)

const loading = ref(false)

const onVisibleItemsUpdated = (visibleItems) => {
  // 判断是否滚动到列表底部
  const lastItem = visibleItems[visibleItems.length - 1]
  if (lastItem && lastItem.id === items.value.length) {
    loadMoreItems()
  }
}

const loadMoreItems = () => {
  if (loading.value) return
  loading.value = true

  // 模拟加载更多数据
  setTimeout(() => {
    const newItems = Array.from({ length: 50 }, (_, i) => ({
      id: items.value.length + i + 1,
      name: `Item ${items.value.length + i + 1}`
    }))

    items.value = [...items.value, ...newItems]
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.loading {
  text-align: center;
  padding: 10px;
  font-size: 16px;
}

 .scroller {
   height: 100px;
 }

.scroll-list {
  height: 400px;
  overflow-y: auto;
}
/*
.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
*/
</style>
