<script setup>

import MyTabbar from "@/learn/vue/page/phone/tabbar/MyTabbar.vue";

const onClickLeft = () => history.back();

</script>

<template>
  <div>
    <MyTabbar/>

    <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </div>
</template>

<style scoped>

</style>