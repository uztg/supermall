import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)
const state =  {
  cartList:[]
}
export default new Vuex.Store({
  state,
  mutations,
  //mutations 唯一目的就是修改state中的状态
  //mutations 中的每一个方法 尽可能完成的事情比较单一一点
  actions,
  getters,
})
