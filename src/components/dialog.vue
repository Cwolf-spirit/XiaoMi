<template>
  <transition name="slide">
    <div class="dialog" v-show="dialogVisible">
      <div class="dialogMask" @click="$emit('close')"></div>
      <div class="dialogBox">
        <div class="title">
          <span>{{ title }}</span>
          <img
            src="@img/icon-close.png"
            @click="$emit('close')"
            class="closeImg"
          />
        </div>
        <div class="content">
          <slot name="body"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  &.slide-enter-active {
    top: 0;
  }
  &.slide-leave-active {
    top: -100%;
  }
  &.slide-enter {
    top: -100%;
  }
  .dialogMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .dialogBox {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    width: 660px;
    .title {
      height: 60px;
      padding: 20px 26px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      background-color: #f5f5f5;
      img {
        cursor: pointer;
        width: 16px;
        height: 16px;
      }
    }
    .content {
      background-color: #fff;
      padding: 40px;
    }
    .footer {
      height: 80px;
      line-height: 80px;
      background-color: #f5f5f5;
      text-align: center;
    }
  }
}
</style>
