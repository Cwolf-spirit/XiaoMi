<template>
  <div>
    <div class="container">
      <div class="swiper">
        <div class="leftNav">
          <ul class="left-ul">
            <li class="left-li">
              <span>手机 电话卡</span>
              <img src="@img/icon-arrow.png" alt="" />
              <div class="productList">
                <ul>
                  <li
                    v-for="(item, index) in leftNavList"
                    :key="index"
                    @click="
                      $router.push({ name: 'product', query: { id: item.id } })
                    "
                  >
                    <img :src="item.img" />
                    <span class="proName">{{ item.title }}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="left-li">
              <span>电视 盒子</span>
              <img src="@img/icon-arrow.png" alt="" />
            </li>
            <li class="left-li">
              <span>笔记本 平板</span>
              <img src="@img/icon-arrow.png" alt="" />
            </li>
            <li class="left-li">
              <span>家电 插线板</span>
              <img src="@img/icon-arrow.png" alt="" />
            </li>
            <li class="left-li">
              <span>出行 穿戴</span>
              <img src="@img/icon-arrow.png" alt="" />
            </li>
            <li class="left-li">
              <span>耳机 音箱</span>
              <img src="@img/icon-arrow.png" alt="" />
            </li>
            <li class="left-li">
              <span>电源 配件</span>
              <img src="@img/icon-arrow.png" alt="" />
            </li>
            <li class="left-li">
              <span>生活 箱包</span>
              <img src="@img/icon-arrow.png" alt="" />
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
            <img
              class="cursor"
              :src="item.img"
              @click="$router.push({ name: 'product', query: { id: item.id } })"
            />
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="bannerList">
        <ul>
          <li
            v-for="(item, index) in bannerList"
            :key="index"
            @click="$router.push({ name: 'product', query: { id: item.id } })"
          >
            <img class="cursor" v-lazy="item.img" />
          </li>
        </ul>
      </div>
      <div class="banner container">
        <img
          style="width:100%"
          class="cursor"
          v-lazy="'/imgs/banner-1.png'"
          @click="$router.push({ name: 'product', query: { id: 30 } })"
        />
      </div>
    </div>
    <div class="phoneList">
      <div class="container">
        <p
          style="font-size: 22px;font-weight: 700;height: 70px;line-height: 70px;"
        >
          手机
        </p>
        <div class="content">
          <div class="left">
            <img src="@img/mix-alpha.jpg" alt="" />
          </div>
          <div class="right">
            <ul>
              <li
                v-for="(item, index) in phoneList"
                :key="index"
                @click="
                  $router.push({ name: 'product', query: { id: item.id } })
                "
              >
                <span v-if="index % 2 == 0" :class="{ title: index % 2 == 0 }"
                  >新品</span
                >
                <img :src="item.mainImage" alt="" />
                <p class="fwb">{{ item.name }}</p>
                <span>{{ item.subtitle }}</span>
                <p class="price fwb">
                  {{ item.price }}元
                  <img
                    @click.stop="addCart(item.id)"
                    class="cartLogo"
                    src="@img/icon-cart-hover.png"
                    alt=""
                  />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车模态框 -->
    <dialogCart
      :dialogVisible="dialogCarts"
      title="提示"
      @close="dialogCarts = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
      <template v-slot:footer>
        <span class="btn-small" @click="$router.push({ name: 'cart' })"
          >查看购物车</span
        >
      </template>
    </dialogCart>
  </div>
</template>

<script>
import { getProductList } from "@/api/Header.js";
import { getCartNum } from "@/api/app.js";
import { addCart } from "@/api/detail.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import dialogCart from "@components/dialog.vue";
export default {
  components: {
    swiper,
    swiperSlide,
    dialogCart
  },
  data() {
    return {
      dialogCarts: false,
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
      ],
      leftNavList: [
        {
          id: 30,
          img: "/imgs/item-box-1.png",
          title: "小米CC9"
        },
        {
          id: 31,
          img: "/imgs/item-box-2.png",
          title: "小米8青春版"
        },
        {
          id: 32,
          img: "/imgs/item-box-3.jpg",
          title: "Redmi K20Pro"
        },
        {
          id: 33,
          img: "/imgs/item-box-4.jpg",
          title: "4G移动专区"
        }
      ],
      bannerList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png"
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png"
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg"
        }
      ],
      phoneList: []
    };
  },
  created() {
    this.getPhoneList();
    if (this.$route.params.from && this.$route.params.from == "login") {
      this.getCartNum();
    }
  },
  methods: {
    getCartNum() {
      getCartNum().then(data => {
        this.$store.commit("cartNum", data);
      });
    },
    getPhoneList() {
      const obj = {
        categoryId: 100012,
        pageSize: 14
      };
      getProductList(obj).then(data => {
        this.phoneList = data.list.slice(6, 14);
      });
    },
    addCart(id) {
      const obj = {
        productId: id,
        selected: true
      };
      addCart(obj).then(data => {
        this.dialogCarts = true;
        this.$store.commit("cartNum", data.cartTotalQuantity);
      });
    }
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
    padding: 26px 0px;
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
.bannerList {
  margin-top: 20px;
  margin-bottom: 40px;
  ul {
    display: flex;
    justify-content: space-between;
    img {
      width: 296px;
      height: 167px;
    }
  }
}
.phoneList {
  margin-top: 50px;
  padding-bottom: 50px;
  background-color: #f5f5f5;
  .container {
    .content {
      display: flex;
      .left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 620px;
        }
      }
      .right {
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            cursor: pointer;
            width: 236px;
            height: 302px;
            text-align: center;
            background-color: #fff;
            padding: 24px 0;
            box-sizing: border-box;
            margin-bottom: 12px;
            position: relative;
            .title {
              position: absolute;
              top: 0;
              left: 50%;
              width: 67px;
              height: 24px;
              background-color: #7ecf68;
              transform: translateX(-50%);
              color: #fff;
              line-height: 24px;
            }
            img {
              width: 100%;
              height: 194px;
            }
            p {
              font-size: 14px;
            }
            span {
              font-size: 12px;
              color: #999999;
            }
            .price {
              margin-top: 12px;
              font-size: 14px;
              color: #f20a0a;
              .cartLogo {
                width: 16px;
                height: 16px;
                vertical-align: middle;
                margin-left: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
