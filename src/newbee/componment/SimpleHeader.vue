<script setup>

import {ref, defineProps} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const props = defineProps({
  name: 'login',
  back: '/home',
  noback: false
})

const emits = defineEmits(["callback"])

const isBack = ref(false)

const goBack = () => {
  if (props.back) {
    router.push({path: props.back})
  } else {
    router.go(-1)
  }
  emits("callback")
}

</script>

<template>
  <header class="simple-header van-hairline--bottom">
    <i v-if="!isBack" class="nbicon nbfanhui" @click="goBack"></i>
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <div class="simple-headerr-name">{{ name }}</div>
    <i class="nbicon nbmore"></i>
  </header>
  <div class="block"/>
</template>

<style scoped lang="less">
.simple-header {
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}
</style>