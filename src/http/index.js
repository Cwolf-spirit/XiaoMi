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
      router.replace({
        name: "login"
      });
      return Promise.reject(res);
    } else {
      Vue.prototype.$msg.error(res.msg);
      return Promise.reject(res);
    }
  },
  err => {
    return Promise.reject(err);
  }
);
export default service;
