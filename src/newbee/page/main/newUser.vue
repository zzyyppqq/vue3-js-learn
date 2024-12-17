<script>
import {getCurrentInstance, ref} from "vue";
import TabBarView from "@/newbee/componment/TabBarView.vue";

export default {
  name: 'new-user',
  components: {TabBarView},
  setup() {
    const title = ref('')
    title.value = 'User'
    const instance = getCurrentInstance(); // 获取当前组件实例
    console.log(`instance: ${instance}`)
    if (instance) {
      // 获取 globalProperties 中的值
      const app = instance.appContext.config.globalProperties.$app;
      const router = instance.appContext.config.globalProperties.$router;
      console.log(`app: ${app}, router: ${router}`)
    }
    return { title }
  },
  data() { // 为什么vue中data必须是一个函数？重用组件时每次返回的data对象都是新对象
    return {
      msg: 'Vue3 Component'
    };
  },
  method() {

  },
  mounted() {
    console.log('app =>', this.$app); // 输出: My Vue 3 App
    console.log('router =>', this.$router);  // 输出: https://api.example.com
  }
};
</script>

<template>
  <div>
    <h1>User</h1>
    <p>{{title}}</p>
    <p>{{msg}}</p>
    <TabBarView/>
  </div>
</template>

<style scoped>

</style>