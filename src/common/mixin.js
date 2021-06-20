import { debounce }  from './utils'
import BackTop from 'components/content/backTop/BackTop'
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
export const BackTopMixin = {
    data(){
        return {
            isShowBackTop:false
        }
    },
    components:{
        BackTop
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
            /*用this.$refs.scroll获取组件，然后获取组件中srcoll属性，再调用它的srcollTo方法，看起来很复杂
              说清楚就OK了
            */
          },
    }
}