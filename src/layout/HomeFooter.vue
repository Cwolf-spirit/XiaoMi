<template>
  <div>
    <div class="serverInfo">
      <div class="container">
        <ul class="server-ul">
          <li>
            <i class="iconfont iconbuoumaotubiao46"></i>
            <span>预约维修服务</span>
          </li>
          <li>
            <i class="iconfont icon7tiantuihuan"></i>
            <span>7天无理由退货</span>
          </li>
          <li>
            <i class="iconfont icon15tianwuliyoutuihuo"></i>
            <span>15天免费换货</span>
          </li>
          <li>
            <i class="iconfont iconbaoyou"></i>
            <span>满150元包邮</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="divider"></div>
    <div class="footer">
      <div class="footer-logo">
        <img src="@img/logo-footer.png" alt="" />
        <p>小米商城</p>
      </div>
      <div class="authorInfo">
        <p>
          HuLL主页 | Vue项目 | React全家桶项目 | 小程序项目 | NodeJS | Python
          Copyright
        </p>
        <p>hubei510@163.com</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.serverInfo {
  background-color: #fff;
  .server-ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    li {
      width: 25%;
      position: relative;
      text-align: center;
      &::after {
        position: absolute;
        right: 0;
        top: -6px;
        content: "";
        width: 1px;
        height: 34px;
        background-color: #ccc;
      }
      i {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
}
.divider {
  width: 100%;
  height: 4px;
  background-color: $primary;
}
.footer {
  height: 234px;
  background-color: #333;
  color: #999;
  text-align: center;
  img {
    width: 53px;
    height: 36px;
    margin-top: 36px;
  }
  p {
    height: 36px;
    line-height: 36px;
  }
}
</style>
