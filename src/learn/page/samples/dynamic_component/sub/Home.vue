<script setup>
import {ref} from "vue";

const count = ref(0)
</script>

<template>
  <div class="tab">
    Home component
    <div>
      <span>count: {{count}}</span>
      <button @click="count++">+</button>
    </div>
  </div>
</template>

<style scoped>
div {
  display: block;
}
</style>