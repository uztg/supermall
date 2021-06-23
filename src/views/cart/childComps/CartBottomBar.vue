<template>
    <div class="cart-bottom-bar">
        <div class="item-selector">
            <check-button class="button"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalPrice}}
        </div>
    </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'
export default {
    name:'CartBottomBar',
    components:{
        CheckButton,
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            //这是我写的方法
            // var sum=0
            // for (let i = 0; i < this.cartList.length; i++) {
            //     if(this.cartList[i].checked){
            //         sum += this.cartList[i].count*this.cartList[i].price
            //     }
            // }
            // return sum
    }
}}
</script>
<style scoped>
.cart-bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
}
.item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: -8px;
    left: 10px;
}
.item-selector span{
    float: right;
}
.price{
    margin-left: 30px;
}
</style>