import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
// elementui样式
import "element-ui/lib/theme-chalk/index.css";
// swiper样式
import "swiper/dist/css/swiper.css";
// import "./assets/iconfont/font_1606365_w3u33of6vdl/iconfont.css";

Vue.use(ElementUI);
Vue.use(ElementUI, { size: "medium", zIndex: 3000 });
Vue.config.productionTip = false;

Vue.prototype.$msg = {
  success: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.success(str);
  },
  error: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.error(str);
  },
  warning: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.warning(str);
  },
  info: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.info(str);
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
