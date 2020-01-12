<template>
  <div class="container">
    <div class="swiper">
      <div class="leftNav">
        <ul class="left-ul">
          <li class="left-li">
            <span>手机 电话卡</span>
            <img src="@img/icon-arrow.png" alt="" />
            <div class="productList">
              <ul>
                <li>
                  <img src="@img/item-box-1.png" alt="" />
                  <span class="proName">小米9</span>
                </li>
                <li>
                  <img src="@img/item-box-1.png" alt="" />
                  <span class="proName">小米9</span>
                </li>
                <li>
                  <img src="@img/item-box-1.png" alt="" />
                  <span class="proName">小米9</span>
                </li>
                <li>
                  <img src="@img/item-box-1.png" alt="" />
                  <span class="proName">小米9</span>
                </li>
              </ul>
            </div>
          </li>
          <li class="left-li">
            <span>手机 电话卡</span>
            <img src="@img/icon-arrow.png" alt="" />
          </li>
          <li class="left-li">
            <span>手机 电话卡</span>
            <img src="@img/icon-arrow.png" alt="" />
          </li>
          <li class="left-li">
            <span>手机 电话卡</span>
            <img src="@img/icon-arrow.png" alt="" />
          </li>
          <li class="left-li">
            <span>手机 电话卡</span>
            <img src="@img/icon-arrow.png" alt="" />
          </li>
          <li class="left-li">
            <span>手机 电话卡</span>
            <img src="@img/icon-arrow.png" alt="" />
          </li>
          <li class="left-li">
            <span>手机 电话卡</span>
            <img src="@img/icon-arrow.png" alt="" />
          </li>
        </ul>
      </div>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
          <img :src="item.img" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        autoplay: true, //可选选项，自动滑动
        loop: true,
        speed: 300,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperSlides: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-5.jpg"
        }
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
  .leftNav {
    width: 264px;
    height: 100%;
    background: rgba(85, 88, 90, 0.5);
    position: absolute;
    z-index: 100;
    padding: 43px 0px;
    box-sizing: border-box;
    .left-ul {
      .left-li {
        cursor: pointer;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        span {
          color: #fff;
        }
        img {
          width: 10px;
          height: 15px;
        }
        &:hover {
          background-color: $primary;
          .productList {
            display: block;
          }
        }
        .productList {
          display: none;
          position: absolute;
          left: 264px;
          top: 0;
          width: 962px;
          height: 451px;
          background-color: #fff;
          box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
          ul {
            height: 100%;
            padding: 14px 23px;
            box-sizing: border-box;
            li {
              float: left;
              width: 25%;
              height: 75px;
              line-height: 75px;
              img {
                width: 35px;
                height: 42px;
                vertical-align: middle;
                margin-right: 16px;
              }
              .proName {
                color: #333;
              }
              &:hover {
                background-color: rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }
  }
  .swiper-container {
    width: 100%;
    height: 451px;
    .swiper-slide {
      img {
        width: 100%;
      }
    }
    .swiper-button-prev {
      left: 264px;
    }
  }
}
</style>
