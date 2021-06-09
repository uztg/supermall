<template>
    <div class="wrapper" ref="wrapper">
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
      probeType: {
        type: Number,
        default: 0
      }
    },
    data(){
        return{
            scroll:null,
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true, //这个是让span div的点击时间不被限制
            probeType:this.probeType,   //不写死 为了更好的性能
            // pullUpLoad:true,
        });
        this.scroll.on('scroll', (position) => {
            // console.log(position);
            this.$emit('scroll', position)
        })
        // this.scroll.on('pullingUp',()=>{
        //     console.log("上拉加载更多")
        // })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
    //   refresh(){
    //       this.srcoll && this.scroll.refresh()//这个监听事件放在 mouted中是为了避免 没有加载到 this.$refs.scroll的问题
    //   }
    }
}
</script>
<style scoped>

</style>