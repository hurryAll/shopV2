<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{active:index==currentIndex}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
//使用轮播图教程,引包-引入样式-templete里有结构-引入srcipt的固定写法-完成
import Swiper from 'swiper'
export default {
  name: "ImageList",
  data(){
    return{
      currentIndex:0,
    }
  },
  props: ['skuImageList'],
  //监听skuImageList保证有数据
  watch: {
    skuImageList(newV, oldV) {
      //使用nextTick确保v-for循环完毕,结构完整
      this.$nextTick(() => {
        var mySwiper = new Swiper(this.$refs.cur, {
          loop: true, // 循环模式选项

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //设置显示几个图片
          slidesPerView:1,
          //一次切换几个
          slidesPerGroup:1,
        })
      })
    }
  },
  methods:{
    changeCurrentIndex(index){
      this.currentIndex=index
      //全局事件总线
      this.$bus.$emit('getIndex',this.currentIndex)
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>