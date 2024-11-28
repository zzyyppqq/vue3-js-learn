<script setup>

</script>

<template>
  <div>
    <!-- nav可注释，只要<RouterView/> 即可找到入口/-->
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
    </nav>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
/* tabbar.css 或 App.vue 的 style */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

RouterView {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>