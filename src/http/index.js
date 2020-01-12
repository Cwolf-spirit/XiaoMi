import axios from "axios";
import router from "@/router";
import Vue from "vue";
// import env from "../env";

// 如果没有用代理方式去解决跨域问题，可以用env中的环境变量解决
// axios.defaults.baseURL = env.baseURL;

const service = axios.create({
  baseURL: "/api",
  timeout: 8000 // request timeout
});
service.interceptors.response.use(
  response => {
    // eslint-disable-next-line no-console
    console.log(response.data, response.config.url);
    let res = response.data;
    if (res.status == 0) {
      return res.data;
    } else if (res.status == 10) {
      //   store.commit('signOut');
      router.replace({
        name: "/login"
      });
      const data = {
        status: 10,
        msg: "您的账号在它处登录成功，当前位置已退出，如有疑问请及时修改密码"
      };
      return data;
    } else {
      Vue.prototype.$msg.error(res.msg);
    }
  },
  err => {
    return Promise.reject(err);
  }
);
export default service;
