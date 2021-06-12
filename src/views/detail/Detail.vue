<template>
    <div class="detail">
        <detail-nav-bar />
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods='goods'/>
        <detail-shop-info :shop='shop'/>
    </div>
</template>
<script>
import {getDetail,Goods,Shop} from 'network/detail'


import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
export default{
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    name:"Detail",
    data(){
        return {
            iid:null,
            title:null,
            topImages:[],
            goods:{},
            shop:{}
        }
    },
    created(){
        this.iid = this.$route.params.iid;
        getDetail(this.iid).then(res=>{
            console.log(res)
            const data = res.result
            //1.获取轮播图
            this.topImages = data.itemInfo.topImages
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //3.获取店铺信息
            this.shop = new Shop(data.shopInfo,data.score)
        });
        
    }
}
</script>
<style scoped>

</style>