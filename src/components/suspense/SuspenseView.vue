<script setup>
// 如果使用 <script setup>，那么顶层 await 表达式会自动让该组件成为一个异步依赖：

const res = await fetch('')
const posts = await res.json()
</script>

<template>
{{posts}}
</template>

<style scoped>

</style>