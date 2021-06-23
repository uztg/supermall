<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
        <cart-list-item 
        v-for="(item,index) in cartList" 
        :key='index' 
        :itemInfo='item'>
        </cart-list-item>
        </scroll>
    </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
    name:'Cartlist',
    components:{
        Scroll,
        CartListItem
    },
    props:{
        cartList:{
            typeof:Object,
            default(){
                return {}
            }
        }
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>
<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>