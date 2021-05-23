import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Cart = () => import('views/cart/Cart')
const routes=[
  { 
    path: '',
    redirect:'/home'
  },
  { 
    path: '/home',
    component:Home
  },
  { 
    path: '/category',
    component:Category
  },
  { 
    path: '/profile',
    component:Profile
  },
  { 
    path: '/cart',
    component:Cart
  },
]
const router =new Router({
  mode: 'history',
  routes: routes

})
export default router
