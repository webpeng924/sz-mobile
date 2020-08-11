import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import loadingIndex from "./loadingIndex";
// 引入样式
import './assets/css/reset.css'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  store.commit('showLoading')
  if (config.url.substr(0, 4) === '/api') {
    config.url = 'https://hb.rgoo.com/api/api.php' + config.url.substr(4)
    // config.url = 'http://192.168.0.110:8066' + config.url.substr(4)
  }
  return config
},
  error => {
    store.commit('hideLoading')
    return error
  }
)

axios.interceptors.response.use((response) => {
  store.commit('hideLoading');//关闭loading
  return response;
})

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(loadingIndex);
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
