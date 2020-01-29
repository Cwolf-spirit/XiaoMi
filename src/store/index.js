import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false,
    cartNum: 0
  },
  mutations: {
    signOut(state) {
      state.userInfo = {};
      state.isLogin = false;
      state.cartNum = 0;
    },
    userInfo(state, data) {
      state.userInfo = data;
    },
    isLogin(state, data) {
      state.isLogin = data;
    },
    cartNum(state, data) {
      state.cartNum = data;
    }
  },
  actions: {
    isLogin({ commit }, data) {
      commit("isLogin", data);
    }
  },
  modules: {}
});
