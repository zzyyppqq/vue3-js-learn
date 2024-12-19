<script setup>

import {onMounted} from "vue";
import {initShader} from "@/learn/vue/page/samples/canvas/ShaderUtil.js";

const onClickLeft = () => history.back()


//顶点着色器源码
const VERTEX_SHADER_SOURCE0 = `
    void main() {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 10.0;
    }
  `
//片元着色器源码
const FRAGMENT_SHADER_SOURCE0 = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `
const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec2 a_Position;
    attribute vec2 a_Screen_Size;
    void main(){
      vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
      position = position * vec2(1.0, -1.0);
      gl_Position = vec4(position, 0, 1);
      gl_PointSize = 10.0;
    }
  `
const FRAGMENT_SHADER_SOURCE = `
   precision mediump float;
   uniform vec4 u_Color;
   void main() {
    vec4 color = u_Color / vec4(255, 255, 255, 1);
    gl_FragColor = color;
   }
  `

const drawOnePoint = (gl) => {
  //创建着色器
  const program = initShader(gl, VERTEX_SHADER_SOURCE0, FRAGMENT_SHADER_SOURCE0)
  //执行绘制
  gl.drawArrays(gl.POINTS, 0, 1)
  //gl.drawArrays(gl.LINES, 0, 1)
  //gl.drawArrays(gl.TRIANGLES, 0, 1)
};

onMounted(() => {

  console.log('---------------')
  const canvas = document.querySelector("#webgl");
  //const canvas = document.getElementById('canvas')
  console.log(`canvas: ${canvas}`)

  if (canvas.getContext) {
    const gl = canvas.getContext("webgl");// opengl 2.0
    console.log(`gl: ${gl}`)

    // drawOnePoint(gl)

    const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
    //获取glsl的变量对应的属性做修改
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    const a_Screen_Size = gl.getAttribLocation(program, 'a_Screen_Size');
    const u_Color = gl.getUniformLocation(program, 'u_Color');
    gl.vertexAttrib2f(a_Screen_Size, canvas.width, canvas.height); //给glsl的属性赋值两个浮点数

    //给个默认背景颜色
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //存储点击位置的数组。
    const points = [];
    canvas.addEventListener('click', e => {
      const x = e.pageX;
      const y = e.pageY;
      let color = { r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256), a: 1 };
      points.push({ x: x, y: y, color: color })

      gl.clearColor(0, 0, 0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      for (let i = 0; i < points.length; i++) {
        let color = points[i].color;
        gl.uniform4f(u_Color, color.r, color.g, color.b, color.a);
        gl.vertexAttrib2f(a_Position, points[i].x, points[i].y);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    })

  }
})


</script>

<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed placeholder @click-left="onClickLeft"/>
    <canvas id="webgl">
      canvas
    </canvas>
  </div>
</template>

<style scoped>
#webgl {
  width: 100%;
  height: 200px;
  background-color: #63b9e4;
}
</style>