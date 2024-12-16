<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import BScroll from 'better-scroll';

/**
 * 1 滚动的时候会派发scroll事件，会截流。
 * 2 滚动的时候实时派发scroll事件，不会截流。
 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
 */
const props = defineProps({
  probeType: {
    type: Number,
    default: 1
  },
  click: {
    type: Boolean,
    default: true
  },
  scrollX: {
    type: Boolean,
    default: false
  },
  listenScroll: {
    type: Boolean,
    default: false
  },
  scrollData: {
    type: Array,
    default: null
  },
  pullup: {
    type: Boolean,
    default: false
  },
  pulldown: {
    type: Boolean,
    default: false
  },
  beforeScroll: {
    type: Boolean,
    default: false
  },
  refreshDelay: {
    type: Number,
    default: 20
  }
});

const wrapper = ref(null);
const bs = ref(null);

const initScroll = () => {
  bs.value = new BScroll(wrapper.value, {
    probeType: props.probeType,
    click: props.click,
    scrollX: props.scrollX,
    scrollY: !props.scrollX,
    pullUpLoad: props.pullup,
    pullDownRefresh: props.pulldown
  });

  if (props.listenScroll) {
    bs.value.on('scroll', () => {
      console.log('scrolling-');
    });
  }

  if (props.pullup) {
    bs.value.on('scrollEnd', () => {
      console.log('scrollingEnd');
    });
  }
};

const nextTickFn = async (fn) => {
  // 等待 DOM 更新完成
  await nextTick();
  fn()
}

onMounted(() => {
  nextTickFn(() => {
    initScroll();
  })
});

watch(
    () => props.scrollData,
    () => {
      setTimeout(() => {
        if (bs.value) {
          //bs.value.refresh();
        }
      }, props.refreshDelay);
    }
);
</script>

<template>
  <div ref="wrapper" class="scroller-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.scroller-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  touch-action: pan-y;
}
</style>