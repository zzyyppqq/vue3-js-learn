<!--
<script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
-->
<script setup>
import ListView from "@/components/list/ListView.vue";
import VirtualListView from "@/components/list/VirtualListView.vue";
import {ref,watch, shallowRef, reactive, computed } from "vue";
import {useMouse, useEventListener} from "@/js/mouse.js";
import {useFetch} from "@/js/fetch.js";

// 在模板中使用 ref 时，我们不需要附加 .value
const {x, y} = useMouse()
const {data, error} = useFetch('https://www.baidu.com')

const count = ref(0)

const isShow = ref(false)

function changeState() {
  if (isShow.value === false) {
    isShow.value = true
  } else {
    isShow.value = false
  }
}
// reactive的每个属性都会代理
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
// 计算属性值会基于其响应式依赖被缓存
const booksMessage = computed(() => {
  return author.books.length > 0? 'yes': 'no'
})

const message = ref('');
watch(message, async(newMessage, oldMessage) => {

})

</script>

<template>
  <header>
    <div>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="12" height="12" />

      <div class="wrapper">
        <p>Mouse position is at: {{ x }}, {{ y }}</p>
      </div>
      <div>
        <p>Message is: {{ message }}</p>
        <input v-model="message" placeholder="edit me"/>
      </div>
    </div>
  </header>

  <main>
    <div>
      <button v-on:click="changeState">changeState</button>
      <p v-if="isShow">Now you see me</p>
      <button @click="count++">
        {{ count }}
      </button>
      <div>
        <p>Has published books:</p>
        <span>{{ booksMessage }}</span>
      </div>

    </div>
    <div>
      <div v-if="error">errror：{{ error.message }}</div>
      <div v-else-if="data">data: <pre>{{data}}</pre></div>
      <div v-else>Loading...</div>
    </div>

<!--    <ListView/>-->
    <VirtualListView/>
  </main>
</template>

<!--
在 Vue.js 中，<style scoped> 是用于使样式仅作用于当前组件的 <template> 部分。
当你使用 scoped 时，样式会被局部化，确保它只影响当前组件的元素，而不会影响到外部的全局样式。
-->
<style scoped>

/*div button换行*/
div button {
  display: block;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
