import { mapActions } from 'pinia'
import { useCounterStore } from './counter.js'

export default {
    methods: {
        // 访问组件内的 this.increment()
        // 与从 store.increment() 调用相同
        ...mapActions(useCounterStore, ['increment']),
        // 与上述相同，但将其注册为this.myOwnName()
        ...mapActions(useCounterStore, { myOwnName: 'increment' }),
    },
}