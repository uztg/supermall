import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      let oldProduct = null;
      for (const item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      //这个数组find 方法和上面的for-of 方法实现的效果一样
      // let oldProduct = state.cartList.find(item=> { return item.iid===payload.iid})

      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count =1
        state.cartList.push(payload)
      }

      
      
    }
  },
  actions: {

  }
})
