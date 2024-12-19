<script setup>
import {inject} from "vue";
import {locationInjectionKey} from "@/learn/vue/page/samples/provide_inject/keys.js";

const {location, updateLocation} = inject(locationInjectionKey)

</script>

<template>
<button @click="updateLocation" >{{location}}</button>
</template>

<style scoped>

</style>