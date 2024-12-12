import {defineStore} from "pinia";
import {computed, inject, ref} from "vue";
import {useRoute} from "vue-router";

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value ++
    }
    function $reset() {
        count.value = 0
    }
    return {count,$reset, doubleCount, increment}
})


// 选项式api
export const useCounterOptionStore = defineStore('counter', {
    state: () => ({
        count: 0,
        name: 'Eduardo'
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count ++
        }
    }
})

export const useIdStore = defineStore('storeId', {
    state: () => {
        return {
            count: 0,
            name: 'Eduardo',
            isAdmin: true,
            items: [],
            hasChanged: true,
        }
    }
})


// Setup store 也可以依赖于全局提供的属性，比如路由。
// 任何应用层面提供的属性都可以在 store 中使用 inject() 访问，就像在组件中一样：
export const useSearchFilters = defineStore('search-filters', () => {
    const route = useRoute()
    // 这里假定 `app.provide('appProvided', 'value')` 已经调用过
    const appProvided = inject('appProvided')

    // ...

    return {
        // ...
    }
})