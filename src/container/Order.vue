<template>
  <div>
    <OrderHeader></OrderHeader>
    <router-view></router-view>
    <OrderFooter></OrderFooter>
  </div>
</template>

<script>
import OrderHeader from "@layout/OrderHearder.vue";
import OrderFooter from "@layout/OrderFooter.vue";
export default {
  components: {
    OrderHeader,
    OrderFooter
  }
};
</script>

<style></style>
