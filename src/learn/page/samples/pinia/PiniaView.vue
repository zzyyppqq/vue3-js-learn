<script setup>
import {computed} from "vue";
import {storeToRefs} from "pinia";
// 可以在组件中的任意位置访问 `store` 变量
import {useCounterStore, useIdStore} from "@/learn/stores/counter.js";


const store = useCounterStore()
// 这样写是响应式的
setTimeout(() => {
  store.increment()
}, 1000)
// 当然你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => {
  store.doubleCount
})
// name、doubleCount不是响应式的
// const { name, doubleCount } = store
// 为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()
const {name, doubleCount} = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store

const storeId = useIdStore()

// 访问 state
store.count ++
// 重置 state
// 使用选项式 API 时，你可以通过调用 store 的 $reset() 方法将 state 重置为初始值
store.$reset()
// 在 Setup Stores 中，您需要创建自己的 $reset() 方法：





</script>

<template>

</template>

<style scoped>

</style>