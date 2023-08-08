<template>
    <div>
        <!-- 三级联动的全局组件,三级联动已经注册为全局,因此不需要引入 -->
        <TypeNavv/>
        <!-- <button @click="add">数值+1</button>
        <span>仓库的数据:{{ count }}</span>
        <button>数值-1</button> -->
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>
<script>
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import { mapState } from 'vuex'
// import
    export default{
        name:'MyHome',
        components:{
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand,
        },
        mounted(){
            this.$store.dispatch('GetFloorList')
            //获取用户信息并在首页展示
            // this.$store.dispatch('getUserInfo')
        },
        //将仓库的值映射到计算属性中, 注意mapState和mapGetters是映射在计算属性里面的，而mapActions和mapMutations是映射在methods里面的
        //数组类型的
        computed:{
            ...mapState({
                floorList:(state)=>state.home.floorList
            })
            // ...mapState(['count'])
        },
        methods:{
/*             add(){
                派发action
                this.$store.dispatch('add')
            } */
        }
    }
</script>
<style lang="less" scoped></style>