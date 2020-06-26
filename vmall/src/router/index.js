import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index'
import { isLogin } from './../server/index'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: () => import('./../views/home/Home.vue') },
    { path: '/category', name: 'category', component: () => import('./../views/category/Category.vue') },
    { path: '/cart', name: 'cart', component: () => import('./../views/cart/Cart.vue') },
    { path: '/mine', name: 'mine', component: () => import('./../views/mine/Mine.vue') },
    { path: '/product', name: 'product', component: () => import('./../views/product/Product.vue') },
    { path: '/login', name: 'login', component: () => import('./../views/login/Login.vue') },
    { path: '/searchGood', name: 'searchGood', component: () => import('./../views/search/SearchGood.vue') },
    { path: '/order', name: 'order', component: () => import('./../views/order/Order.vue') },
    { path: '/pay', name: 'pay', component: () => import('./../views/cart/Pay.vue') },
    {
      path: '/evaluate', name: 'evaluate', component: () => import('./../views/order/Evaluate.vue'), beforeEnter(to, from, next) {
        if (from.path === '/order') {
          next()
        } else {
          next('/order?index=2')
        }
      }
    },
    {
      path: '/submit', name: 'submit', component: () => import('./../views/cart/Submit.vue'),
      beforeEnter(to, from, next) {
        if (store.state.cartGoods.some((arr) => arr.checked) || from.path === '/product') {
          next()
        } else {
          next('/cart')
        }
      }
    },
  ]
})
//全局路由守卫
router.beforeEach(async (to, from, next) => {
  if (store.state.token !== '' || to.path === '/login') {
    next()
  } else {
    let res = await isLogin()
    store.commit('UPDATE_TOKEN', res.data.login);
    store.commit('UPDATE_COUNT', res.data.count);
    next()
  }
})
export default router
