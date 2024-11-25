<!--
<script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
-->
<script setup>
import ListView from "@/components/list/ListView.vue";
import VirtualListView from "@/components/list/VirtualListView.vue";
import {ref, watch, shallowRef, reactive, computed, watchEffect, getCurrentInstance, inject} from "vue";
import {useMouse, useEventListener} from "@/js/mouse.js";
import {useFetch} from "@/js/fetch.js";
import OptionsApi from "@/components/options_api/OptionsApi.vue";
import BlogPost from "@/components/props/BlogPost.vue";
import AlertBox from "@/components/slot/AlertBox.vue";
import TabView from "@/components/dynamic_component/TabView.vue";
import Parent from "@/components/viewmode/Parent.vue";
import Provide from "@/components/provide_inject/Provide.vue";
//  模版引用
import {useTemplateRef, onMounted} from "vue";
import {xyWatch, priceWatch, watchFunction} from "@/js/watch.js";

import VFocus from "@/components/custom_directives/VFocus.vue";
import TransitionView from "@/components/transition/TransitionView.vue";
import TeleportView from "@/components/teleport/TeleportView.vue";
import SimpleRoute from "@/components/route/SimpleRoute.vue";

// 在模板中使用 ref 时，我们不需要附加 .value
const {x, y} = useMouse()
const {data, error} = useFetch('')

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
  return author.books.length > 0 ? 'yes' : 'no'
})

const message = ref('');
// 监听输入框
watch(message, async (newMessage, oldMessage) => {
  console.log(`watch newMessage: ${newMessage}, oldMessage: ${oldMessage}`)
})

xyWatch(x, y)

const price = priceWatch()
price.value = '1234'

watchFunction()


const input = useTemplateRef(`in-input`)
onMounted(() => {
  if (input.value) {
    input.value.focus()
  }
})
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  }
})
const list = ref(['aaa', 'bbb', 'ccc'])
const itemRefs = useTemplateRef('items')
onMounted(() => console.log('items:', itemRefs.value))


const posts = ref([
  {id: 1, title: 'My journey with Vue'},
  {id: 2, title: 'Blogging with Vue'},
  {id: 3, title: 'Why Vue is so fun'}
])
const postFontSize = ref(1)

onMounted(() => {
  const app = getCurrentInstance()?.proxy?.$app;
  console.log(`app: ${app}`)
  const app2 = inject('appInstance');
  console.log(`app2: ${app2}`); // 访问 app 实例
  console.log(app === app2)

})

const i18n = inject('i18n')
console.log(i18n.greetings.hello)
</script>

<template>
  <header>
    <div>
      <SimpleRoute />
      <TeleportView />
      <TransitionView />
      <h1>translate: {{ $translate('greetings.hello') }}</h1>
      <VFocus />
      <Provide/>
      <Parent />
      <TabView/>
      <AlertBox>123</AlertBox>
      <div :style="{fontSize: postFontSize + 'em'}">
        <BlogPost title="My Demo"/>
        <BlogPost v-for="post in posts" :key="post.id" :title="post.title"
                  @enlarge-text="postFontSize += 0.1" @enlarge-text1="postFontSize += 0.2"/>
      </div>
      <!--      <OptionsApi></OptionsApi>-->
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="12" height="12"/>

      <div class="wrapper">
        <p>Mouse position is at: {{ x }}, {{ y }}</p>
      </div>
      <div>
        <p>Message is: {{ message }}</p>
        <input v-model="message" placeholder="edit me" ref="my-input"/>
      </div>
      <div>
        <ul>
          <li v-for="item in list" ref="items">{{ item }}</li>
        </ul>
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
      <div v-else-if="data">data:
        <pre>{{ data }}</pre>
      </div>
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
