<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import apiService from "@/wanandroid/http/apiService";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {useUserStore} from "@/wanandroid/store/userStore.js";

const route = useRoute()
const router = useRouter()
console.log("LoginPage index fullPath: ", route.fullPath)

const userStore = useUserStore()
console.log(`userStore.userInfo: ${userStore.userInfo}`)
console.log(`userStore.loginInfo: ${userStore.loginInfo}`)
const username = ref(userStore.loginInfo.username)
const password = ref(userStore.loginInfo.password)
const onSubmit = async (loginInfo) => {
  console.log('submit loginInfo: ', loginInfo)
  if (loginInfo.username == '' || loginInfo.password == '') {
    showFailToast("账号或密码不能为空")
    return
  }
  const response = await apiService.login(loginInfo.username, loginInfo.password)
  console.log('response: ', response)

  const data = response.data
  userStore.setUserInfo(data)
  userStore.setLoginState(true)
  showSuccessToast("登录成功")
  userStore.setLoginInfo(loginInfo)
  router.back()
}

</script>

<template>
  <div class="login-page">
    <van-icon name="arrow-left" color="#fff" style="position: absolute;left: 10px;top: 20px" size="20px"
              @click="$router.back()"/>

    <div class="login-content">
      <van-form class="form-content" @submit="onSubmit">
        <van-cell-group class="cell-content">
          <van-field
              v-model="username"
              name="username"
              label="账号"
              placeholder="账号"
              :rules="[{require: true, message: '账号不能为空'}]"
          />
          <van-field
              v-model="password"
              name="password"
              type="password"
              label="密码"
              placeholder="密码"
              :rules="[{require: true, message: '密码不能为空'}]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>


<style scoped>

.login-page {

}

.login-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .form-content {
    width: 100%;

    .cell-content {
      margin: 20px;
      border-radius: 20px;
    }
  }
}

</style>