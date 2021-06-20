<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll 
        class="detail-content" 
        ref="scroll" 
        :probe-type="3"
        @scroll="contentScroll">
            <detail-swiper :topImages="topImages"/>
            <detail-base-info :goods='goods'/>
            <detail-shop-info :shop='shop'/>
            <detail-goods-info :detailInfo='detailInfo' @imageLoad="imageLoad"/>
            <detail-param-info ref='param' :paramInfo='paramInfo'/>
            <detail-comment-info ref='comment' :commentInfo='commentInfo'/>
            <goods-list ref='recommend' :goods='recommends'/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <detail-bottom-bar @addToCart="addToCart"/>
    </div>
</template>
<script>
import {getDetail,Goods,Shop,GoodsParam,getRecommend1} from 'network/detail'
import { imageLearnnerMixIn } from 'common/mixin'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from 'components/content/goods/GoodsList'
import Scroll from "components/common/scroll/Scroll"
import { BackTopMixin } from 'common/mixin'


export default{
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll
    },
    name:"Detail",
    mixins:[imageLearnnerMixIn,BackTopMixin],
    data(){
        return {
            iid:null,
            title:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
        }
    },
    created(){
        this.iid = this.$route.params.iid;
        getDetail(this.iid).then(res=>{
            // console.log(res)
            const data = res.result
            //1.获取轮播图
            this.topImages = data.itemInfo.topImages
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //3.获取店铺信息
            this.shop = new Shop(data.shopInfo,data.score)
            //4.保存商品详情
            this.detailInfo = data.detailInfo
            //5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //6.获取评论信息
            if(data.rate.cRate!==0){
                this.commentInfo = data.rate.list[0]
            }

            this.$nextTick(()=>{
                //根据最新的数据，对应的DOM已经渲染出来了
                //但是图片还没有加载完毕
                //offsetTop值不对 一半因为图片的问题
            // this.themeTopYs.push(0);
            // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // console.log(this.themeTopYs)
        })
        });
        getRecommend1().then(res=>{
            console.log(res.data.list)
            this.recommends = res.data.list
        });


        
    },
    mounted(){
    },
    destroy(){
        this.$bus.$off('imageLoad',this.itemLearnner)
    },
    methods:{
        imageLoad(){
            this.newRefresh()
            // this.$refs.scroll.refresh()
            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // console.log(this.themeTopYs)

            //故意传入一个最大值 方便下面使用
            this.themeTopYs.push(Number.MAX_VALUE);
        },
        titleClick(index){
            console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        contentScroll(position){
            const positionY = -position.y
            // console.log(positionY)
            length=this.themeTopYs.length
            for (let i = 0;i<length-1;i++) {
                if(this.$refs.nav.currentIndex != i &&(this.themeTopYs[i]<= positionY && positionY < this.themeTopYs[i+1])){
                   this.$refs.nav.currentIndex = i
                   console.log(i)
                }
            }
            //决定backtop 是否显示
            this.isShowBackTop = (-position.y) > 1000
            //决定 tabcontrol 是否吸顶(positon:fixed)
            this.isTabFixed = (-position.y)>=this.tabOffsetTop
            // this.saveY = position.y //这里直接把坐标给 saveY 就行了
        },
        addToCart(){
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.newPrice;
            product.iid = this.iid
            console.log(product)
        }
    }
}
</script>
<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;

}
.detail-content{
    height: calc(100% - 44px);
    /* overflow: hidden; */
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>