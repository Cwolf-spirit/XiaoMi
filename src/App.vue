<template>
  <div id="app">
    <router-view />
    demo1
  </div>
</template>

<script>
import { getUserInfo, getCartNum } from "@/api/app.js";
export default {
  created() {
    if (this.$cookie.get("userId")) {
      this.getUserInfo();
      this.getCartNum();
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(data => {
        this.$store.commit("userInfo", data);
        this.$store.commit("isLogin", true);
      });
    },
    getCartNum() {
      getCartNum().then(data => {
        this.$store.commit("cartNum", data);
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: PingFang SC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: #f9f9f9;
}
</style>
