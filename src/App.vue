<!--
<script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
-->
<script setup>
import FullScreenApp from "@/app/FullScreenApp.vue";
import PhoneApp from "@/app/PhoneApp.vue";
import WanAndroidApp from "@/app/WanAndroidApp.vue";
import {useRoute, useRouter} from "vue-router";
import NewBeeApp from "@/app/NewBeeApp.vue";


const route = useRoute()
const router = useRouter()
console.log("App index fullPath: ", route.fullPath)


</script>

<template>
  <template v-if="$appName==='wanandroid'"><WanAndroidApp /></template>
  <template v-else-if="$appName==='newbee'"><NewBeeApp /></template>
  <template v-else-if="$appName=='phoneapp'"><PhoneApp /></template>
  <template else><FullScreenApp /></template>

</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
</style>
