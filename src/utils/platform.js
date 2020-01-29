import axios from "@/http";
import router from "../router";
import store from "../store";
import VueCookie from "vue-cookie";
// 退出功能
function signOut() {
  axios.post("/user/logout", {}).then(() => {
    // 清楚vuex数据和cookie
    VueCookie.set("userId", "");
    store.commit("signOut");
    router.push({
      name: "login"
    });
  });
}

export default {
  signOut
};
