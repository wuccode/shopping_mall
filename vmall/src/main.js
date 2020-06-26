import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './fastclick/fastclick';
import './config/rem'
import './vant/vant'
import VueLazyLoad from 'vue-lazyload'
 Vue.use(VueLazyLoad,{
     preLoad: 1.3,
     error:require('./images/mask.png'),
     loading:require('./images/mask.png'),
     attempt: 1
 })
Vue.config.productionTip = false
//金钱过滤
Vue.filter('money', function (value) {
   return '¥'+value
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')