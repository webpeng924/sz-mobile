import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOADING: false,
    userInfo: {},
    nowGoods: ''
  },
  mutations: {
    setJson (state, value) {
      state.userInfo = value
    },
    setGoods (state, value) {
      state.nowGoods = value
    },
    showLoading (state) {
      state.LOADING = true
    },
    hideLoading (state) {
      state.LOADING = false
    }
  },
  actions: {
  },
  modules: {
  }
})
