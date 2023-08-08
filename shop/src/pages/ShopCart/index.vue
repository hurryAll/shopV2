<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- event默认是第一个参数,如果不是第一个要加$符号 -->
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="updateCheck(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('des',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handler('auto',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum*cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length>0" @click="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"  @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    computed:{
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList||[]
      },
      //计算勾选产品的总价格
      totalPrice(){
        let sum=0
        this.cartInfoList.forEach(item=>{
          if(item.isChecked==1){
            sum+=item.skuNum*item.skuPrice
          }
        })
        return sum
      },
      //判断底部全选复选框有没有勾选
      isAllCheck(){
        //遍历每一项的isChecked的值都=1则返回true  否则返回false
        return this.cartInfoList.every(item=>item.isChecked==1)
      },
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        this.$store.dispatch('getCartList')
      },
//因为是一步操作,每次更改商品数量需要重新发请求,如果过快点击可能不会触发关于disNum的保护机制
//因此需要加  【节流】 让点击的时间有间隔，保证请求发送完成再点击
//【防抖】是改变数据时,以最后一个改变的值为准
      handler:throttle(async function (type,disNum,cart) {
        switch(type){
          case 'des':
            disNum=cart.skuNum>1?-1:0
            break;
          case 'add':
            disNum=1
            break;
          case 'auto':
              //变化的量=用户输入的量-当前购物车的量
              //parseInt是解决用户输入小数
              disNum=(isNaN(disNum)||disNum<1)?0:parseInt(disNum)-cart.skuNum
              break; 
        }
        //派发action
         try {
          await this.$store.dispatch('getAddorUpdate',{
            skuId:cart.skuId,
            skuNum:disNum
          })
          //再一次获取服务器最新的数据并展示
          this.getData()
        } catch (error) {
          alert(error.message)
        }
        }, 1000),


      async deleteById(cart){
        try {
          await this.$store.dispatch('deleteCartList',cart.skuId)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      async updateCheck(cart,e){
        try {
          //如果修改成功
          //e.target.checked返回的是布尔值
          let isChecked=e.target.checked?'1':'0'
          //键值一样省略写
         
          await this.$store.dispatch('updateCheckedByid',{skuId:cart.skuId,isChecked})
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      async deleteAllCheckedCart(){
        //await等待store执行的deleteAllCheckedCart返回的结果
        //返回成功用await接着
        try {
          await this.$store.dispatch('deleteAllCheckedCart')
          //再发送购物车请求的数据
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      //修改所以产品的选中状态(全选)
      async updateAllCartChecked(e){
        let isChecked=e.target.checked?'1':'0'
        try {
           //派发action
          await this.$store.dispatch("updateAllCartChecked",isChecked)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>