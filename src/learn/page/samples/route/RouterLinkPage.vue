<script setup>

</script>

<template>
  <div>
    <h1>Router</h1>
    <p>
      <strong>Current route path:</strong> {{ $route.fullPath }}
    </p>
    <nav>
      <RouterLink to="/home">Go to Home</RouterLink>
      <RouterLink to="/about">Go to About</RouterLink>
    </nav>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
div {
  background-color: #666666;
  padding: 10px;
}
</style>