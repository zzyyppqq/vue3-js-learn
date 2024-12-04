<script setup>

import {onMounted} from "vue";
import {initShader} from "@/components/canvas/ShaderUtil.js";

const onClickLeft = () => history.back()

// https://developer.mozilla.org/zh-CN/docs/Web/API/WebGPU_API
const shaders = `
struct VertexOut {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f
}

@vertex
fn vertex_main(@location(0) position: vec4f,
               @location(1) color: vec4f) -> VertexOut
{
  var output : VertexOut;
  output.position = position;
  output.color = color;
  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
{
  return fragData.color;
}
`;

/**
 * 基础渲染管线
 * @returns {Promise<void>}
 */
async function init() {
  console.log('-------start--------')
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }
  console.log(`gpu: ${navigator.gpu}`)
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }
  console.log(`adapter: ${adapter}`)
  const device = await adapter.requestDevice();
  console.log(`device: ${device}`)
  // 创建着色器模块
  const shaderModule = device.createShaderModule({
    code: shaders,
  });
  // 获取和配置 canvas 上下文
  const canvas = document.querySelector("#webgpu");
  //const canvas = document.getElementById('canvas')
  console.log(`canvas: ${canvas}`)
  const context = canvas.getContext("webgpu");// webgpu
  console.log(`webGPUContext: ${context}`)
  context.configure({
    device: device,
    format: navigator.gpu.getPreferredCanvasFormat(),
    alphaMode: "premultiplied",
  });
  // 创建缓冲区并将我们的三角形数据写入
  const vertices = new Float32Array([
    0.0, 0.6, 0, 1, 1, 0, 0, 1, -0.5, -0.6, 0, 1, 0, 1, 0, 1, 0.5, -0.6, 0, 1, 0,
    0, 1, 1,
  ]);
  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength, // make it big enough to store vertices in
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices, 0, vertices.length);
  // 定义和创建渲染管线
  const vertexBuffers = [
    {
      attributes: [
        {
          shaderLocation: 0, // 位置
          offset: 0,
          format: "float32x4",
        },
        {
          shaderLocation: 1, // 颜色
          offset: 16,
          format: "float32x4",
        },
      ],
      arrayStride: 32,
      stepMode: "vertex",
    },
  ];
  const pipelineDescriptor = {
    vertex: {
      module: shaderModule,
      entryPoint: "vertex_main",
      buffers: vertexBuffers,
    },
    fragment: {
      module: shaderModule,
      entryPoint: "fragment_main",
      targets: [
        {
          format: navigator.gpu.getPreferredCanvasFormat(),
        },
      ],
    },
    primitive: {
      topology: "triangle-list",
    },
    layout: "auto",
  };
  const renderPipeline = device.createRenderPipeline(pipelineDescriptor);
  // 运行渲染通道
  const commandEncoder = device.createCommandEncoder();

  const clearColor = { r: 0.0, g: 0.5, b: 1.0, a: 1.0 };

  const renderPassDescriptor = {
    colorAttachments: [
      {
        clearValue: clearColor,
        loadOp: "clear",
        storeOp: "store",
        view: context.getCurrentTexture().createView(),
      },
    ],
  };

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  passEncoder.setPipeline(renderPipeline);
  passEncoder.setVertexBuffer(0, vertexBuffer);
  passEncoder.draw(3);

  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);

  //基础的计算管线


  console.log('-------end--------')
}


onMounted(() => {
  init()

})


</script>

<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed placeholder @click-left="onClickLeft"/>
    <canvas id="webgpu">
      canvas
    </canvas>
  </div>
</template>

<style scoped>
#webgpu {
  width: 100%;
  height: 200px;
  background-color: #63b9e4;
}
</style>