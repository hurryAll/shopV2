<template>
<div>
  <!-- <h1 v-hu.ll="msg">111</h1> -->
  <Head></Head>
  <router-view></router-view>
  <!-- 我是根组件 -->
  <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
import Head from './components/header/index.vue'
import Footer from './components/footer/index.vue'
export default {
  name: 'App',
  data(){
    return{
      msg:'APP'
    }
  },
  components: {
    Head,
    Footer,
  },
  //所以组件中,APP.vue最先执行,三级联动每次获取数据、切换页面都需要重新发起请求,因此
  //不在TypeNav中向仓库请求数据,而是直接在App.vue中获取,在TypeNav中使用
  //至此，每次切换页面也只发起一次请求,减少功能的消耗
  mounted(){
    this.$store.dispatch('categoryList')
  }
  //但是这串代码不可以放到main.js中运行,main.js中没有this指向,而且只有组件(.vue)才有$store属性
}
</script>

<style lang="less">

</style>
