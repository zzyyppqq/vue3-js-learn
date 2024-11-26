<script setup>
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
// 可以通过 useRouter() 和 useRoute() 来访问路由器实例和当前路由。
const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({query: {search}})
  }
})
</script>

<template>
  <div>
    <h2>AboutView</h2>
    <label>
      Search: <input v-model.trim="search" maxlength="20">
    </label>
  </div>
</template>

<style scoped>
div {
  background-color: #666666;
}
</style>