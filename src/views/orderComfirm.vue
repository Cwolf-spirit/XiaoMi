<template>
  <div>
    <orderHearder
      title="确认订单"
      content="请谨防钓鱼链接或诈骗电话，了解更多>"
    ></orderHearder>
    <div class="wrapper container">
      <p>收获地址</p>
      <div class="address clearfix">
        <div class="userInfo" v-if="addressList.length > 0">
          <div
            class="itemUser fl"
            v-for="(item, index) in addressList"
            :class="{ active: index == checkIndex }"
            :key="index"
            @click="checkIndex = index"
          >
            <p class="name">{{ item.receiverName }}</p>
            <div class="phone">{{ item.receiverPhone }}</div>
            <div class="home">
              {{ item.receiverProvince }} {{ item.receiverCity }}
              {{ item.receiverDistrict }} {{ item.receiverAddress }}
            </div>
            <img
              class="delete"
              src="@img/delete.png"
              @click="deleteAdd(item)"
              alt=""
            />
            <img
              class="edit"
              src="@img/edit.png"
              @click="editAdd(item)"
              alt=""
            />
          </div>
        </div>
        <div class="item fl" @click="addNewAddress">
          <img src="@img/添加.png" alt="" />
          <p class="add">添加新地址</p>
        </div>
      </div>
      <div class="productInfo">
        <h2>商品</h2>
        <el-divider></el-divider>
        <div class="productItem" v-for="(item, index) in cartList" :key="index">
          <div class="info col-5">
            <img :src="item.productMainImage" alt="" />
            <span class="productName"
              >{{ item.productName }} {{ item.productSubtitle }}</span
            >
          </div>
          <div class="productPrice col-3">
            {{ item.productPrice }}元X{{ item.quantity }}
          </div>
          <div class="productTotalPrice col-2">
            {{ item.productTotalPrice }}元
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="appendInfo">
        <div class="infoItem">
          <div class="title col-1">配送方式</div>
          <div class="info col-5">
            <span>包邮</span>
          </div>
        </div>
        <div class="infoItem">
          <div class="title col-1">发票</div>
          <div class="info col-5">
            <span>电子发票</span>
            <span>个人</span>
            <span>商品明细</span>
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="item">
          <div class="itemName col-5">商品件数：</div>
          <div class="itemValue col-04">{{ count }}件</div>
        </div>
        <div class="item">
          <div class="itemName col-5">商品总价：</div>
          <div class="itemValue col-04">{{ cartTotalPrice }}元</div>
        </div>
        <div class="item">
          <div class="itemName col-5">
            优惠活动：
          </div>
          <div class="itemValue col-04">0元</div>
        </div>
        <div class="item">
          <div class="itemName col-5">
            运费：
          </div>
          <div class="itemValue col-04">0元</div>
        </div>
        <div class="item">
          <div class="itemName col-5">
            应付总额：
          </div>
          <div class="value col-04">{{ cartTotalPrice }}<span>元</span></div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="btns">
        <div class="toCart btn-middle" @click="$router.push({ name: 'cart' })">
          返回购物车
        </div>
        <div class="offer btn-middle" @click="toAccount">去结算</div>
      </div>
    </div>

    <!-- 收货地址表单 -->
    <dialogAddress
      :title="title"
      :dialogVisible="dialogAddress"
      @close="dialogAddress = false"
      class="dialogAddress"
    >
      <template v-slot:body>
        <div class="form">
          <div class="item">
            <div class="name">
              <input type="text" placeholder="姓名" v-model="receiverName" />
            </div>
            <div class="phone">
              <input
                type="text"
                placeholder="手机号"
                maxlength="11"
                v-model="receiverMobile"
              />
            </div>
          </div>
          <div class="item">
            <div class="select">
              <el-cascader
                placeholder="选择省/市/区/街道"
                v-model="cityValue"
                :options="city"
                @change="handleChange"
              ></el-cascader>
            </div>
          </div>
          <div class="item">
            <textarea
              v-model="receiverAddress"
              name="address"
              id="address"
              cols="3"
              rows="3"
              placeholder="详细地址"
            ></textarea>
          </div>
          <div class="item">
            <div class="postal">
              <input
                type="text"
                placeholder="邮政编号"
                maxlength="6"
                v-model="receiverZip"
              />
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <span class="btn-small" @click="submitAddress">保存</span>
        <span class="btn-small cancel" @click="dialogAddress = false"
          >取消</span
        >
      </template>
    </dialogAddress>
  </div>
