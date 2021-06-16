import { debounce }  from './utils'
export const imageLearnnerMixIn={
    data(){
        return{
            itemLearnner:null,
            newRefresh:null
        }
    },
    mounted(){
        this.newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemLearnner = ()=>{
            this.newRefresh()
        }
        this.$bus.$on('imageLoad',this.itemLearnner)
        console.log("我是混入的内容")
    }
}