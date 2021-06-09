<template>
<div id="home">
<router-view />
<nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll">
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends"/>
    <feature-view class="feature" />
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
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
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      Scroll,
      BackTop,
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
        isShowBackTop:false
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
  mounted(){
        //监听item中的图片加载完成
      // const refresh = this.debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImageLoad',()=>{
         this.$refs.scroll && this.$refs.scroll.scroll.refresh()
    })
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
      })
    },
    //  防抖函数
    debounce(func,delay){
      let timer = null;
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
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
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
      /*用this.$refs.scroll获取组件，然后获取组件中srcoll属性，再调用它的srcollTo方法，看起来很复杂
        说清楚就OK了
      */
    },
    //监听滚动
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:rgb(2, 1, 1);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
}
.tab-control{
  position: sticky;
  top:44px;
  background: #fff;
  z-index: 9;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
