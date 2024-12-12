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
console.log("WechatPage index fullPath: ", route.fullPath)

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
  wechatTab: [],
  chatList: []
})



onMounted(() => {
  getWeChatTab()
})

const onLoad = () => {
  pageIndex++
  getWechatHistory()
}

const getWechatHistory = async () => {
  const result = await requestApi(apiService.getChatHistory(courseId, pageIndex), pageIndex < 1)
  refreshing.value = false
  if (pageIndex == 0) {
    state.chatList = result.data.datas
  } else {
    state.chatList = state.chatList.concat(result.data.datas)
  }
  finished.value = (state.chatList.length == result.data.total)
  loading.value = false
};

const getWeChatTab = async () => {
  const result = await requestApiTab(apiService.getWeChatTab())
  state.wechatTab = state.wechatTab.concat(result.data)
  courseId = state.wechatTab[0].id
  await getWechatHistory()
}

const changeTab = (tabInfo) => {
  courseId = state.wechatTab[tabActive.value].id
  console.log(`tabActive.value: ${tabActive.value}, index: ${JSON.stringify(tabInfo)}`)
  pageIndex = 0
  finished.value = false
  loading.value = false
  getWechatHistory()
}


const itemClick = (item) => {
  window.open(item.link)
}

/**
 * 添加收藏文章
 */
const addFavoriteArticle = async (articleID, listIndex) => {
  await apiService.addFavorite(articleID)
  state.chatList[listIndex].collect = true
}

</script>

<template>
  <ViewStateComp :view-state="viewStateTab" @retry="getWeChatTab">
    <div class="vertical-layout">
      <van-tabs v-model:active="tabActive" @click-tab="changeTab">
        <van-tab v-for="(tab, index) in state.wechatTab" :title="tab.name" :key="index"></van-tab>
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
                <template v-for="(item, index) in state.chatList">
                  <div>
                    <van-row type="flex" justify="space-between" @click="itemClick(item)">
                      <div>{{item.shareUser === "" ? item.author : item.shareUser}}</div>
                      <div>{{item.niceShareDate}}</div>
                    </van-row>
                    <div class="list-title" style="text-align: left">{{item.title}}</div>
                    <van-row type="flex" justify="space-between" @click="itemClick(item)">
                      <div>{{item.superChapterName}}/{{item.chapterName}}></div>
                      <img class="list-icon" :src="item.collect? likeSel: likeNor"
                      @click.stop="addFavoriteArticle(item.id,index)"/>
                    </van-row>
                    <van-space></van-space>
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