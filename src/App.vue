<!--
<script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
-->
<script setup>
import FullScreenApp from "@/app/FullScreenApp.vue";
import PhoneApp from "@/app/PhoneApp.vue";
import WanAndroidApp from "@/app/WanAndroidApp.vue";
import {useRoute, useRouter} from "vue-router";


const route = useRoute()
const router = useRouter()
console.log("App index fullPath: ", route.fullPath)


</script>

<template>
    <WanAndroidApp />
</template>

<style scoped>

</style>
