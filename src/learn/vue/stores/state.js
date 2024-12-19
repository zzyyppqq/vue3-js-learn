import {mapState} from "pinia";
import {useCounterStore} from "@/learn/vue/stores/counter.js";
// 如果你不能使用组合式 API，但你可以使用 computed，methods，...，
// 那你可以使用 mapState() 辅助函数将 state 属性映射为只读的计算属性
export default {
    computed: {
        // 可以访问组件中的 this.count
        // 与从 store.count 中读取的数据相同
        ...mapState(useCounterStore, ['count']),
        // 与上述相同，但将其注册为 this.myOwnName
        ...mapState(useCounterStore, {
            myOwnName: 'count',
            // 你也可以写一个函数来获得对 store 的访问权
            double: store => store.count * 2,
            // 它可以访问 `this`，但它没有标注类型...
            magicValue(store) {
                return store.someGetter + this.count + this.double
            },
        }),
    },
}