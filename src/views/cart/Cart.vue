<template>
<div id="cart">
  <nav-bar class="cart-nav">
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
    <cart-list :cartList='cartList'/>
    <cart-bottom-bar />
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters(['cartLength','cartList'])
    }
  }
</script>

<style scoped>
#cart{
  height: 100vh;
  position: relative;
}
.cart-nav{
  background-color: var(--color-tint);
  color:#fff;

}
</style>
