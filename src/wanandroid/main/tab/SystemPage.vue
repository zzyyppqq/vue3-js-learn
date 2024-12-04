<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
console.log("SystemPage route fullPath: ", route.fullPath)

</script>

<template>
<h1>SystemPage</h1>
</template>

<style scoped>

</style>