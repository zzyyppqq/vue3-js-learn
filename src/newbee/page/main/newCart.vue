<script setup >

import {onMounted, reactive} from "vue";
import {closeToast, showLoadingToast} from "vant";
import {getCart} from "@/newbee/service/cartApi.js";

const state = reactive({
  list: [],
  result: []
})
onMounted(() => {
  init()
})

const init = async () => {
  showLoadingToast({message: '加载中...', forbidClick: true})
  const  {data} = await getCart({pageNumber: 1})
  state.list = data
  state.result = data.map(item => item.cartItemId)
  closeToast()
};

</script>

<template>
<h1>Cart</h1>
</template>

<style scoped>

</style>