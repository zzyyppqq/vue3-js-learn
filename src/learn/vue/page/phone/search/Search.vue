<script setup>
import TabbarView from "@/learn/vue/page/phone/tabbar/TabbarView.vue";

</script>

<template>
  <div>
    <div class="content">
      <div class="div-search">
        <van-search></van-search>
        <van-button type="success">Search</van-button>
      </div>

      <div class="div-container">
        <div class="div-side">
          <span>side</span>
          <span>side</span>
          <span>side</span>
        </div>
        <div class="div-main">
          <span>main</span>
        </div>
      </div>
    </div>
    <TabbarView/>
  </div>
</template>

<style lang="less" scoped>

.content {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #cb95e0; /*超过一屏幕的颜色设置*/
}

.div-search {
  /*激活 Flexbox 布局模型，使得元素的直接子元素变成 Flex 项目*/
  display: flex; /* 激活 Flexbox 布局，默认子控件顺序水平放置*/
  flex-direction: row; /* 水平方向排列，默认值 */
  flex-wrap: nowrap;
  align-items: center; /* 子控件，垂直居中对齐 */
  justify-content: flex-end; /* 确保元素从左侧开始排列 */

  .van-search {
    flex-grow: 1; /* input 占据剩余空间 */
  }

  .van-button {
    width: 100px; /* 按钮固定宽度 */
    text-align: center; /* 使按钮文字居中 */
    margin: 10px;
  }
}

.div-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .div-side {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 30%;
    height: 100%;
    background-color: #4CAF50;
  }

  .div-main {
    flex-grow: 1;
    width: 70%;
    height: 100%;
    background-color: #d45555;
  }
}


</style>