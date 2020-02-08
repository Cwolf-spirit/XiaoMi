<template>
  <div class="aliPay">
    <orderHearder
      title="订单支付"
      content="请谨防钓鱼链接或诈骗电话，了解更多>"
    ></orderHearder>
    <div class="content">
      <div class="loading" v-if="loading">
        <img src="@img/loading-svg/loading-bars.svg" alt="" />
      </div>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import orderHearder from "@components/orderHearder.vue";
import { toPay } from "@/api/pay.js";
export default {
  components: {
    orderHearder
  },
  data() {
    return {
      id: this.$route.query.id,
      loading: true,
      content: ""
    };
  },
  created() {
    this.toPay();
  },
  methods: {
    toPay() {
      const obj = {
        orderId: this.id,
        orderName: "Vue高仿小米商城",
        amount: 0.01, //单位元
        payType: 1 //1支付宝，2微信
      };
      toPay(obj).then(data => {
        this.content = data.content;
        this.loading = false;
        this.$nextTick(() => {
          document.forms[0].submit();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .loading {
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    text-align: center;
    img {
      height: 100%;
    }
  }
}
</style>
