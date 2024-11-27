<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';


const value = ref(50);
const onChange = (value) => showToast('当前值：' + value);

const active = ref(0);

</script>

<template>
  <div class="div-full">
    <van-button plain type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="warning">警告按钮</van-button>

    <van-button disabled type="primary">禁用状态</van-button>
    <van-button disabled type="success">禁用状态</van-button>

    <VanButton>123</VanButton>
    <VanButton>123</VanButton>
    <VanButton>123</VanButton>
    <VanButton>123</VanButton>
    <br/>

    <van-slider v-model="value" @change="onChange" ></van-slider>
    <br/>
    <br/>
    <VanSlider  v-model="value" @change="onChange" ></VanSlider>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>


<!--    <div class="tab-bar">-->
<!--      <span>111</span>-->
<!--    </div>-->
  </div>

</template>

<style scoped>
.div-full {
  height: calc(100% - 50px);
}
.van-button {
  margin: 10px;
  display: block;
}
.van-tabbar {
  background-color: #d45555;
}

.div-bottom {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #d45555;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #d45555;
  padding: 10px; /* 可根据需要调整底部 TabBar 的内边距 */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
}
</style>