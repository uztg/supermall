<template>
    <div> 
        <nav-bar>
            <div slot="left" class="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div 
                v-for="(item,index) in titles" 
                :key="index" 
                class="title-item" 
                @click="titleItemClick(index)"
                :class="{active:currentIndex==index}">{{item}}</div>
            </div>   
        </nav-bar>
    </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品',"参数","评论","推荐"],
            currentIndex:0,
        }
    },
    methods:{
        titleItemClick(index){
            this.currentIndex = index
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>
<style scoped>
.title{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex: 1;
}
.active{
    color: var(--color-tint);
}
.left img{
    margin-top: 10px;
}
</style>