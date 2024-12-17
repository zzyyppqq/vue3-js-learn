<script setup >

import {getCurrentInstance, onMounted, reactive} from "vue";
import {closeToast, showLoadingToast} from "vant";
import {getCart} from "@/newbee/service/cartApi.js";
import {getGlobalProperties} from "@/app/global/index.js";
import TabBarView from "@/newbee/componment/TabBarView.vue";

const state = reactive({
  list: [],
  result: []
})
onMounted(() => {
  init()
})

const init = async () => {
  console.log(`getCurrentInstance = ${getCurrentInstance()}`)
  showLoadingToast({message: '加载中...', forbidClick: true})
  const  {data} = await getCart({pageNumber: 1})
  state.list = data
  state.result = data.map(item => item.cartItemId)
  closeToast()
};

</script>

<template>
  <div>
    <h1>Cart</h1>
    <TabBarView/>
  </div>
</template>

<style scoped>

</style>