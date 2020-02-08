<template>
  <div>
    <!-- 一级导航 -->
    <div class="nav-first">
      <div class="container">
        <div class="left fl">
          <span>松果出行</span>
          <el-divider direction="vertical"></el-divider>
          <span>MIUI</span>
          <el-divider direction="vertical"></el-divider>
          <span>云服务</span>
          <el-divider direction="vertical"></el-divider>
          <span>协议规则</span>
        </div>
        <div class="right fr">
          <div v-if="!isLogin" class="fl">
            <span @click="$router.push({ name: 'login' })">登录</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="$router.push({ name: 'register' })">注册</span>
          </div>
          <div v-else class="fl">
            <span>{{ $store.state.userInfo.username }}</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="platform.signOut">退 出</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="$router.push({ name: 'orderList' })">我的订单</span>
          </div>
          <div class="cart fl" @click="toCart">
            <i class="iconfont icongouwuchekong"></i>
            <span>购物车({{ cartNum }})</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 二级导航 -->
    <div class="nav-second">
      <div class="container">
        <div class="logo">
          <span @click="$router.push({ name: 'index' })"></span>
        </div>
        <div class="nav-info">
          <ul class="nav-ul clearfix">
            <li class="nav-li">
              小米手机
              <div class="nav-product">
                <ul>
                  <li v-for="(item, index) in productList" :key="index">
                    <img :src="item.mainImage" alt="" />
                    <p class="pro-name">{{ item.name }}</p>
                    <p class="pro-price">{{ item.price }}元</p>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-li">
              Redmi红米
              <div class="nav-product">
                <ul>
                  <li>
                    <img src="@img/nav-img/nav-1.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-1.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-2.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-2.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-3.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-3.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-li">
              电视
              <div class="nav-product">
                <ul>
                  <li>
                    <img src="@img/nav-img/nav-3-1.jpg" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-3-2.jpg" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-3-3.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-3-4.jpg" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-3-5.jpg" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                  <li>
                    <img src="@img/nav-img/nav-3-6.png" alt="" />
                    <p class="pro-name">小米9</p>
                    <p class="pro-price">2999元</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="search">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="search"
          >
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from "@/api/Header.js";
import platform from "@utils/platform";
export default {
  data() {
    return {
      platform,
      search: "",
      productList: [] // 产品list
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    cartNum() {
      return this.$store.state.cartNum;
    }
  },
  created() {
    this.getProductList();
  },
  methods: {
    // 获取nav产品
    getProductList() {
      const obj = {
        pageNum: 1,
        pageSize: 6,
        categoryId: "100012"
      };
      getProductList(obj)
        .then(data => {
          this.productList = data.list;
        })
        .catch(() => {
          this.$msg.error("请求失败");
        });
    },
    toCart() {
      if (!this.$store.state.isLogin) {
        this.$confirm("请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ name: "login" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "cart" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-first {
  height: 40px;
  line-height: 40px;
  background-color: #333;
  color: #b0b0b0;
  .left {
    font-size: 14px;
  }
  .right {
    font-size: 14px;
    span {
      cursor: pointer;
    }
    .cart {
      cursor: pointer;
      width: 110px;
      height: 40px;
      background-color: #ff6600;
      margin-left: 20px;
      text-align: center;
      color: #fff;
      span {
        margin-left: 10px;
      }
    }
  }
}
.nav-second {
  background-color: #fff;
  height: 112px;
  .container {
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .logo {
      display: inline-block;
      width: 55px;
      height: 55px;
      background-color: #ff6600;
      span {
        display: inline-block;
        width: 110px;
        height: 55px;
        cursor: pointer;
        &:before {
          content: " ";
          display: inline-block;
          width: 55px;
          height: 55px;
          background: url("~@img/mi-logo.png") no-repeat center;
          background-size: 55px;
          transition: all 0.2s;
        }
        &:after {
          content: " ";
          display: inline-block;
          width: 55px;
          height: 55px;
          background: url("~@img/mi-home.png") no-repeat center;
          background-size: 55px;
        }
      }
      &:hover span::before {
        margin-left: -55px;
        transition: all 0.2s;
      }
    }
    .nav-info {
      width: 100%;
      padding-left: 160px;
      .nav-ul {
        .nav-li {
          float: left;
          padding: 0 30px;
          height: 55px;
          line-height: 55px;
          color: #333333;
          font-size: 16px;
          font-weight: bold;
          font-family: FZLanTingHeiS-R-GB;
          cursor: pointer;
          .nav-product {
            position: absolute;
            left: 0;
            top: 112px;
            opacity: 0;
            height: 0;
            transition: all 0.5s;
            z-index: 1000;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            ul {
              display: flex;
              justify-content: space-around;
              width: 100%;
              padding: 20px 0;
              border-top: 1px solid #ccc;
              li {
                padding: 0 12px;
                height: 220px;
                text-align: center;
                img {
                  width: 180px;
                  height: 112px;
                  border-right: 1px solid #ccc;
                }
                .pro-name {
                  height: 40px;
                  line-height: 40px;
                  color: #333333;
                  font-weight: 600;
                }
                .pro-price {
                  font-weight: 600;
                  color: $primary;
                }
                &:last-child {
                  img {
                    border-right: 0px;
                  }
                }
              }
            }
          }
          &:hover {
            color: #ff6600;
            .nav-product {
              opacity: 1;
              height: 220px;
            }
          }
        }
      }
    }
    .search {
      width: 350px;
    }
  }
}
</style>
