<template>
  <div>
    <div class="header">
      <div class="container">
        <div
          style="display:flex;cursor:pointer"
          @click="$router.push({ name: 'index' })"
        >
          <img src="@img/logo-mi.png" alt="" />
          <div class="title">
            <h1>小米商城</h1>
            <span>让每个人都能享受科技的乐趣</span>
          </div>
        </div>
      </div>
    </div>
    <div class="login">
      <div class="loginDialog">
        <div class="header">
          <span :class="isShow && 'active'" @click="loginByZH">账号登录</span>
          <span :class="!isShow && 'active'" @click="loginBySM">扫码登录</span>
        </div>
        <div class="content" v-if="isShow">
          <div class="loginName">
            <input
              v-model="name"
              type="text"
              placeholder="邮箱/手机号码/小米ID"
            />
          </div>
          <div class="password">
            <input v-model="passWord" type="password" placeholder="密码" />
          </div>
          <span class="loginBtn" @click="login">登录</span>
        </div>
        <div class="content-erCode" v-else>
          <img src="@img/erweima.png" alt="" />
        </div>
        <div class="footer">
          <div class="left">
            <span class="active" @click="$router.push({ name: 'register' })"
              >手机短信登录/注册</span
            >
          </div>
          <div class="right">
            <span @click="$router.push({ name: 'register' })">立即注册 | </span>
            <span @click="$router.push({ name: 'forgetPassWord' })"
              >忘记密码？</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="info1">
        <span>简体</span>
        <span>繁体</span>
        <span>English</span>
        <span>常见问题</span>
        <span>隐私政策</span>
      </div>
      <div class="info2">
        <span>小米公司版权所有-京ICP备10046444-</span>
        <img src="@img/china.png" alt="" />
        <span>京公网安备11010802020134号-京ICP证110507号</span>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login.js";
export default {
  data() {
    return {
      isShow: true,
      name: "",
      passWord: ""
    };
  },
  methods: {
    loginByZH() {
      this.isShow = true;
    },
    loginBySM() {
      this.isShow = false;
    },
    login() {
      const obj = {
        username: this.name,
        password: this.passWord
      };
      login(obj).then(data => {
        this.$msg.success("登录成功");
        this.$store.commit("userInfo", data);
        this.$store.commit("isLogin", true);
        this.$cookie.set("userId", data.id, { expires: "1M" });
        this.$router.push({ name: "index" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  .container {
    height: 112px;
    display: flex;
    align-items: center;
    img {
      width: 54px;
    }
    .title {
      margin-left: 30px;
      h1 {
        font-size: 34px;
      }
      span {
        color: #666;
        font-size: 12px;
      }
    }
  }
}
.login {
  width: 100%;
  height: 558px;
  background: url("~@img/login-bg1.png") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .loginDialog {
    position: absolute;
    right: 369px;
    top: 37px;
    background-color: #fff;
    width: 410px;
    height: 510px;
    padding: 40px 30px;
    box-sizing: border-box;
    .header {
      display: flex;
      padding: 0 42px;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 50px;
        position: relative;
        color: #666666;
        cursor: pointer;
        &.active {
          color: $primary;
        }
        &:first-child::after {
          content: "";
          position: absolute;
          right: -20px;
          top: 4px;
          width: 3px;
          height: 25px;
          background-color: #ccc;
        }
      }
    }
    .content {
      .loginName {
        width: 348px;
        height: 50px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
        input {
          width: 100%;
          height: 100%;
          text-indent: 20px;
          border: none;
        }
      }
      .password {
        width: 348px;
        height: 50px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
        input {
          width: 100%;
          height: 100%;
          text-indent: 20px;
          border: none;
        }
      }
      .loginBtn {
        cursor: pointer;
        display: inline-block;
        width: 348px;
        height: 50px;
        border: 1px solid #ccc;
        line-height: 50px;
        text-align: center;
        background-color: $primary;
        color: #fff;
      }
    }
    .content-erCode {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .footer {
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      span {
        cursor: pointer;
      }
    }
  }
}
.footer {
  margin-top: 220px;
  color: #999;
  .info1,
  .info2 {
    text-align: center;
    img {
      width: 20px;
    }
  }
  .info1 {
    span {
      padding: 0 12px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 5px;
        right: 0;
        width: 1px;
        height: 14px;
        background-color: #ccc;
      }
      &:last-child::after {
        width: 0;
      }
    }
  }
}
</style>
