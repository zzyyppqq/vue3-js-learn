<script setup>
import {useRoute, useRouter} from "vue-router";
import {inject, onMounted, reactive, ref} from "vue";
import ViewStateComp from "@/wanandroid/components/ViewStateComp.vue";
import {useRequestStatus} from "@/wanandroid/hooks/useRequestStatus";
import apiService from "@/wanandroid/http/apiService";
import likeNorUrl from "@/wanandroid/assets/img/icon-like-nor.png";
import likeSelUrl from "@/wanandroid/assets/img/icon-like-sel.png";

const likeNor = likeNorUrl
const likeSel = likeSelUrl

const route = useRoute()
const router = useRouter()
console.log("WechatPage route fullPath: ", route.fullPath)

const toolHeight = inject("toolBarHeight")
console.log("WechatPage toolHeight: ", toolHeight.value)

const [viewStateTab, requestApiTab] = useRequestStatus()
const [viewState, requestApi] = useRequestStatus()

const tabActive = ref(0)

const loading = ref(false)
const refreshing = ref(false)
const finished = ref(false)

let pageIndex = 0 //公众号请求页码
let courseId = -1; //公众号ID

const state = reactive({
  projectTab: [],
  projectList: []
})


onMounted(() => {
  getProjectTab()
})

const onLoad = () => {
  pageIndex++
  getProjectList()
}

const getProjectList = async () => {
  const result = await requestApi(apiService.getProjectList(courseId, pageIndex), pageIndex < 1)
  refreshing.value = false
  if (pageIndex == 0) {
    state.projectList = result.data.datas
  } else {
    state.projectList = state.projectList.concat(result.data.datas)
  }
  finished.value = (state.projectList.length == result.data.total)
  loading.value = false
};

const getProjectTab = async () => {
  const result = await requestApiTab(apiService.getProjectType())
  state.projectTab = state.projectTab.concat(result.data)
  courseId = state.projectTab[0].id
  await getProjectList()
}

const changeTab = (tabInfo) => {
  courseId = state.projectTab[tabActive.value].id
  console.log(`tabActive.value: ${tabActive.value}, index: ${JSON.stringify(tabInfo)}`)
  pageIndex = 0
  finished.value = false
  loading.value = false
  getPList()
}


const itemClick = (item) => {
  window.open(item.link)
}

/**
 * 添加收藏文章
 */
const addFavoriteArticle = async (articleID, listIndex) => {
  await apiService.addFavorite(articleID)
  state.projectList[listIndex].collect = true
}

</script>

<template>
  <ViewStateComp :view-state="viewStateTab" @retry="getprojectTab">
    <div class="vertical-layout">
      <van-tabs v-model:active="tabActive" @click-tab="changeTab">
        <van-tab v-for="(tab, index) in state.projectTab" :title="tab.name" :key="index"></van-tab>
      </van-tabs>
      <div style="width: 100vw;">
        <ViewStateComp :view-state="viewState" @retry="getWechatHistory">
          <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <div style="width: 100vw;">
              <template v-for="(item, index) in state.projectList">
                <div>
                  <div class="horizontal-layout" style="justify-content: center">
                    <van-image :src="item.envelopePic" height="120" width="60"/>
                    <div class="vertical-layout" style="justify-content: center">
                      <van-row type="flex" justify="space-between" @click="itemClick(item)">
                        <div>{{ item.shareUser === "" ? item.author : item.shareUser }}</div>
                        <div>{{ item.niceShareDate }}</div>
                      </van-row>
                      <div class="list-title" style="text-align: left">{{ item.title }}</div>
                      <van-row type="flex" justify="space-between" @click="itemClick(item)">
                        <div>{{ item.superChapterName }}/{{ item.chapterName }}></div>
                        <img class="list-icon" :src="item.collect? likeSel: likeNor"
                             @click.stop="addFavoriteArticle(item.id,index)"/>
                      </van-row>
                    </div>
                    <van-space></van-space>

                  </div>
                </div>
              </template>
            </div>
          </van-list>
        </ViewStateComp>
      </div>
    </div>
  </ViewStateComp>
</template>

<style scoped>

.list-icon {
  width: 20px;
  height: 20px;
}
</style>