<template>
    <div class="wrappar" ref="wrappar">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
        return{
            scroll:null
        }
    },
    updated(){
        this.scroll = new BScroll(this.$refs.wrappar,{
            probeType:3,
            pullUpLoad:true
        });
        // this.scroll.on('scroll',(positon)=>{
        //     //  console.log(positon)
        // });
        // this.scroll.on('pullingUp',()=>{
        //     console.log("上拉加载更多")
        // })
    }
}
</script>
<style scoped>

</style>