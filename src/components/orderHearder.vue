<template>
  <div>
    <div class="hearder">
      <div class="container">
        <div class="left">
          <img src="@img/logo-mi.png" class="logo" alt="" />
          <div class="content">
            <span class="title">{{ title }}</span>
            <span class="description">{{ content }}</span>
          </div>
        </div>
        <div class="right">
          <p>{{ $store.state.userInfo.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "我的购物车"
    },
    content: {
      type: String,
      default: "温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
    }
  }
};
</script>

<style lang="scss" scoped>
.hearder {
  background-color: #fff;
  border-bottom: 2px solid #ff6600;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 112px;
    .left {
      display: flex;
      align-items: center;
      .logo {
        width: 52px;
      }
      .content {
        margin-left: 54px;
        .title {
          font-size: 28px;
          font-weight: bold;
          margin-right: 18px;
        }
        .description {
          color: #999;
        }
      }
    }
    .right {
      color: #999;
    }
  }
}
</style>
