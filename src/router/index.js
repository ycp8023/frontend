import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/images',
    name: 'images',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Images/Image.vue')
    }
  },
  {
    path: '/image_detail',
    name: 'imageDetail',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Images/ImageDetail.vue')
    }
  },
  {
    path: '/containers',
    name: 'containers',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/containers/Containers.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
return originalPush.call(this , location).catch(err=>err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
return originalReplace.call(this , location).catch(err=>err)
}

const router = new VueRouter({
  routes
})

export default router
