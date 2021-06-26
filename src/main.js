import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import toast from 'components/common/toast'

//安装自己写的toast插件
Vue.use(toast)
Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
