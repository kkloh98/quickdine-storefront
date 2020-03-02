import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/stores/:store_id',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/stores/:store_id/products',
    name: 'Products',
    component: () => import('../pages/Products.vue')
  },
  {
    path: '/stores/:store_id/products/:product_id',
    name: 'Product Detail',
    component: () => import('../pages/ProductDetail.vue')
  },
  {
    path: '/stores/:store_id/menu',
    name: 'Menu',
    component: () => import('../pages/Menu.vue')
  },
  {
    path: '/stores/:store_id/checkout',
    name: 'Checkout',
    component: () => import('../pages/Checkout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
