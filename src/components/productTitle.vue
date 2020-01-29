<template>
  <div class="productTitle" :class="{ is_fixed: isFixed }">
    <div class="container">
      <div class="title">
        <h1>{{ title }}</h1>
      </div>
      <div class="info">
        <span>概述</span> <span> |</span> <span>参数</span> <span> |</span>
        <span>用户评价</span> <span> |</span>
        <span v-if="$route.name != 'detail'" class="btn" @click="buy"
          >立即购买</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      isFixed: false
    };
  },
  mounted() {
    document.addEventListener("scroll", this.isFix);
  },
  methods: {
    buy() {
      this.$router.push({
        name: "detail",
        query: { id: this.$route.query.id }
      });
    },
    isFix() {
      let scrollTop =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset;
      this.isFixed = scrollTop > 158 ? true : false;
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.isFix);
  }
};
</script>

<style lang="scss" scoped>
.productTitle {
  z-index: 100;
  height: 70px;
  line-height: 70px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  &.is_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 6px 5px #ccc;
  }
  .container {
    display: flex;
    justify-content: space-between;
    .title {
      h1 {
        font-size: 18px;
        color: #333;
        font-weight: bold;
      }
    }
    .info {
      span {
        color: #666;
        font-size: 14px;
        margin-left: 6px;
      }
      .btn {
        color: #fff;
      }
    }
  }
}
</style>
