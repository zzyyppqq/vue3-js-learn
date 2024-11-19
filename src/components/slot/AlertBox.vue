<script setup>

</script>

<template>
<div class="alert-box">
  <strong>这是一个错误框：</strong>
  <br/>
  <slot/>
</div>
</template>

<style scoped>
.alert-box {
  display: block;
  color: #666;
  border: 1px solid red;
  border-radius: 4px;
  padding: 10px;
  background-color: #eeeeee;
}
strong {
  color: #f4607b;
}

</style>