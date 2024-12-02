<script setup>

import TabbarView from "@/components/phone/tabbar/TabbarView.vue";
import api from "@/http/axios_simple.js";
import apiService from "@/http/apiService"

console.log("http getHomeList")
apiService.getHomeList(1).then((json) => {
  console.log("json: ", JSON.stringify(json))
})

api.fetchHome2()



</script>

<template>
  <div>
    <TabbarView/>
    <p>
      <img src="/public/favicon.ico" alt="" width="100">
      在一个一个炎热的下午，大家注意，一定要是炎热的下午，为什么要是炎热的下午呢，因为天气一热，人就容易烦躁，人一烦躁就不想工作，不工作就想看片儿（注意看片儿不是看电影），但是你知道的越看片儿越烦躁，正在这个时候老板娘进来来了，对js的作者布莱登·艾克说，小艾啊你看我们用猫上网的时候用户名密码填错了结果等一两分钟返回结果的时候才知道是错了，你看你能不能搞一个程序让我在请求之前就知道我写错了，其实小艾心里不想搞，但是大家都懂的，老板好拒绝，老板娘的需求是不好拒绝的，所以布莱登艾克心想赶紧随便糊弄一下算了，片儿还没看完呢，所以他就用了8天半（官方说）10天，其实另外的一天半被他用来看片儿了。大家懂的，你看片儿的时候有心思写代码吗？所以js的bug如山一样多，这个我们以后说。
    </p>
  </div>
</template>

<style scoped>

p {
  margin: 10px;
  color: #1a1a1a;
}
img {
  float: left;
}
</style>