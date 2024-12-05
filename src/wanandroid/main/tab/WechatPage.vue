<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {inject} from "vue";

const route = useRoute()
const router = useRouter()
console.log("WechatPage route fullPath: ", route.fullPath)

const toolHeight = inject("toolBarHeight")
console.log("WechatPage toolHeight: ", toolHeight.value)
</script>

<template>
<h1>WechatPage</h1>
</template>

<style scoped>

</style>