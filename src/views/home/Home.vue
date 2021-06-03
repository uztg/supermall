<template>
<div id="home">
<router-view />
<nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>
<home-swiper :banners="banners" />
<recommend-view :recommends="recommends"/>
<feature-view class="feature" />
<tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
<goods-list :goods="showGoods"/>
</div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/TabControl"
import GoodsList from 'components/content/goods/GoodsList'
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import {getHomeMultidata,getHomeGoods} from "network/home";
  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
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
        currentType:'pop'
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
  //为了让代码看起来更简洁
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
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

    //事件监听的方法
    tabClick(index){
      //console.log(index)
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
    }
  }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
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
</style>
