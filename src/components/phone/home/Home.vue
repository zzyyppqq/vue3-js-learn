<script setup>
import {ref} from 'vue';
import {showToast} from 'vant';
import TabbarView from "@/components/phone/tabbar/TabbarView.vue";
import {useRouter} from "vue-router";
const router = useRouter()

const value = ref(50);
const onChange = (value) => showToast('当前值：' + value);

const onMyHome = () => {
  router.push({ path: '/my-home' })
}


</script>

<template>
  <div>
    <TabbarView />
    <div class="content">
      <van-button plain type="primary" @click="onMyHome">MyHome</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button type="warning">警告按钮</van-button>

      <van-button disabled type="primary">禁用状态</van-button>
      <van-button disabled type="success">禁用状态</van-button>

      <div class="div-center">
        <p>居中</p>
      </div>
      <div class="div-center2">
        <p>居中</p>
      </div>



      <van-slider v-model="value" @change="onChange"></van-slider>
      <br/>
      <VanSlider v-model="value" @change="onChange"></VanSlider>
    </div>


  </div>

</template>

<style scoped>
/*content区域需用单独的div包裹，通过padding-bottom，保证底部tabbar不覆盖内容*/
.content {
  flex: 1;  /* 让内容区域占据剩余空间 */
  overflow-y: scroll; /* 允许滚动 */
  padding-bottom: 100px;
  background-color: white;
}

.van-button {
  margin: 10px;
  /*display: block;*/
}

.div-center {
  width: 100px;
  height: 100px;
  text-align: center;/* 水平中心*/
  align-content: center;/* 竖直中心*/
  background-color: #4CAF50;
  margin: 10px;
}

.div-center2 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100px; /* 设置容器宽度 */
  height: 100px; /* 设置容器高度 */
  background-color: #33adc4;
  margin: 10px;
  font-size: 20px;
  color: #f90a0a;
}

</style>