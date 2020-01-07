<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@layout/HomeHeader.vue";
import Footer from "@layout/HomeFooter.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style></style>
