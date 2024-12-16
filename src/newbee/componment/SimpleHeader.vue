<script setup>

import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const isBack = ref(false)

const goBack = ()=> {
  router.back()
}

</script>

<template>
  <header class="simple-header van-hairline--bottom">
    <i v-if="!isBack" class="nbicon nbfanhui" @click="goBack"></i>
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <div class="simple-headerr-name">{{name}}</div>
    <i class="nbicon nbmore"></i>
  </header>
  <div class="block"/>
</template>

<style scoped lang="less">

</style>