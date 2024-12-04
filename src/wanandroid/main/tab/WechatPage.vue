<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
console.log("WechatPage route fullPath: ", route.fullPath)

</script>

<template>
<h1>WechatPage</h1>
</template>

<style scoped>

</style>