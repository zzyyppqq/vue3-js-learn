<script setup>

import {onMounted} from "vue";

const onClickLeft = () => history.back()

onMounted(() => {
  const canvas = document.querySelector("#drawing");
  console.log(`canvas: ${canvas}`)
  if(canvas.getContext){
    const ctx = canvas.getContext("2d");
    console.log(`context: ${ctx}`)

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);

    // 斜着来
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    // 添加颜色
    grad.addColorStop(0, 'yellow');
    grad.addColorStop(0.5, 'red');
    grad.addColorStop(1, 'blue');
    // 画矩形
    ctx.fillStyle = grad; //将渐变加入到矩形中
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = '#eeeeef';
    ctx.fillRect(0, 0, 600, 700);
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath();
      ctx.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,0,0,0.25)';
      ctx.fill();
    }

    drawShape(ctx)

  }
})

const drawShape = (context) => {
  context.strokeStyle = 'red';
  context.fillStyle = 'green';

  /*矩形*/
  context.beginPath();
  context.rect(10, 10, 100, 100);
  context.stroke();

  context.beginPath();
  context.rect(120, 10, 100, 100);
  context.fill();

  context.beginPath();
  context.rect(230, 10, 100, 100);
  context.stroke();
  context.fill();

  /*圆形*/
  context.beginPath();
  context.arc(55, 170, 50, 0, (Math.PI * 3) / 2);
  context.stroke();

  context.beginPath();
  context.arc(165, 170, 50, 0, (Math.PI * 3) / 2);
  context.fill();

  context.beginPath();
  context.arc(275, 170, 50, 0, (Math.PI * 3) / 2);
  context.fill();
  context.stroke();

  /*使用closePath*/
  context.beginPath();
  context.arc(55, 280, 50, 0, (Math.PI * 3) / 2);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.arc(165, 280, 50, 0, (Math.PI * 3) / 2);
  context.closePath();
  context.fill(); //没有区别

  context.beginPath();
  context.arc(275, 280, 50, 0, (Math.PI * 3) / 2);
  context.fill();
  context.closePath();
  context.stroke();

}

</script>

<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed placeholder @click-left="onClickLeft"/>
    <canvas id="drawing">
      canvas
    </canvas>
  </div>
</template>

<style scoped>
#drawing {
  width: 100%;
  height: 200px;
  background-color: #63b9e4;
}
</style>