<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import HomePageSkeleton from "@/wanandroid/components/HomePageSkeleton.vue";
import ViewStateComp from "@/wanandroid/components/ViewStateComp.vue";
import {VIEW_STATE_LOADING} from "@/wanandroid/const/ViewStateConstant";

const route = useRoute()
const router = useRouter()
console.log("HomePage route fullPath: ", route.fullPath)

const viewState = ref(VIEW_STATE_LOADING)

const init = () => {

}
</script>

<template>
  <ViewStateComp :view-state="viewState" :skeleton-size=2 :skeleton="true" :custom-skeleton="true" @retry="init">
    <template v-slot:skeleton>
      <HomePageSkeleton></HomePageSkeleton>
    </template>
  </ViewStateComp>

</template>

<style scoped>

</style>