import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
//安装图片懒加载插件
Vue.use(VueLazyload,{
  loading:require('assets/img/common/placeholder.png')
})
//安装自己写的toast插件
Vue.use(toast)
//解决移动端300ms延迟的问题
FastClick.attach(document.body)

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
