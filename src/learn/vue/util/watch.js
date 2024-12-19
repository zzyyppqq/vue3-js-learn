import {onWatcherCleanup, reactive, ref, watch, watchEffect, watchPostEffect} from "vue";

export function xyWatch(x, y) {
    // const x = ref(0)
    // const y = ref(0)
    watch(x, (newX) => {
        console.log(`x is ${newX}`)
    })

    watch(() => x.value + y.value, (sum) => {
        console.log(`sum of x + y is: ${sum}`)
    })

    watch([x, () => y.value], ([newX, newY]) => {
        console.log(`x is ${newX} and y is ${newY}`)
    })
    return {x, y}
}

export function priceWatch() {
    const price = ref('100');
// 监听输入框
    watch(price, async (newPrice, oldPrice) => {
        console.log(`watch newPrice: ${newPrice}, oldPrice: ${oldPrice}`)
    })
    return price
}


export function watchFunction() {

    const obj = reactive({count: 0})
    // 不能直接监听obj.count，因为得到的是number, 需要用getter函数
    watch(() => obj.count, (count) => {
        console.log(`Conut is: ${count}`)
    })
    // 深层侦听器
    // 即时回调的侦听器（创建时就执行一次）
    // 一次性侦听器（仅支持 3.4 及以上版本）
    watch(() => obj.count, (newValue, oldValue) => {

    }, {deep: true, immediate: true, once: true})

    const todoId = ref(1)
    const responseData = ref(null)
    watch(responseData, (json) => {
        console.log(`watchEffect response json: ${JSON.stringify(json)}`)
    })
    // 执行期间，它会自动追踪 todoId.value 作为依赖（和计算属性类似）。
    // 每当 todoId.value 变化时，回调会再次执行。有了 watchEffect()，我们不再需要明确传递 todoId 作为源值
    watchEffect(async () => {
        console.log('watchEffect execute')
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
        const json = await response.json()
        responseData.value = json
    })

    const id = ref(0)

    watch(id, (newId) => {
        const controller = new AbortController()
        fetch(`/api/${newId}`, {signal: controller.signal}).then(() => {

        })
        // 当侦听器失效并准备重新运行时会被调用：
        onWatcherCleanup(() => {
            // 终止过期的请求
            controller.abort()
        })
    })

    watch(id, (newId, oldId, onCleanup) => {
        onCleanup(() => {

        })
    })
    watchEffect((onCleanup) => {
        onCleanup(() => {

        })
    })

    // watch(id, callback, {flush: 'post'})
    // watchEffect(callback, {flush: 'post'})
    watchPostEffect(() => {
        // 再vue更新后执行
    })

    let unWatch = watchEffect(() => {});
    setTimeout(() => {
    }, 100)
    unWatch()

}