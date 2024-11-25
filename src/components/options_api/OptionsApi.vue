<script>
import {ref} from "vue";

// 如果你正在使用选项式 API，组合式函数必须在 setup() 中调用。
// 且其返回的绑定必须在 setup() 中返回，以便暴露给 this 及其模板：
export default {
  name: "OptionsApi",
  props: ['title'],
  setup() {
    const count = ref(0)
    console.log(this.props.title)
    return { count }
  },
  template: `
    <button @click="count++">You click me {{count}} times.</button>
  `,
  mounted() {
    // setup() 暴露的属性可以在通过 `this` 访问到
    console.log(this.count)
  }
}
</script>

<template>

</template>

<style scoped>

</style>