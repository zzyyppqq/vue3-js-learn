<script setup>
import {useRoute, useRouter} from "vue-router";
import ViewStateComp from "@/wanandroid/components/ViewStateComp.vue";
import {useRequestStatus} from "@/wanandroid/hooks/useRequestStatus";
import apiService from "@/wanandroid/http/apiService";
import {inject, onMounted, reactive} from "vue";

const route = useRoute()
const router = useRouter()
console.log("SiteMapPage index fullPath: ", route.fullPath)

const toolHeight = inject("toolBarHeight")
console.log("SiteMapPage toolHeight: ", toolHeight.value)

const [viewState, requestApi] = useRequestStatus()

const state = reactive({
  siteList: []
})

onMounted(() => {
  getSiteData()
})

const getSiteData = async () => {
  const result = await requestApi(apiService.getSite())
  state.siteList = result.data
}

const setButtonStyle = (index) => {
  const styles = ['default', 'primary', 'success', 'warning', 'danger'];
  return styles[index % 5];
}

const itemClick = (itemIn) => {

}

</script>

<template>
  <ViewStateComp :view-state="viewState" @retry="getSiteData">
    <div class="vertical-layout">
      <template v-for="(item, index) in state.siteList">
        <div>
          <van-sticky :offset-top="toolHeight">
            <div class="site-header">{{ item.name }}</div>
          </van-sticky>
          <div class="site-wrap">
            <template v-for="(itemIn, ind) in item.articles">
              <van-tag round :type="setButtonStyle(ind)" size="large" style="margin: 10px 5px" @click="itemClick(itemIn)">
                {{ itemIn.title }}
              </van-tag>
            </template>
          </div>
        </div>
      </template>
    </div>

  </ViewStateComp>
</template>

<style scoped>
.site-header {
  height: 40px;
  background: aliceblue;
  color: black;
  font-size: 18px;
  line-height: 40px;
  text-align: left;
  padding-left: 15px;
  font-style: italic;
  font-weight: 700;

}

.site-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0px;
}

</style>