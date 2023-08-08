<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="delIndex">
                <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 路由跳转:                        
声明式导航:router-link
编程式导航: pushlreplace
三级联动: 如果使用声明式导航router-link，可以实现路由的跳转与传递参数但是需要注意，出现卡顿现象。
router-link是一个组件，当服务器的数据返回之后，
循环出很多的router-link组件(创建组件实例的]1000+创建组件实例的时候，一瞬间创建1000+很耗内存，因此出现了卡顿现象。 -->
                            <div class="item" v-for="(c1, index) in categoryList.slice(0, 16)" :id="c1.categoryId"
                                @mouseenter="changeIndex(index)" :class="{ cur: index == cateIndex }">
                                <h3>
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <!-- 二三级分类 -->
                                <div class="item-list clearfix" :style="{ display: cateIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>

                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
//export default是默认暴露,引入就不需要加{}  如{throttle}
import throttle from 'lodash/throttle'
//import _ from 'lodash'  这种引入方法是把lodash的所有功能全部引入进来,应该按需引入,减少消耗
export default {
    name: 'TypeNavv',
    methods: {
        // changeIndex(index){
        //     this.cateIndex=index
        // },
        //节流
        changeIndex: throttle(function (index) {
            this.cateIndex = index
        }, 50),
        enterShow() {
            this.show = true
        },
        delIndex(e) {
            this.cateIndex = -1
            // e.target.classList.remove('cur')
            if (this.$route.path != '/home') {
                // this.cateIndex=-1    
                this.show = false
            }

        },
        //params和query的区别
//         1.首先就是写法得不同，query 得写法是 用 path 来编写传参地址，而 params 得写法是用 name 来编写传参地址，你可以看一下编写路由时候得相关属性，你也可以输出一下 路由对象信息 看一下

// 2.接收方法不同， 一个用 query 来接收， 一个用 params 接收 ，总结就是谁发得 谁去接收

// 3.query 在刷新页面得时候参数不会消失，而 params 刷新页面得时候会参数消失，可以考虑本地存储解决

// 4.query 传得参数都是显示在url 地址栏当中，而 params 传参不会显示在地址栏
            goSearch(e) {
            //时间委托+函数式传参+自定义属性
            let element = e.target
            let { categoryname, category1id, category2id, category3id } = element.dataset
            // console.log(categoryname);
            if (categoryname) {
                //要传递的参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                //有params参数也一起传递过去
                //空对象,转化为布尔值为true
                if (this.$route.params) {
                    location.params = this.$route.params
                    //参数整理
                    location.query = query
                    //路由跳转
                    console.log(location);
                    this.$router.push(location)
                }

            }
        }
    },
    data() {
        return {
            cateIndex: -1,
            show: true
        }
    },
    // this.srouter(路由实例):是VueRouter的实例.包含了很多属性和对象 (比如 history 对象)，任何页面都可以调用其 push(),replace(),go() 等方法。
    // this.route: 表示当前路由对象，每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name,path,meta, params,query 等属性.
    mounted() {
        //通过向Vuex发方法请求,获取数据,存储于仓库中
        // this.$store.dispatch('categoryList')
        if (this.$route.path !== '/home') {
            this.show = false
        }
    },
    //--------在组件中拿到vuex数据-----------
    //数组类型的
    // computed:{
    //     ...mapState(['count'])
    // },
    computed: {
        //对象形式,键值对
        //注入一个参数state,就是大仓库的数据(里边放了所以小仓库,下方home就是小仓库的了)
        ...mapState({
            categoryList: (state) => state.home.categoryList
        })
    }
}
</script>
<style lang="less" scoped>
.cur {
    background-color: rgb(241, 184, 39);
}

.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {

                //66666666666666666
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    //为了简便,less中,&表示{}外的父类名,这里表示  .item
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }

        //过渡动画
        .sort-enter {
            // height: 0;
            opacity: 0.3;
            // transform: rotate(0deg);
        }

        .sort-enter-to {
            // height:461px;
            opacity: 1;
            // transform: rotate(360deg);
        }

        .sort-enter-active {
            transition: all .5s linear
        }
    }
}</style>