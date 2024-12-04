<script setup>

import TabbarView from "@/components/phone/tabbar/TabbarView.vue";
import {ref} from "vue";

// ---- 预留给android调用的 ----
const callJS = () => {
  console.log("Logger_info callJS")
  alert("Android调用了JS的callJS方法");
}
function callEvaluateJS(msg){
  alert("Android调用了JS的callEvaluateJS方法" + msg);
  return msg;
}

// ---- js内部调用的 ----

console.log("window: ", window)
console.log("navigator: ", navigator)
console.log("navigator.userAgent: ", navigator.userAgent)

const callAndroidJavascriptInterface = () => {
  console.log('Logger_info Android: ', JSON.stringify(Android))
  console.log('Logger_info window.Android: ', JSON.stringify(window.Android))
  console.log('Logger_info window: ', window)
  // 检测是否在 Android 设备上运行
  const isAndroid = /Android/.test(navigator.userAgent);
  console.log("navigator.userAgent: ", navigator.userAgent)
  console.log("isAndroid: ", isAndroid)
  // 由于对象映射，所以调用test对象等于调用Android映射的对象
  if (isAndroid) {
    Android.hello("js调用了android中的hello方法");
  }
}

const finishActivity = () => {
  if (window.Android) {
    Android.onBackPressed()
  }
}

const showView = ref(true);
const showHideNativeView = () => {
  showView.value = !showView.value; // 切换显示状态
  console.log('Logger_info showView.value: ', showView.value)
  Android.showNativeInvokeJSView(showView.value)
}

const callAndroidProtocol = () => {
  // 约定的url协议为：js://webview?arg1=111&arg2=222
  document.location = "js://webview?arg1=111&arg2=222";
}

function clickAlert(){
  alert("alert show");
}
function clickConfirm(){
  confirm("confirm show");
}
// 支持js和android互相传递参数
function clickPrompt(){
  // 调用prompt（）
  const result = prompt("js://webview?arg1=111&arg2=222");
  // 展示android回传的值
  confirm("js prompt receive: " + result);
}

</script>

<template>
  <div>
    <van-nav-bar title="Setting"></van-nav-bar>
    <p>js调用Android函数的三种方法</p>
    <div class="container">
      <button type="button" @click="callAndroidJavascriptInterface">JavascriptInterface</button>
      <button type="button" @click="callAndroidProtocol">shouldOverrideUrlLoading</button>
      <button type="button" @click="showHideNativeView(true)">showHideNativeView</button>
      <button type="button" @click="finishActivity">finishActivity</button>
      <button type="button" @click="clickAlert()">clickAlert</button>
      <button type="button" @click="clickConfirm()">clickConfirm</button>
      <button type="button" @click="clickPrompt()">clickPrompt</button>
    </div>
    <TabbarView/>
  </div>
</template>

<style scoped>
.van-nav-bar {
  background-color: #63b9e4;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  height: 100vh;
  margin: 0;
  background-color: #f8f9fa;
  color: #343a40;
  font-family: Arial, sans-serif;
  text-align: center;
}
h1 {
  font-size: 48px;
  margin: 0;
}
p {
  font-size: 18px;
  margin: 10px 0;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}
button:hover {
  background-color: #7e97b2;
}
</style>