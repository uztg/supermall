import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {addCart(context,payload){
  return new Promise((resolve,reject)=>{
    let oldProduct = null;
    for (const item of context.state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item
      }
    }
    //这个数组find 方法和上面的for-of 方法实现的效果一样
    // let oldProduct = context.contextstate.cartList.find(item=> { return item.iid===payload.iid})

    if (oldProduct) {
      //oldProduct.count += 1//在这里做不会被跟踪 所以要在mutations里面做
      context.commit(ADD_COUNTER,oldProduct)
      resolve("当前商品加1")
    } else {
      payload.count =1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
      resolve("增加了新商品")
    }   
  })
  }
}