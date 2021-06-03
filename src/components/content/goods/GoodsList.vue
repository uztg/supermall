<template>
    <div class="goods">
        <goods-list-item  v-for="(goodsitem,index) in goods" :key='index' :goodsitem='goodsitem' />
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
    name:'GoodsList',
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>
