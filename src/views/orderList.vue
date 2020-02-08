<template>
  <div class="orderList">
    <orderHearder
      title="订单列表"
      content="请谨防钓鱼链接或诈骗电话，了解更多>"
    ></orderHearder>
    <div class="loading" v-if="loading">
      <img src="@img/loading-svg/loading-bars.svg" alt="" />
    </div>
    <div class="container">
      <!-- <div
        style="height: 100vh;overflow-y: auto;"
        class="wrapper"
        v-infinite-scroll="getMore"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance="410"
      > -->
      <div class="wrapper">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="title">
            <div class="left">
              <span>{{ item.createTime }}</span>
              <span> | </span>
              <span>{{ item.receiverName }}</span>
              <span> | </span>
              <span>订单号：{{ item.orderNo }}</span>
              <span> | </span>
              <span>{{ item.paymentTypeDesc }}</span>
            </div>
            <div class="right">
              <span>应付金额：</span>
              <b>{{ item.payment }}</b>
              <span> 元 </span>
            </div>
          </div>
          <div
            class="product"
            v-for="(el, index) in item.orderItemVoList"
            :key="index"
          >
            <img :src="el.productImage" alt="" />
            <div class="detail">
              <h3>{{ el.productName }}</h3>
              <h3>{{ el.totalPrice }}元 X {{ el.quantity }}</h3>
            </div>
            <div class="status" v-if="item.status == 20">
              <span>{{ item.statusDesc }}</span>
            </div>
            <div class="status" v-else>
              <span
                @click="
                  $router.push({
                    name: 'pay',
                    query: { orderNo: item.orderNo }
                  })
                "
                >{{ item.statusDesc }}</span
              >
            </div>
          </div>
        </div>
        <div
          class="scroll-more"
          v-infinite-scroll="getMore"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="410"
        >
          <img
            src="@img/loading-svg/loading-spinning-bubbles.svg"
            alt=""
            v-show="loading"
          />
        </div>
        <!-- <el-pagination layout="prev, pager, next" :total="50"> </el-pagination> -->
      </div>
      <!-- <p style="text-align: center;margin-bottom: 20px" v-if="loading">
        加载中...
      </p>
      <p style="text-align: center;margin-bottom: 20px" v-if="noMore">
        没有更多了
      </p> -->
      <div class="noData" v-if="!loading && list.length == 0">
        <img src="@img/icon-no-data.png" alt="" />
        <p>暂无提交的订单记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import orderHearder from "@components/orderHearder.vue";
import { getList } from "@/api/orderList.js";
import infiniteScroll from "vue-infinite-scroll";
export default {
  components: {
    orderHearder
  },
  data() {
    return {
      loading: false,
      list: [],
      pageNum: 1,
      total: "",
      busy: false
    };
  },
  computed: {
    noMore() {
      return this.list.length >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  directives: { infiniteScroll },
  created() {
    this.getList();
  },
  methods: {
    getMore() {
      this.loading = true;
      const obj = {
        pageSize: 4,
        pageNum: ++this.pageNum
      };
      getList(obj).then(data => {
        this.loading = false;
        this.list = this.list.concat(data.list);
      });
    },
    getList() {
      this.loading = true;
      const obj = {
        pageSize: 8,
        pageNum: this.pageNum
      };
      getList(obj).then(data => {
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.noData {
  margin: 50px 0;
  text-align: center;
  img {
    width: 256px;
  }
  p {
    margin: 20px 0;
    color: #999999;
  }
}
.loading {
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
  text-align: center;
  img {
    height: 100%;
  }
}
.wrapper {
  padding-top: 33px;
  .item {
    border: 1px solid #ccc;
    margin-bottom: 30px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 74px;
      padding: 0 42px;
      background-color: #fffaf7;
      span {
        color: #666666;
      }
      .right {
        b {
          font-size: 26px;
        }
      }
    }
    .product {
      background-color: #fff;
      padding: 24px 42px;
      box-sizing: border-box;
      display: flex;
      img {
        width: 70px;
      }
      .detail {
        line-height: 30px;
        flex: 1;
        margin-left: 45px;
      }
      .status {
        line-height: 70px;
        color: #ff6600;
        cursor: pointer;
      }
    }
  }
}
.el-pagination {
  text-align: center;
  margin-bottom: 20px;
}
.scroll-more {
  height: 20px;
  text-align: center;
}
</style>
