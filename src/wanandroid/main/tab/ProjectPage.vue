<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
console.log("ProjectPage route fullPath: ", route.fullPath)

</script>

<template>
<h1>ProjectPage</h1>
</template>

<style scoped>

</style>