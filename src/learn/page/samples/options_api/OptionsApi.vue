<script>
import {ref} from "vue";

// 如果你正在使用选项式 API，组合式函数必须在 setup() 中调用。
// 且其返回的绑定必须在 setup() 中返回，以便暴露给 this 及其模板：
export default {
  name: "OptionsApi",
  props: ['title'],
  setup(props) {
    // 在 setup() 中，this 指向的并不是 Vue 实例，因此不能直接使用 this.props 或 this.count 等。
    const count = ref(0)
    console.log(props.title)
    return { count }
  },
  mounted() {
    // 在 mounted() 中，this 指向 Vue 实例
    // setup() 暴露的属性可以在通过 `this` 访问到
    console.log(this.count)
    // props title
    console.log(this.title)
    console.log("$index: ", this.$router)
    console.log("$index: ", this.$route)
  }
}
</script>

<template>
  <van-button @click="count++">You click me {{count}} times.</van-button>
</template>

<style scoped>

</style>