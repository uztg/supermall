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
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null,
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true, //这个是让span div的点击时间不被限制
                probeType:this.probeType,   //不写死 为了更好的性能
                pullUpLoad:this.pullUpLoad,
            });

            this.scroll.on('scroll', (position) => {
                // console.log(position);
                this.$emit('scroll', position)
            })

            if(this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                    // console.log("监听到滚动到底部")
                    this.$emit('pullingUp')
                })
            }
        })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh(){

        //   console.log('ceshi')
          this.srcoll && this.scroll.refresh()//这个监听事件放在 mouted中是为了避免 没有加载到 this.$refs.scroll的问题
      },
    finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
    }
    }
}
</script>
<style scoped>

</style>