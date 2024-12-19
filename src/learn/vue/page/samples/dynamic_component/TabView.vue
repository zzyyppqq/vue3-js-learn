<script setup>
import Home from "@/learn/vue/page/samples/dynamic_component/sub/Home.vue";
import Posts from "@/learn/vue/page/samples/dynamic_component/sub/Posts.vue";
import Archive from "@/learn/vue/page/samples/dynamic_component/sub/Archive.vue";
import {ref} from "vue";

const currentTab = ref('Home')
const tabs = {Home, Posts, Archive}


</script>

<template>
  <div class="demo">
    <button v-for="(_, tab) in tabs" :key="tabs"
            :class="['tab-button', {active: currentTab === tab }]"
            @click="currentTab = tab">{{ tab }}
    </button>
    <!-- 为过渡效果命名 被应用的 class 将会是 fade-enter-active 而不是 v-enter-active-->
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <component :is="tabs[currentTab]" class="tab"></component>
      </KeepAlive>
    </Transition>
  </div>
</template>

<style scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 10px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}

.tab-button:hover {
  background: #d45555;
}

.tab-button.active {
  background: #e0e0e0;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>