</template>

<script>
import city from "@utils/city.js";
import {
  getAddressList,
  submitAddress,
  toAccount
} from "@/api/orderComfirm.js";
import { getCartList } from "@/api/cart.js";
import orderHearder from "@components/orderHearder.vue";
import dialogAddress from "@components/dialog.vue";
export default {
  components: {
    orderHearder,
    dialogAddress
  },
  data() {
    return {
      city, //地址
      addressList: [], //地址列表
      dialogAddress: false, //表单展示
      title: "", //地址标题
      cityValue: [],
      receiverName: "", //姓名
      receiverMobile: "", //手机号
      receiverProvince: "", //省
      receiverCity: "", //市
      receiverDistrict: "", //区
      receiverAddress: "", //详细地址
      receiverZip: "", //邮政编码
      shippingId: "", //订单id
      editItem: {}, //选中地址
      type: 1, //1.增，2.修改
      cartList: [], //购物车列表
      count: 0, //商品件数
      cartTotalPrice: "", //价格
      checkIndex: 0 //选中地址
    };
  },
  created() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    toAccount() {
      let item = this.addressList[this.checkIndex];
      if (!item) {
        this.$message.error("请选择一个收货地址");
        return;
      }
      const obj = {
        shippingId: item.id
      };
      toAccount(obj).then(data => {
        this.$router.push({ name: "pay", query: { orderNo: data.orderNo } });
      });
    },
    getCartList() {
      this.count = 0;
      let arr = [];
      getCartList().then(data => {
        this.cartTotalPrice = data.cartTotalPrice;
        this.cartList = data.cartProductVoList.filter(
          item => item.productSelected
        );
        arr = this.cartList.map(item => item.quantity);
        this.count = arr.reduce((x, y) => x + y, 0);
      });
    },
    handleChange(value) {
      value.forEach(item => {
        this.city.forEach(item1 => {
          if (item == item1.value) {
            this.receiverProvince = item1.label;
          }
          if (item1.children) {
            item1.children.forEach(item2 => {
              if (item == item2.value) {
                this.receiverCity = item2.label;
              }
              if (item2.children) {
                item2.children.forEach(item3 => {
                  if (item == item3.value) {
                    this.receiverDistrict = item3.label;
                  }
                });
              }
            });
          }
        });
      });
    },
    getAddressList() {
      getAddressList().then(data => {
        this.addressList = data.list;
      });
    },
    deleteAdd(item) {
      this.$confirm("确认删除该地址吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          submitAddress(`/shippings/${item.id}`, "delete").then(() => {
            this.$msg.success("删除成功");
            this.getAddressList();
          });
        })
        .catch(() => {});
    },
    editAdd(item) {
      this.receiverName = item.receiverName;
      this.receiverMobile = item.receiverMobile;
      this.getCitys(item);
      this.receiverAddress = item.receiverAddress;
      this.receiverZip = item.receiverZip;
      this.dialogAddress = true;
      this.title = "修改收货地址";
      this.type = 2;
      this.editItem = item;
    },
    getCitys(item) {
      this.city.forEach(item1 => {
        if (item1.label == item.receiverProvince) {
          if (item1.children) {
            item1.children.forEach(item2 => {
              if (item2.label == item.receiverCity) {
                if (item2.children) {
                  item2.children.forEach(item3 => {
                    if (item3.label == item.receiverDistrict) {
                      this.cityValue = [item1.value, item2.value, item3.value];
                    }
                  });
                }
              }
            });
          }
        }
      });
    },
    addNewAddress() {
      this.dialogAddress = true;
      this.title = "添加收货地址";
      this.type = 1;
    },
    submitAddress() {
      const {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress,
        receiverZip
      } = this;
      const obj = {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress,
        receiverZip
      };
      // type 1:增 2：改
      if (this.type === 1) {
        if (!this.receiverName) {
          this.$msg.error("请填写姓名");
          return;
        }
        if (!this.receiverMobile) {
          this.$msg.error("请填写手机号");
          return;
        }
        if (!this.cityValue) {
          this.$msg.error("请选择地址");
          return;
        }
        if (!this.receiverDistrict) {
          this.$msg.error("请填写详细地址");
          return;
        }
        if (!this.receiverZip) {
          this.$msg.error("请填写邮政编号");
          return;
        }

        submitAddress("/shippings", "post", obj).then(data => {
          this.$msg.success("新建地址成功");
          this.shippingId = data.shippingId;
          this.dialogAddress = false;
          this.getAddressList();
        });
      } else {
        submitAddress(`/shippings/${this.editItem.id}`, "put", obj).then(() => {
          this.$msg.success("修改成功");
          this.receiverName = "";
          this.receiverMobile = "";
          this.receiverProvince = "";
          this.receiverCity = "";
          this.receiverDistrict = "";
          this.receiverAddress = "";
          this.receiverAddress = "";
          this.receiverZip = "";
          this.dialogAddress = false;
          this.getAddressList();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.col-04 {
  flex: 0.4;
}
.col-1 {
  flex: 1;
}
.col-2 {
  flex: 2;
}
.col-3 {
  flex: 3;
}
.col-5 {
  flex: 5;
}
.wrapper {
  padding: 40px 64px 90px 64px;
  background-color: #fff;
  margin-top: 30px;
  p {
    font-size: 20px;
    font-weight: 600;
    height: 45px;
  }
  .address {
    .userInfo {
      .itemUser {
        width: 270px;
        height: 180px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        padding: 20px;
        margin-right: 18px;
        margin-bottom: 18px;
        position: relative;
        cursor: pointer;
        &.active {
          border-color: #ff6600;
          color: #ff6600;
          .home {
            color: #ff6600;
          }
        }
        img {
          width: 30px;
          cursor: pointer;
        }
        .delete {
          position: absolute;
          bottom: 16px;
          left: 16px;
        }
        .edit {
          position: absolute;
          right: 16px;
          bottom: 16px;
        }
        .name {
          font-weight: bold;
          font-size: 16px;
        }
        .phone {
          font-size: 14px;
          color: #666;
        }
        .home {
          font-size: 14px;
          color: #666;
        }
      }
    }
    .item {
      width: 270px;
      height: 180px;
      border: 1px solid #e5e5e5;
      text-align: center;
      padding-top: 50px;
      box-sizing: border-box;
      cursor: pointer;
      img {
        width: 30px;
      }
      .add {
        font-size: 14px;
        color: #999;
        margin-top: 10px;
      }
    }
  }
  .productInfo {
    margin-top: 12px;
    h2 {
      font-size: 20px;
      font-weight: 600;
    }
    .el-divider {
      margin: 16px 0;
    }
    .productItem {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 50px;
      }
      .info {
        display: flex;
        align-items: center;
      }
      .productTotalPrice {
        font-weight: 600;
        color: #ff6600;
      }
    }
  }
  .appendInfo {
    margin-top: 20px;
    .infoItem {
      display: flex;
      margin-bottom: 16px;
      .title {
        font-size: 20px;
        font-weight: 600;
      }
      .info {
        span {
          margin-right: 16px;
          color: #ff6600;
        }
      }
    }
  }
  .detail {
    text-align: right;
    .item {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 6px;
      &:last-child {
        margin-top: 20px;
      }
      .itemName {
        color: #999;
      }
      .itemValue {
        color: #ff6600;
      }
      .value {
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: 600;
        color: #ff6600;
        span {
          font-size: 16px;
          font-weight: 400;
          margin-top: 8px;
        }
      }
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    .toCart {
      background-color: #fff;
      border: 1px solid #ccc;
      color: #ccc;

      margin-right: 20px;
    }
  }
}
.dialogAddress {
  .form {
    .item {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      &:nth-child(3) {
        padding: 10px;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
      &:nth-child(4) {
        justify-content: flex-start;
      }
      input {
        width: 100%;
        height: 100%;
        border: none;
        text-indent: 20px;
      }
      .name,
      .phone,
      .postal {
        width: 283px;
        height: 40px;
        border: 1px solid #ccc;
      }
      .select,
      .el-cascader {
        width: 100%;
        &::v-deep input {
          border: 1px solid #ccc;
          border-radius: 0;
        }
      }
      #address {
        resize: none;
        width: 100%;
        border: none;
        outline: none;
      }
    }
  }
  .cancel {
    background-color: #b0b0b0;
  }
}
</style>
