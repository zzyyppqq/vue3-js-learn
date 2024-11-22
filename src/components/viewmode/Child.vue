<script setup>
import {ref, defineModel, defineProps, defineEmits} from "vue";

const model = defineModel()

// 在 3.4 版本之前，你一般会按照如下的方式来实现上述相同的子组件：
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <div>
    <input v-model="model"/>
    <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)"/>
  </div>
</template>

<style scoped>
div input {
  //display: block;
  //display: flex;
  //flex-direction: column;
}
</style>