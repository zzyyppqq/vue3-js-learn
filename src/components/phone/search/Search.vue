<script setup>

import TabbarView from "@/components/phone/tabbar/TabbarView.vue";
</script>

<template>
  <!--  <div>-->
  <div>
    <TabbarView/>
    <div class="content">
      <div class="container">
        <van-search></van-search>
        <van-button type="success">Search</van-button>
      </div>

      <van-button type="success">1111</van-button>
    </div>
  </div>
  <!--  </div>-->
</template>

<style scoped>
.content {
  flex: 1; /* 让内容区域占据剩余空间 */
  overflow-y: scroll; /* 允许滚动 */
  padding-bottom: 100px;
  background-color: cornflowerblue;/*超过一屏幕的颜色设置*/
}

.container {
  /*激活 Flexbox 布局模型，使得元素的直接子元素变成 Flex 项目*/
  display: flex; /* 激活 Flexbox 布局，默认子控件顺序水平放置*/
  flex-direction: row; /* 水平方向排列，默认值 */
  align-items: center; /* 子控件，垂直居中对齐 */
}

.van-search {
  flex-grow: 1; /* input 占据剩余空间 */
}

.van-button {
  width: 100px; /* 按钮固定宽度 */
  text-align: center; /* 使按钮文字居中 */
  margin: 10px;
}


</style>