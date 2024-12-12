<script setup>
import {ref} from "vue";
import Child from "@/learn/page/samples/viewmode/Child.vue";

const msg = ref('Hello World!')
const foo = ref('fo')
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <h1>{{ foo }}</h1>
    <child v-model="msg"></child>
    <child :modelValue="foo" @update:modelValue="$event => (foo = $event)"></child>
  </div>
</template>

<style scoped>
div h1 {
  display: block;
}
</style>