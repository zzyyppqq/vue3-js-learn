<script>
export default {
  name: "VFocusOptions",
  setup() {

  },
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      }
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>