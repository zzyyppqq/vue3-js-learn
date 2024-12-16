<script setup>

import SimpleHeader from "@/newbee/componment/SimpleHeader.vue";
import {reactive} from "vue";

const state = reactive({
  type: 'login'
})


</script>

<template>
  <div class="login">
    <SimpleHeader :name="state.type == 'login' ? '登陆' : '注册'" :back="'/home'" />
  </div>
</template>

<style scoped lang="less">

</style>