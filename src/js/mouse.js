// “组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。
import {ref, onMounted, onUnmounted } from "vue";


export function useEventListener(target, event, callback) {
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => target.removeEventListener(event, callback))
}
export function useMouse() {
    const x = ref(0)
    const y = ref(0)

    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }

    // onMounted(() => window.addEventListener('mousemove', update))
    // onUnmounted(() => window.removeEventListener('mousemove', update))

    useEventListener(window, 'mousemove', update)

    return {x, y}
}
