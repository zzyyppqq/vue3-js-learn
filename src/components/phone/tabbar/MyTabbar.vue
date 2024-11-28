<script setup>

</script>

<template>
  <div class="tab-bar">
    <div class="tab-bar-content">
      <div class="tab-bar-item">
          <img src="../../../../public/favicon.ico"/>
          <span>111</span>
      </div>
      <div class="tab-bar-item">
        <img src="../../../../public/favicon.ico"/>
        <span>111</span>
      </div>
      <div class="tab-bar-item">
        <img src="../../../../public/favicon.ico"/>
        <span>111</span>
      </div>
      <div class="tab-bar-item">
        <img src="../../../../public/favicon.ico"/>
        <span>111</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.tab-bar-item {
  display: flex;
  flex-direction: column;
  flex: 1;  /* 每个 tab-item 平分父容器的宽度 */
  text-align: center;  /* 水平居中 */
  align-content: center;/* 竖直中心*/
  vertical-align: center;
  justify-content: center;
  align-items: center;
  width: 0px;
  height: 100px;
  margin: 0px;
  background-color: cornflowerblue;
  font-size: 20px;
  font-style: normal;
  cursor: pointer;  /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s, color 0.3s;  /* 添加过渡动画 */
}


.tab-bar-item:hover {
  background-color: #4CAF50;  /* 鼠标悬停时改变背景颜色 */
}

.tab-bar-item:active {
  background-color: #ddd;  /* 选中项的背景颜色 */
  color: white;  /* 选中项字体颜色 */
}

.tab-bar-content {
  display: flex;
  flex-direction: row; /* 水平方向排列，默认值 */
  align-items: center; /* 子控件，垂直居中对齐 */
  justify-content: space-around;  /* 各 tab-item 平均分布 */
}

/*自定义底部bar*/
.tab-bar {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #d45555;
  padding: 0px; /* 可根据需要调整底部 TabBar 的内边距 */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
  z-index: 100;
}
</style>