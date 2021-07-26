<template>
  <div id="app">
    sdkfsjkdfjklasdfjkl
    <div class="red"></div>
    <SvgIcon icon="balance" class="w-7 h-7 inline-block mr-1 align-middle text-red-700"></SvgIcon>
    <!-- <router-view /> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>
<style lang="scss">
#app {
  @apply text-4xl bg-gray-400;
  .red {
    @apply bg-red-500 h-6;
  }
}
</style>
