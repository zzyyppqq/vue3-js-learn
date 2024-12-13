import {defineStore} from "pinia";
import {ref} from "vue";
import {getCart} from "@/newbee/service/cartApi.js";

export const userCartStore = defineStore("cart",  () => {
    const count = ref(0)
    async function updateCart() {
        const {data = []} = await getCart()
        count.value = data.length
    }
    return {count, updateCart}
})

