<script setup>
import {ref} from 'vue';
import {showToast} from 'vant';
import TabbarView from "@/components/phone/tabbar/TabbarView.vue";
import {useRouter} from "vue-router";
import OptionsApi from "@/components/options_api/OptionsApi.vue";

const router = useRouter()

const value = ref(50);
const onChange = (value) => showToast('当前值：' + value);

const onMyHome = () => {
  router.push({ path: '/my-home' })
}

const listViewPage = () => {
  router.push({ path: '/list-view' })
}

const vanListPage = () => {
  router.push({ path: '/van-list-view' })
}

const virtualListPage = () => {
  router.push({ path: '/virtual-list-view' })
}

</script>

<template>
  <div class="vertical-layout">
<!--    placeholder: 固定在顶部时，是否在标签位置生成一个等高的占位元素-->
    <van-nav-bar fixed="true" placeholder title="Home" />

    <div class="content">
      <van-button type="primary" @click="onMyHome">MyHome</van-button>
      <van-button @click="router.push('/learn-page')">learn page</van-button>
      <van-button type="success" @click="listViewPage">list</van-button>
      <van-button type="default" @click="vanListPage">van list</van-button>
      <van-button type="danger" @click="virtualListPage">virtual list</van-button>
      <van-button type="warning" @click="router.push('/canvas-view')">canvas view</van-button>
      <van-button @click="router.push('/webgl-view')">webgl view</van-button>
      <van-button @click="router.push('/webgpu-view')">webgpu view</van-button>

      <van-button plain disabled type="primary">禁用状态</van-button>
      <van-button disabled type="success">禁用状态</van-button>

      <van-slider v-model="value" @change="onChange"></van-slider>
      <br/>
      <VanSlider v-model="value" @change="onChange"></VanSlider>
      <br/>
      <OptionsApi title="1234"/>
      <br/>
      <OptionsApiTemplate title="1234"/>
      <DynamicComponent title="1234"/>
      <br/>
      <div class="div-center-flex">
        <p>居中</p>
      </div>
      <div class="div-center-grid">
        <p>居中</p>
      </div>
      <div class="div-center-line-h">
        <p>居中</p>
      </div>
      <div class="div-center-position">
        <p>居中</p>
      </div>

    </div>

    <TabbarView />
  </div>

</template>

<style scoped>

/*content区域需用单独的div包裹，通过padding-bottom，保证底部tabbar不覆盖内容*/
.content {
  flex: 1;  /* 让内容区域占据剩余空间 */
  overflow-y: scroll; /* 允许滚动 */
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: white;
}

.van-button {
  margin: 10px;
  /*display: block;*/
}

/*align-content: 只适用于 Flex 或 Grid 布局，当容器内有多个行或列时，它控制这些行或列的 对齐方式。*/
.div-center-flex {
  display: flex;
  justify-content: center; /* 主轴：水平居中 */
  align-items: center; /* 交叉轴: 垂直居中 */
  width: 100px; /* 设置容器宽度 */
  height: 100px; /* 设置容器高度 */
  background-color: #33adc4;
  margin: 10px;
  font-size: 20px;
  color: #f90a0a;
}

.div-center-grid {
  width: 100px;
  height: 100px;
  display: grid;           /* 使用 Grid 布局 */
  place-items: center;     /* 横向和纵向都居中 */
  background-color: #4CAF50;
  color: #f4607b;
  margin: 10px;
}

/*使用 line-height （只适用于单行文本）*/
.div-center-line-h {
  width: 100px;
  height: 100px;
  text-align: center;/* 水平中心*/
  line-height: 100px;
  background-color: #4CAF50;
  margin: 10px;
}

.div-center-position {
  width: 100px;
  height: 100px;
  position: relative;   /* 相对定位容器 */
  background-color: #33adc4;
  margin: 10px;
}

.div-center-position p {
  position: absolute;   /* 绝对定位文本 */
  top: 50%;             /* 向下50% */
  left: 50%;            /* 向右50% */
  transform: translate(-50%, -50%); /* 向上和向左移动自身的50% */
}

</style>