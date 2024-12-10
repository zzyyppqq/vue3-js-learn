<script setup>
import {useRoute, useRouter} from "vue-router";
import ViewStateComp from "@/wanandroid/components/ViewStateComp.vue";
import {useRequestStatus} from "@/wanandroid/hooks/useRequestStatus";
import apiService from "@/wanandroid/http/apiService";
import {onMounted, reactive} from "vue";

const route = useRoute()
const router = useRouter()
console.log("SystemPage route fullPath: ", route.fullPath)

const [viewState, requestApi] = useRequestStatus()

const state = reactive({
  dataList: []
})

onMounted(() => {
  getDataList()
})

const getDataList =  () => {
  requestApi(apiService.getSystem()).then((res) => {
    state.dataList = state.dataList.concat(res.data)
  }).catch((error) => {
    console.error(`error: ${error}`)
  })
}

const getDataList2 = async () => {
  try {
    const result = await requestApi(apiService.getSystem())
    state.dataList = state.dataList.concat(result.data)
  } catch (error) {
    console.error(`error: ${error}`)
  }
}

</script>

<template>
  <ViewStateComp :view-state="viewState" @retry="getDataList">
    <div class="vertical-layout">
      <template v-for="(item, index) in state.dataList">
        <div>
          <van-space style="margin-top: 10px" v-show="index===0"/>
          <van-row type="flex" justify="space-between" align="center">
            <van-col span="22">
              <div class="tree-title">{{item.name}}</div>
              <div class="tree-child-wrap">
                <template v-for="(child, index) in item.children">
                  <div class="txt-child">{{child.name}}</div>
                </template>
              </div>
            </van-col>
            <img class="img-arrow" src="@/wanandroid/assets/img/icon-arrow.png"/>
          </van-row>
          <van-space></van-space>
        </div>
      </template>
    </div>
  </ViewStateComp>
</template>

<style scoped lang="less">
.tree-title {
  text-align: left;
  font-size: 16px;
  color: #000;
  margin-left: 20px;
  font-weight: 600;
}

.tree-child-wrap {
  margin-top: 10px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: 15px;

  .txt-child {
    margin: 5px;
    text-align: left;
    font-size: 14px;
    color: #666;
  }
}
.img-arrow {
  width: 20px;
  height: 20px;
}
</style>