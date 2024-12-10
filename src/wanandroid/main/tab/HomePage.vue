<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import HomePageSkeleton from "@/wanandroid/components/HomePageSkeleton.vue";
import ViewStateComp from "@/wanandroid/components/ViewStateComp.vue";
import likeNorUrl from '@/wanandroid/assets/img/icon-like-nor.png';
import likeSelUrl from '@/wanandroid/assets/img/icon-like-sel.png';
import {useRequestStatus} from "@/wanandroid/hooks/useRequestStatus"
import apiService from "@/wanandroid/http/apiService";

const route = useRoute()
const router = useRouter()
console.log("HomePage route fullPath: ", route.fullPath)

const [viewState, requestApi] = useRequestStatus()

const state = reactive({
  bannerList: [],
  homeList: []
})

const loading = ref(false)
const finished = ref(false)

let pageIndex = -1
let pageInit = false

onMounted(() => {
  init()
})


const init = () => {
  const promiseRequest = Promise.all([apiService.getBanner(), apiService.getHomeList(pageIndex)])
  requestApi(promiseRequest).then((res) => {
    state.bannerList = [...res[0].data]
    state.homeList = [...res[1].data.datas]

    finished.value = state.homeList.length == res[1].data.total
    loading.value = false
  })
  pageInit = true
}

const getHomeList = async () => {
  if (!pageInit) {
    return
  }
  const homeList = await apiService.getHomeList(pageIndex)
  state.homeList = state.homeList.concat(homeList.data.datas)
  finished.value = state.homeList.length == homeList.data.total
  loading.value = false
};

const onRefresh = () => {
  pageIndex = 0
  init()
}

const onLoad = async () => {
  pageIndex++
  await getHomeList()
}

const addFavoriteArticle = async (articleID, listIndex) => {
  await apiService.addFavorite(articleID)
  state.homeList[listIndex].collect = true
}

const toDetail = (item) => {
  window.open(item.link)
}

</script>

<template>
  <ViewStateComp :view-state="viewState" :skeleton-size=1 :skeleton="true" :custom-skeleton="true" @retry="init">
    <template v-slot:skeleton>
      <HomePageSkeleton></HomePageSkeleton>
    </template>
    <!--  加载成果界面，slot  -->
    <div class="vertical-layout" ref="homeDiv">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="vertical-layout">
          <!-- 顶部轮播图 -->
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in state.bannerList" :key="index">
              <van-image :src="item.imagePath" height="220px" width="100%"/>
            </van-swipe-item>
          </van-swipe>
          <!-- 轮播图下方列表 -->
          <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <div class="list-content">
              <templete v-for="(item, index) in state.homeList">
                <div @click="toDetail(item)">
                  <van-row type="flex" justify="space-between">
                    <div class="list-name">
                      {{ item.shareUser !== "" ? item.shareUser : item.author }}
                    </div>
                    <div class="list-data">{{ item.niceShareDate }}</div>
                  </van-row>
                  <div class="list-title">{{ item.title }}</div>
                  <van-row type="flex" justify="space-between">
                    <div class="list-type">{{ item.superChapterName }}/{{ item.chapterName }}</div>
                    <img class="list-icon" :src="item.collect? likeSelUrl: likeNorUrl"
                         @click.stop="addFavoriteArticle(item.id, index)"/>
                  </van-row>
                  <van-divider></van-divider>
                </div>
              </templete>
            </div>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </ViewStateComp>
</template>

<style scoped lang="less">

.home-bg {
  width: 100vw;
  height: calc(100vh - 50px);
  overflow: auto;
}

.list-content {
  margin: 15px
}

.list-title {
  text-align: left;
  font-size: 16px;
  margin: 8px 0px;
}

.list-icon {
  width: 30px;
  height: 30px;
}
</style>