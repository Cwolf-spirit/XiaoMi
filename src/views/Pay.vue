<template>
  <div class="order-pay">
    <orderHearder
      title="订单支付"
      content="请谨防钓鱼链接或诈骗电话，了解更多>"
    ></orderHearder>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>
                {{ userInfo.receiverName }} {{ userInfo.receiverPhone }}
                {{ userInfo.receiverProvince }} {{ userInfo.receiverCity }}
                {{ userInfo.receiverDistrict }} {{ userInfo.receiverAddress }}
              </p>
            </div>
            <div class="order-total">
              <p>
                应付总额：<span>{{ payment }}</span
                >元
              </p>
              <p>
                订单详情<i
                  :class="
                    showDetail ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                  "
                  @click="showDetail = !showDetail"
                ></i>
              </p>
            </div>
          </div>
          <div class="item-detail" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{ id }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">
                {{ userInfo.receiverName }} {{ userInfo.receiverPhone }}
                {{ userInfo.receiverProvince }} {{ userInfo.receiverCity }}
                {{ userInfo.receiverDistrict }} {{ userInfo.receiverAddress }}
              </div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" />{{ item.productName }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div
              class="pay pay-ali"
              :class="{ checked: payType == 1 }"
              @click="payTypes(1)"
            ></div>
            <div
              class="pay pay-wechat"
              :class="{ checked: payType == 2 }"
              @click="payTypes(2)"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <qrcode v-if="showPay" :img="payImg" @close="closeQrcode"></qrcode>

    <dialogPay
      title="支付确认"
      :dialogVisible="showPayModal"
      @close="showPayModal = false"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
      <template v-slot:footer>
        <span class="btn-middle" @click="$router.push({ name: 'orderList' })"
          >查看订单</span
        >
        <span class="noPay btn-middle" @click="showPayModal = false"
          >未支付</span
        >
      </template>
    </dialogPay>
  </div>
</template>

<script>
import QRcode from "qrcode";
import orderHearder from "@components/orderHearder.vue";
import qrcode from "@components/qrcode.vue";
import dialogPay from "@components/dialog.vue";
import { getOrderDetail, toPay } from "@/api/pay.js";
export default {
  components: {
    orderHearder,
    qrcode,
    dialogPay
  },
  data() {
    return {
      id: this.$route.query.orderNo,
      showDetail: false,
      payment: 0, //应付金额
      orderDetail: [],
      userInfo: {},
      payType: 1, //支付方式
      showPay: false, // 是否展示微信二维码
      payImg: "", // 二维码
      timer: "", //定时器
      showPayModal: false //支付确认弹框
    };
  },
  created() {
    this.getOrderDetail();
  },
  methods: {
    closeQrcode() {
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.timer);
    },
    getOrderDetail() {
      getOrderDetail(this.id).then(data => {
        this.payment = data.payment;
        this.userInfo = data.shippingVo;
        this.orderDetail = data.orderItemVoList;
      });
    },
    payTypes(type) {
      this.payType = type;
      if (type == 1) {
        //支付宝支付
        window.open(`/#/order/aliPay?id=${this.id}`, "_blank");
      } else {
        const obj = {
          orderId: this.id,
          orderName: "Vue高仿小米商城",
          amount: 0.01, //单位元
          payType: 2 //1支付宝，2微信
        };
        toPay(obj).then(data => {
          QRcode.toDataURL(data.content)
            .then(url => {
              this.showPay = true;
              this.payImg = url;
              this.loopOrderState();
            })
            .catch(() => {
              this.$msg.error("微信二维码生成失败，请稍后重试");
            });
        });
      }
    },
    loopOrderState() {
      this.timer = setInterval(() => {
        getOrderDetail(this.id).then(data => {
          if (data.state == 20) {
            clearInterval(this.timer);
            this.$router.push({ name: "orderList" });
          }
        });
      }, 1000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.noPay {
  background-color: #ccc;
  margin-left: 16px;
}
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url("/imgs/icon-gou.png") #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          i {
            cursor: pointer;
            margin-left: 16px;
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url("/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url("/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>
