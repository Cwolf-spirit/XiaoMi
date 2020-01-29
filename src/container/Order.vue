<template>
  <div>
    <router-view></router-view>
    <HomeFooter></HomeFooter>
  </div>
</template>

<script>
import HomeFooter from "@layout/HomeFooter.vue";
export default {
  components: {
    HomeFooter
  }
};
</script>

<style></style>
