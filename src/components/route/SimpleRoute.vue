<script setup>

import Home from "@/components/dynamic_component/sub/Home.vue";
import Posts from "@/components/dynamic_component/sub/Posts.vue";
import Archive from "@/components/dynamic_component/sub/Archive.vue";
import NotFound from "@/components/dynamic_component/sub/NotFound.vue";
import {computed, ref} from "vue";

const routes = {
  '/': Home,
  '/posts': Posts,
  '/archive': Archive
}

const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>

  <div>
    <a href="#/">Home</a>
    <a href="#/posts">Posts</a>
    <a href="#/archive">Archive</a>
    <a href="#/non-existent-path">Broken Link</a>
    <component :is="currentView"/>
  </div>
</template>

<style scoped>

</style>