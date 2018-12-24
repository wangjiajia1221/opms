import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import routes from './views/router.js'

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  //base: __dirname,
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
