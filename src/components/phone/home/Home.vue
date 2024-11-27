<script setup>

</script>

<template>
  <div>

    <van-button plain type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="warning">警告按钮</van-button>

    <van-button disabled type="primary">禁用状态</van-button>
    <van-button disabled type="success">禁用状态</van-button>

  </div>
</template>

<style scoped>
div {
  display: block;
  padding: 10px;
}
.van-button {
  margin: 10px;
}
</style>