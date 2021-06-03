<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" @click="isActive(index)" :class="{active:currentIndex===index}">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TabControl',
    data(){
        return{
            currentIndex:0
        }
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        isActive(index){
            this.currentIndex = index;
            this.$emit('tabClick',index);
        }
    }
}
</script>
<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
}
.tab-control div{
    flex: 1;
    width: 50px;

}
.tab-control div span{
    padding:5px;
}
.active{
    color: var(--color-high-text);
}
.active span{
    border-bottom: 2px solid var(--color-high-text);
}
</style>
