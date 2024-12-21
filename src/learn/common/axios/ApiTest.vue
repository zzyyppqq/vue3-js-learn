<script setup>
// import api from '@/common/axios/api' // 导入api接口
// VUE2: Vue.prototype.$api = api; // 将api挂载到vue的原型上
// VUE3: app.config.globalProperties.$api = api;
// 使用 Provide/Inject: app.provide('api', api);const api = inject('api');
// this.$api.article.login()

import {onMounted} from "vue";
import {article} from "@/learn/common/axios/api/index.js";
onMounted(() => {
  article.login({username: 'zyp', password: '123'})
      .then(res => {
        console.log(`res: ${res.data}`)
      }).catch(err => {
        console.log(`err: ${err}`)
      })
})
</script>

<template>

</template>

<style scoped>

</style>