import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
    computed: {
        // 允许在组件中访问 this.doubleCount
        // 与从 store.doubleCount 中读取的相同
        ...mapState(useCounterStore, ['doubleCount']),
        // 与上述相同，但将其注册为 this.myOwnName
        ...mapState(useCounterStore, {
            myOwnName: 'doubleCount',
            // 你也可以写一个函数来获得对 store 的访问权
            double: (store) => store.doubleCount,
        }),
    },
}