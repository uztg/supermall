<template>
    <div class="cart-bottom-bar">
        <div class="item-selector"  @click="selectAll">
            <check-button class="button" :isChecked='isSelectAll'></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalPrice}}
        </div>
        <div class="calculate" @click="calClick">去计算:{{checkedLength}}</div>
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

            return "￥"+this.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue+item.price *item.count
            },0)//视频中的方法 看会了。多看多写多学
    },
    checkedLength(){
        return this.cartList.filter(item=>{
            return item.checked
        }).length
    },
    isSelectAll(){
        return !(this.cartList.filter(item => !item.checked).length) && this.cartList.length != 0
    }
    },
    methods:{
        selectAll(){ 
            if(this.isSelectAll){//全部选中
                this.cartList.forEach(item => item.checked=false);
            }else{//有部分或者全部没选中
                this.cartList.forEach(item => item.checked=true);
            }
        },
        calClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买的商品',2000)
            }
        }
    }
}
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
    margin-left: 10px;
}
.item-selector span{
    float: right;
}
.price{
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.calculate{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    background: red;
    padding: 0 15px;
    color: #fff;
}
</style>