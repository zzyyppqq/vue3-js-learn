<script setup>

import {ref} from "vue";
import {showToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()


const tabBarChange = (index) => {
  showToast(`标签 ${index}`);
}
</script>

<template>

  <div class="tab-bar">
    <div class="tab-bar-content">
      <div class="tab-bar-item" @click="tabBarChange(0)">
        <!--  Unicode使用方式   -->
        <span class="iconfont">&#xe60a;</span>
        <span>111</span>
      </div>
      <div class="tab-bar-item" @click="tabBarChange(1)">
        <!--  Font class使用方式    -->
        <span class="iconfont icon-home_home_h"></span>
        <span>111</span>
      </div>
      <div class="tab-bar-item" @click="tabBarChange(2)">
        <img src="/favicon.ico"/>
        <span>111</span>
      </div>
      <div class="tab-bar-item" @click="tabBarChange(3)">
        <img src="/favicon.ico"/>
        <span>111</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.tab-bar-item {
  display: flex;
  flex-direction: column;
  flex: 1; /* 每个 tab-item 平分父容器的宽度 */
  text-align: center; /* 水平居中 */
  align-content: center; /* 竖直中心*/
  vertical-align: center;
  justify-content: center;
  align-items: center;
  width: 0px;
  height: 80px;
  margin: 0px;
  background-color: cornflowerblue;
  font-size: 20px;
  font-style: normal;
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s, color 0.3s; /* 添加过渡动画 */
}


.tab-bar-item:hover {
  background-color: #4CAF50; /* 鼠标悬停时改变背景颜色 */
}

.tab-bar-item:active {
  background-color: #ddd; /* 选中项的背景颜色 */
  color: white; /* 选中项字体颜色 */
}

.tab-bar-content {
  display: flex;
  flex-direction: row; /* 水平方向排列，默认值 */
  align-items: center; /* 子控件，垂直居中对齐 */
  justify-content: space-around; /* 各 tab-item 平均分布 */
}

/*自定义底部bar*/
.tab-bar {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #d45555;
  padding: 0px; /* 可根据需要调整底部 TabBar 的内边距 */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
  z-index: 100;
}


@font-face {
  font-family: "iconfont"; /* Project id 4761145 */
  src: url('//at.alicdn.com/t/c/font_4761145_2mpcebvm01v.woff2?t=1732671017559') format('woff2'),
  url('//at.alicdn.com/t/c/font_4761145_2mpcebvm01v.woff?t=1732671017559') format('woff'),
  url('//at.alicdn.com/t/c/font_4761145_2mpcebvm01v.ttf?t=1732671017559') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-home_home_h:before {
  content: "\e60a";
}
</style>