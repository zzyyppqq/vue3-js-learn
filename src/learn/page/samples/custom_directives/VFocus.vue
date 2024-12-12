<script setup>
// 在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。
// 在没有使用 <script setup> 的情况下，自定义指令需要通过 directives 选项注册：

// 在模版中启用v-focus
import {getCurrentInstance} from "vue";

const vFocus = {
  mounted: (el) => el.fontSize
}
// 局部指令
const app = getCurrentInstance()?.proxy?.$app;
app.directive('demo', (el, binding) => {
  console.log('color:', binding.value.color)
  console.log('text:', binding.value.text)
})

</script>

<template>
  <div>
    <input v-focus/>
    <div v-demo="{color: 'white', text: 'hello!'}"></div>
  </div>
</template>

<style scoped>

</style>