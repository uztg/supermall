<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <!-- 让home不随意销毁 -->
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default ({
    name:'App',
    components:{
      MainTabBar,
    }
  })
</script>

<style>
  @import "assets/css/base.css";
</style>
