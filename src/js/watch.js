
import {ref, watch} from "vue";

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
    watch(price, async(newPrice, oldPrice) => {
        console.log(`watch newPrice: ${newPrice}, oldPrice: ${oldPrice}`)
    })
    return price
}