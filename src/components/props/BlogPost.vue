<script setup>
import {ref, defineProps, defineEmits} from "vue";

const props = defineProps(['title'])
console.log(props.title)
const emit = defineEmits(['enlarge-text1'])
emit('enlarge-text1')

</script>

<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text1')">Enlarge text</button>
  </div>

</template>

<style scoped>

</style>