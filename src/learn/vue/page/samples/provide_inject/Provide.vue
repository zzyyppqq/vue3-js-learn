<script setup>
import {provide, readonly, ref} from "vue";
import {locationInjectionKey, readOnlyInjectionKey} from "@/learn/vue/page/samples/provide_inject/keys.js";
import Inject from "@/learn/vue/page/samples/provide_inject/Inject.vue";
const location = ref('North Pole')
const read = ref(0)

function updateLocation() {
  location.value = 'South Pole'
}

provide(locationInjectionKey, {location, updateLocation})

provide(readOnlyInjectionKey, readonly(read))

</script>

<template>
<div>
  <h3>{{location}}</h3>
  <Inject />
</div>
</template>

<style scoped>

</style>