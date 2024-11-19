<script>
import {ref} from "vue";

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
  `
}
</script>

<template>

</template>

<style scoped>

</style>