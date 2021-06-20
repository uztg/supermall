<template>
<div id="home">
<router-view />
<nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>
<tab-control :class="{tabfixed:isTabFixed}"
              :titles="['流行','新款','精选']"
              @tabClick="tabClick"
              ref="tabControl1" 
              class="tab-control"
              v-show="isTabFixed"/>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp='loadMore'>
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recommends="recommends"/>
    <feature-view class="feature" />
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"/>
    <goods-list :goods="showGoods"/>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/TabControl"
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from "components/common/scroll/Scroll"
import { imageLearnnerMixIn,BackTopMixin } from 'common/mixin'

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    mixins:[imageLearnnerMixIn,BackTopMixin],
    components: {
      NavBar,
      TabControl,
      Scroll,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
  created(){
    //请求多个数据
    this.getHomeMultidata(),
    //请求 商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },

  activated(){
    //进入的时候
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.newRefresh() //解决一些小问题
  },
  deactivated(){
    console.log(this.saveY)
    this.saveY = this.$refs.scroll.scroll.y

    //取消事件监听
    this.$bus.$off('imageLoad',this.itemLearnner)
  },
  mounted(){
  },
  //为了让代码看起来更简洁
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    },
  },
  methods:{
    // 网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners= res.data.banner.list;
        this.recommends= res.data.recommend.list;
        // console.log(res);
      })
    },
    getHomeGoods(type){
        const page = this.goods[type].page +1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        // console.log(this.goods[type].list)
        this.goods[type].page+=1

        this.$refs.scroll.finishPullUp()//因为pullingUp只能执行一次，必须要finish掉
      })
    },
    //事件监听的方法
    tabClick(index){
      switch(index){
        case 0 :
          this.currentType = 'pop'
          break;
        case 1 :
          this.currentType = 'new'
          break;
        case 2 :
          this.currentType = 'sell'
          break
      }
      //为了保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //监听滚动
    contentScroll(position) {
      //决定backtop 是否显示
      this.isShowBackTop = (-position.y) > 1000
      //决定 tabcontrol 是否吸顶(positon:fixed)
      this.isTabFixed = (-position.y)>=this.tabOffsetTop
      // this.saveY = position.y //这里直接把坐标给 saveY 就行了
      
    },
    //加载更多
    loadMore(){
      console.log(this.currentType)
      this.getHomeGoods(this.currentType)

    },
    //轮播图加载事件的监听
    swiperImageLoad(){
      // console.log("轮播图加载完毕")
      //获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    }
  }
  }
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;

}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
