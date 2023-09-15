import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
// 引入路由
import VueRouter from "vue-router";

Vue.config.productionTip = false


Vue.use(vuetify)
Vue.use(VueRouter)
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
