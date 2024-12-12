<script setup>
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
import {ref} from "vue";

function onBeforeEnter(el) {
}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {
}

// 当进入过渡在完成之前被取消时调用
function onEnterCancelled(el) {
}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {
}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {
}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {
}

const show = ref(true);


</script>

<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <!--   如果你想在某个节点初次渲染时应用一个过渡效果，你可以添加 appear prop： -->
    <Transition appear
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @enter-cancelled="onEnterCancelled"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
        @leave-cancelled="onLeaveCancelled">
      <p v-if="show">hello</p>
    </Transition>
  </div>
</template>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>