<template>
  <div class="product">
    <productTitle :title="product.name"></productTitle>

    <div class="productImg">
      <div class="bg1">
        <div class="title">
          <h1>{{ product.name }}</h1>
          <p>{{ product.subtitle }}</p>
          <span>全球首款双频 GP</span><span>|</span><span>骁龙845</span>
          <span>|</span> <span>AI 变焦双摄</span> <span>|</span>
          <span>红外人脸识别</span>
          <div>
            <span>￥{{ product.price }}</span>

            <del>￥2999</del>
          </div>
        </div>
        <img src="@img/product/product-bg-1.png" alt="" />
      </div>
      <div class="bg2">
        <img src="@img/product/product-bg-2.png" alt="" />
      </div>
      <img src="@img/product/product-bg-3.png" alt="" />
    </div>

    <div class="productSwiper">
      <el-carousel trigger="click" type="card" indicator-position="outside">
        <el-carousel-item v-for="item in productSwiperImg" :key="item">
          <img :src="item" alt="" style="width:627px;height:356px" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="videoBox">
      <h1>
        60帧超慢动作摄影
      </h1>
      <h1>慢慢回味每一瞬间的精彩</h1>
      <p>
        后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
      </p>
      <p>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
      <div class="videoImg" @click="showSlide = true"></div>
      <div class="videoDiv">
        <div class="videoMask" v-if="showSlide"></div>
        <div class="video" :class="{ slide: showSlide }">
          <span class="close" @click="closeVideo"></span>
          <video
            ref="video"
            src="@img/product/video.mp4"
            muted
            autoplay
            controls="controls"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productTitle from "@components/productTitle.vue";
import gallery1 from "@img/product/gallery-1.png";
import gallery2 from "@img/product/gallery-2.png";
import gallery3 from "@img/product/gallery-3.png";
import gallery4 from "@img/product/gallery-4.png";
import gallery5 from "@img/product/gallery-5.jpg";
import gallery6 from "@img/product/gallery-6.jpg";
import { getDetail } from "@/api/product.js";
export default {
  components: {
    productTitle
  },
  data() {
    return {
      product: {},
      showSlide: false,
      productSwiperImg: [
        gallery1,
        gallery2,
        gallery3,
        gallery4,
        gallery5,
        gallery6
      ]
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail(this.$route.query.id).then(res => {
        this.product = res;
      });
    },
    closeVideo() {
      this.showSlide = false;
      this.$refs.video.pause();
      this.$refs.video.currentTime = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  .productImg {
    img {
      width: 100%;
    }
    .bg1 {
      position: relative;
      text-align: center;
      .title {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 20px;
        h1 {
          font-size: 80px;
        }
        p {
          font-size: 24px;
          letter-spacing: 12px;
        }
        span {
          margin-left: 6px;
          color: #333;
        }
        div {
          span {
            font-size: 38px;
          }
          del {
            font-size: 26px;
            margin-left: 12px;
          }
        }
      }
    }
    .bg2 {
      width: 1226px;
      margin: 38px auto;
      background-color: #fff;
    }
  }
  .productSwiper {
    width: 1226px;
    margin: 36px auto;
  }
  .videoBox {
    height: 1044px;
    background-color: #070708;
    color: #fff;
    text-align: center;
    padding-top: 82px;
    h1 {
      font-size: 60px;
      font-weight: bold;
      &:nth-child(2) {
        margin-bottom: 48px;
      }
    }
    p {
      font-size: 24px;
      line-height: 60px;
    }
    .videoImg {
      cursor: pointer;
      width: 1226px;
      height: 540px;
      margin: 0 auto;
      background: url("~@img/product/gallery-1.png") no-repeat center;
      background-size: 100% 100%;
    }
    .videoDiv {
      .videoMask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.5;
        z-index: 101;
      }
      .video {
        position: fixed;
        top: -50%;
        left: 50%;
        width: 1000px;
        height: 563px;
        transform: translate(-50%, -50%);
        z-index: 101;
        opacity: 0;
        transition: all 0.5s;
        &.slide {
          top: 50%;
          opacity: 1;
        }
        .close {
          background: url("~@img/icon-close.png") no-repeat center;
          position: absolute;
          right: 14px;
          top: 10px;
          width: 50px;
          height: 50px;
          background-color: #ff7301;
          border-radius: 50%;
          cursor: pointer;
          z-index: 101;
        }
        video {
          width: 100%;
          outline: none;
        }
      }
    }
  }
}
</style>
