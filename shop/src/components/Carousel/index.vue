<template>
    <div class="swiper-container" id="floor1Swiper" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    name: 'Carousel',
    props:['list'],
    watch:{//为了封装轮播图,要保证使用轮播图的地方代码一样,封装后才能保障完美复用
            list:{
                //list是父子传参,不会有数据改变,因此直接immediate监听
                immediate:true,
                handler(){
                    // console.log('在监听immediate');
                    this.$nextTick(()=>{
                        var mySwiper = new Swiper(this.$refs.cur, {
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            //点击小球的时候也切换图片
                            clickable: true
                        },
                        //如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }
                    })
                    })
                }
            }
        },
        
}
</script>
<style scoped></style>
<!-- //watch监听数据的变化,现在保证数据已经存在(bannerList已经被更改),之后要保证dom渲染完毕才能使用swiper
//当v-for运行完毕才有结果
watch: {
    
    bannerList: {
        //不能再mounted里写new Swiper，因为使用swiper的前置条件就是dom渲染完毕,但是渲染需要数据,数据需要axios异步获取,因此
        //因此mounted是组件挂载完毕的时候,但是此时dom结果并未渲染完毕,甚至数据也没有
        //沿着这个思路,在updated里使用new Swiper，数据渲染完毕,但是结构仍然没有加载完毕,笨方法：使用定时器
        //最佳解决方案:nextTick+watch解决办法
        immediate:true,
        //对象的写法
        handler(newV, oldV) {
            //现在咱们通过watch监听bannerList届性的属性值的变化
            //如果执行handler方法，代表组件实例身上这个属性的属性以已经有了[数组: 四个元素]
            //当前这个函数执行: 只能保证bannerList数据已经有了，但是你没办法保证v-for已经执行结束了
            //v-for执行完毕，才有结构[你现在在watch当中没办法保证的]l/netxTick:在下次DOM更新 循结束之后 执行延迟回调。在，修改数据之后，立即使用这个方法，获取更新后的 DOM。
            //所以nextTick少用吧
            //这么理解:数据驱动页面，数据变动了，页面重新渲染，重点是这个nextick下次DOM更新 执行回调，那么多数据在变动，页面也在不停得更新，所以在需要得位置去调用nexttick
            this.$nextTick(() => {
                //var mySwiper = new Swiper(document.querySelector(".swiper-container"), {
                //ref获取真实dom
                    var mySwiper = new Swiper(this.$refs.mySwiper, {
                    loop: true,
                    // 如果需要分页器
                    pagination: {
                        el: ".swiper-pagination",
                        //点击小球的时候也切换图片
                        clickable: true
                    },
                    //如果需要前进后退按钮
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }
                }
                )



            })
        }
    }
} -->