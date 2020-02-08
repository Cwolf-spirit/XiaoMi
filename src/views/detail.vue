<template>
  <div>
    <productTitle :title="product.name"></productTitle>
    <div class="detail">
      <div class="container clearfix">
        <div class="left fl">
          <el-carousel
            trigger="click"
            height="364px"
            indicator-position="outside"
          >
            <el-carousel-item v-for="item in detailImg" :key="item">
              <img class="carouselImg" :src="item" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="right fr">
          <h2>{{ product.name }}</h2>
          <p class="title">
            相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS /
            骁龙845处理器 / 红 外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
          </p>
          <p class="self">小米自营</p>
          <span class="price">{{ product.price }}元</span
          ><del style="color:#999">2999元</del>
          <el-divider></el-divider>
          <div class="userInfo">
            <img src="@img/detail/icon-loc.png" alt="" />
            <span style="color:#999">北京 北京市 朝阳区 安定门街道</span>
            <span style="color:#ff6700;display:block;margin-top: 12px;"
              >有现货</span
            >
          </div>
          <div class="version">
            <p>选择版本</p>
            <div class="versionBtns">
              <div
                class="versionBtn"
                :class="{ checked: version == 1 }"
                @click="version = 1"
              >
                6GB+64GB 全网通
                <span>
                  1099元
                </span>
              </div>
              <div
                class="versionBtn"
                :class="{ checked: version == 2 }"
                @click="version = 2"
              >
                4GB+64GB 移动4G
                <span>
                  1049元
                </span>
              </div>
            </div>
          </div>
          <div class="color">
            <p>选择颜色</p>
            <div class="colorBtns">
              <div
                class="colorBtn"
                :class="{ checked: color == 1 }"
                @click="color = 1"
              >
                深空灰
              </div>
            </div>
          </div>
          <div class="priceBox">
            <div class="chooseProduct">
              <span
                >{{ product.name }}
                {{ version === 1 ? "6GB+64GB 全网通" : "4GB+64GB 移动4G" }}
                深灰色</span
              >
              <span>{{ product.price }}</span>
            </div>
            <div class="amountPrice">总计：{{ product.price }}</div>
          </div>
          <div class="cartBox">
            <span class="btn-large" @click="addCart">加入购物车</span>
            <span class="like">喜欢</span>
          </div>
        </div>
      </div>
    </div>
    <div class="description">
      <div class="container">
        <p>价格说明</p>
        <img src="@img/detail/item-price.jpeg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import productTitle from "@components/productTitle.vue";
import { getDetail } from "@/api/product.js";
import { addCart } from "@/api/detail.js";
import img1 from "@img/detail/phone-1.jpg";
import img2 from "@img/detail/phone-2.jpg";
import img3 from "@img/detail/phone-3.jpg";
import img4 from "@img/detail/phone-4.jpg";
export default {
  components: {
    productTitle
  },
  data() {
    return {
      id: this.$route.query.id,
      product: "",
      detailImg: [img1, img2, img3, img4],
      version: 1,
      color: 1
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail(this.id).then(res => {
        this.product = res;
      });
    },
    addCart() {
      const obj = {
        productId: this.id,
        selected: true
      };
      addCart(obj).then(data => {
        this.$store.commit("cartNum", data.cartTotalQuantity);
        this.$msg.success("添加成功");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  .container {
    padding: 30px 0 0 70px;
    box-sizing: border-box;
    .left {
      .el-carousel {
        width: 384px;
        .carouselImg {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      width: 584px;
      h2 {
        font-size: 28px;
      }
      .title {
        color: #999999;
        font-size: 14px;
        margin-bottom: 16px;
      }
      .self {
        color: #ff6700;
        font-weight: bold;
        margin-bottom: 16px;
      }
      .price {
        color: #ff6700;
        margin-right: 16px;
      }
      .userInfo {
        width: 584px;
        height: 108px;
        background-color: #fafaff;
        padding: 34px 27px;
        box-sizing: border-box;
        img {
          width: 20px;
          height: 22px;
          margin-right: 12px;
        }
      }
      .version {
        margin: 24px 0;
        p {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
        .versionBtns {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          .versionBtn {
            width: 287px;
            height: 50px;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            &.checked {
              color: #ff6700;
              border-color: #ff6700;
            }
          }
        }
      }
      .color {
        margin: 30px 0;
        p {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
        .colorBtns {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          .colorBtn {
            width: 287px;
            height: 50px;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            &.checked {
              color: #ff6700;
              border-color: #ff6700;
            }
          }
        }
      }
      .priceBox {
        width: 100%;
        height: 108px;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        padding: 24px 30px;
        box-sizing: border-box;
        background-color: rgba(255, 170, 255, 0.1);
        .chooseProduct {
          display: flex;
          justify-content: space-between;
        }
        .amountPrice {
          color: #ff6600;
          font-size: 24px;
          font-weight: bold;
          margin-top: 12px;
        }
      }
      .cartBox {
        margin: 30px 0;
        .like {
          margin-left: 16px;
          width: 142px;
          height: 54px;
          background-color: #bbb;
          display: inline-block;
          line-height: 54px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
.description {
  background-color: #f3f3f3;
  margin-top: 50px;
  padding: 38px 0;
  p {
    font-size: 24px;
    font-weight: bold;
    height: 50px;
  }
}
</style>
