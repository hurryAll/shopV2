<template>
  <div>
    <TypeNavv />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑,带有x结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 三级联动的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 搜索框关键字的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTradeMark">×</i></li>
            <!-- 售卖属性的面包屑(因为属性有多个,所以直接v-for遍历数组) -->
            <li class="with-x" v-for="(findAttrValue,index) in searchParams.props" :key="index">{{findAttrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeInfo="tradeFather" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合&nbsp&nbsp<span v-show="isOne" class="iconfont" :class="{ 'icon-xiangxiajiantou':isDesc,'icon-xiangshangjiantou':isAsc}"></span> </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <!-- 三元运算符 -->
                  <a>价格&nbsp&nbsp<span v-show="isTwo" class="iconfont" :class="{ 'icon-xiangxiajiantou':isDesc,'icon-xiangshangjiantou':isAsc}"></span> </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 声明式导航,一定to属性,当传递的参数是动态的,记得给to前加: -->
                    <!-- 动态params参数 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <!-- 结束 -->
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      //带给服务器的参数
      searchParams: {
        //1级分类的id
          category1Id:"",
        //2级
          category2Id:"",
          category3Id:"",
        //分类
          categoryName:"",
        // 关键字
          keyword:"",
        //排序
          order: "1:desc",
        //分页器,代表当前第几页
          pageNo: 1,
        //代表的是每一个展示数据个数
          pageSize: 3,
        //平台售卖属性操作带的参数
          props:[],
        //品牌
          trademark:"",
    }
/*    order
    今天课程中小重点:排序操作1: 综合,2: 价格    
    asc: 升序
    desc: 降序
    示例:"1:desc
          1.1问题
          order属性的属性值最多有多少种写法:
          1:asc
          1:desc
          2:asc
          2:desc 
 */
    }
  },
  components: {
    SearchSelector
  },
  // beforeCreate:{
  //   //这里不能操作,因为连this.searchParams都获取不到
  // },
  // created:{},
  //组件挂载之前执行一次
  beforeMount(){
    //搜索中TypeNav三级联动传递了query参数,componemts中header传递了params
    // console.log(this.$route.query);
    //ES6语法,把数据替换,将searchParams里的内容换成query和params
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
    // console.log(this.searchParams);
  },
  //组件挂载完毕执行一次【仅仅执行一次】
  mounted() {
    this.getData()
  },
  methods: {
    //把请求封装为一个函数,需要的时候调用
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除三级联动信息
    removeCategoryName(){
      //当是undefined，对象中的属性就不会带给服务器了，节省服务器
      this.searchParams.categoryName=undefined
      this.searchParams.category1Id=undefined
      this.searchParams.category2Id=undefined
      this.searchParams.category3Id=undefined
      //删除之后会再发起一次请求，不过之前搜索的全部置空
      // this.getData()
      //-------------------------------------------------
      //地址上的query参数还在，需要处理掉(但是搜索框的params内容不必删除,继续保留)
      this.$router.push({name:'search',params:this.$route.params})
    },
    //删除搜索框关键字
    removeKeyword(){
      this.searchParams.keyword=undefined
      // this.getData()
      //删除搜索框数据,找三级联动里的数据保证路由正确
      //push之后会改变route路由,从而触发watch！！！！所以getdata没有必要在这写
      this.$router.push({name:'search',query:this.$route.query})
      //通过兄弟组件Header清除关键字
      this.$bus.$emit("clear")
    },
    removeAttr(index){
      // 删除-用于删除元素，两个参数，第一个参数（要删除第一项的位置），第二个参数（要删除的项数） 
      this.searchParams.props.splice(index,1)
      this.getData()
    },
    tradeFather(info){
      //这个trademark必须不能改名
      this.searchParams.trademark=`${info.tmId}:${info.tmName}`
      // console.log(this.searchParams.info);
      // console.log(info);
      //再次发请求获取search模块列表数据进行展示
      this.getData()
    },
    removeTradeMark(){
      // console.log(typeof(this.searchParams.trademark));
      this.searchParams.trademark=undefined
      //this.$router.push({name:'search',query:this.$route.query,params:this.$route.params})
      this.getData()
    },
    attrInfo(attr,attrValue){
      let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
      //-1代表没有  数组去重
      if(this.searchParams.props.indexOf(props)==-1){
        this.searchParams.props.push(props)
      }
      this.getData()
    },
    //NBNBNBNB
    changeOrder(index){
      //形参，代表点进来的是综合还是价格
      let origin=index
      //键(1或2)
      let originKey=this.searchParams.order.split(':')[0]
      //值(desc或asc)
      let originValue=this.searchParams.order.split(':')[1]
      //准备一个新的order属性值
      let newOrder=''
      //默认综合,此语句可以判定一定是综合
      if(originKey==index){
        newOrder=`${originKey}:${originValue=='desc'?'asc':'desc'}`
        // console.log('综合');
      }else{
        //else就是点击的价格
        //把默认的综合order换成2:desc(默认降序)
        newOrder=`${index}:desc`
        // 或者:${'desc'}
        // console.log(newOrder);
      }
      this.searchParams.order=newOrder
      this.getData()
    },
    //自定义事件--获取当前分页器所在页数
    getPageNo(pageNo){
      //父传子给子当前页属性,子点击分页器达成子传父,传递 当前页-1 给父组件,父组件修改内部的当前页，再次传给子
      // console.log(pageNo);
      this.searchParams.pageNo=pageNo
      this.getData()
    },
  },
  computed: {
    ...mapGetters(['goodsList']),
    // ...mapState({
    //   goodsList:(state)=>state.search.searchList.goodsList
    // })
    isOne(){
      return this.searchParams.order.indexOf('1')!=-1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1
    },
    //升序
    isAsc(){
      return this.searchParams.order.indexOf('asc')!=-1
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1
    },
    //获取search模块展示产品一共多少条数据
    ...mapState(
      {
        total:state=>state.search.searchList.total
      }
    )
  },
  //解决搜索只能触发一次的漏洞
  watch:{
    $route(newValue,oldValue){
      //每次请求完毕后,把相应的1,2,3级分类的id置空，以便于下一次的搜索
      //否则如果第一次点的是第一级导航,第二次点的是第二级导航,那么会传递两个数进去
      //必须先清再整理
      this.searchParams.category1Id=undefined
      this.searchParams.category2Id=undefined
      this.searchParams.category3Id=undefined
      //再次整理请求的参数
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      this.getData()
      // console.log(123);
      // console.log(this.searchParams);
    },
    total(newV,oldV){
      //监听总页数,如果total改变(说明标签一定跳转) 就把当前页重新换成1,并且获取数据(不过玩意total是一样的就G)
      this.searchParams.pageNo=1
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>