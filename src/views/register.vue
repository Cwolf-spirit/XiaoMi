<template>
  <div class="container">
    <div class="form">
      <div class="logo">
        <img src="@img/logo-mi.png" alt="" />
      </div>
      <h1>注册小米账号</h1>
      <div class="area">
        <div class="marginB-8">国家/地区</div>
        <el-select
          class="marginB-8"
          v-model="area"
          placeholder="请选择国家/地区"
        >
          <el-option value="1" label="中国"> 中国 </el-option>
          <el-option value="2" label="美国"> 美国 </el-option>
          <el-option value="3" label="俄国"> 俄国 </el-option>
        </el-select>
        <span class="marginB-8" style="color:#999;font-size:14px;"
          >成功注册账号后，国家/地区将不能被修改</span
        >
      </div>
      <div class="phone">
        <div class="marginB-8">手机号码</div>
        <el-input maxlength="11" v-model="phoneNum"></el-input>
      </div>
      <div class="submit">
        <div class="btn-middle" @click="register">立即注册</div>
      </div>
      <el-radio v-model="agreement" :label="true"
        >注册账号即代表您同意并愿意遵守小米 <b>用户协议</b>和 <b>隐私政策</b>
      </el-radio>
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
import { register } from "@/api/login.js";
export default {
  data() {
    return {
      area: "1",
      phoneNum: "",
      agreement: ""
    };
  },
  methods: {
    register() {
      if (!this.agreement) {
        this.$msg.error("请先签订协议");
        return false;
      }
      const obj = {
        username: this.phoneNum,
        password: "123456",
        email: "hu_bei510@163.com"
      };
      register(obj).then(() => {
        this.$msg.success("注册成功");
        this.$router.push({ name: "login" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 177px;
  .form {
    text-align: center;
    background-color: #fff;
    padding-bottom: 20px;
    .logo {
      img {
        width: 50px;
        margin-bottom: 46px;
      }
    }
    h1 {
      font-size: 30px;
      color: #333333;
      margin-bottom: 42px;
    }
    .area,
    .phone {
      width: 332px;
      margin: 0 auto;
      text-align: left;
      margin-bottom: 22px;
      .el-select {
        display: block;
      }
    }
    .submit {
      width: 100%;
      margin: 43px auto 82px;
      .btn-middle {
        width: 332px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        margin: 0 auto;
        padding: 0;
      }
    }
  }
  .footer {
    margin-top: 120px;
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
}
.marginB-8 {
  margin-bottom: 8px;
}
</style>
