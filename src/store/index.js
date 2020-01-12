import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false
  },
  mutations: {
    userInfo(state, data) {
      state.userInfo = data;
    },
    isLogin(state, data) {
      state.isLogin = data;
    }
  },
  actions: {
    isLogin({ commit }, data) {
      commit("isLogin", data);
    }
  },
  modules: {}
});
