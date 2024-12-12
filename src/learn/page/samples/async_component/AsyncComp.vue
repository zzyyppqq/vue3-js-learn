<script setup>
//  在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。
//  Vue 提供了 defineAsyncComponent 方法来实现此功能：
import {defineAsyncComponent} from "vue";

const AsyncComp = defineAsyncComponent(() => {
  import('./SubComp.vue')
  return new Promise((resolve, reject) => {

    resolve()
  })
})

// 与普通组件一样，异步组件可以使用 app.component() 全局注册：


</script>

<template>

</template>

<style scoped>

</style>