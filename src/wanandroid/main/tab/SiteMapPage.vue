<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
console.log("SiteMapPage route fullPath: ", route.fullPath)

</script>

<template>
<h1>SiteMapPage</h1>
</template>

<style scoped>

</style>