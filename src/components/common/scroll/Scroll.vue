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
    props:{
        probeType:{
            type:Number,
            default(){
                return 0
            }
        }
    },
    data(){
        return{
            scroll:null,
        }
    },
    updated(){
        this.scroll = new BScroll(this.$refs.wrappar,{
            // probeType:3,   不写死 为了更好的性能
            pullUpLoad:true,
            click:true //这个是让span div的点击时间不被限制
        });
        this.scroll.on('scroll',(position)=>{
            this.$emit("scroll",position)
        });
        // this.scroll.on('pullingUp',()=>{
        //     console.log("上拉加载更多")
        // })
    }
}
</script>
<style scoped>

</style>