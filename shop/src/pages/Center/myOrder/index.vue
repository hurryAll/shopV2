<template>
    <div class="order-right">
        <div class="order-content">
            <div class="title">
                <h3>我的订单</h3>
            </div>
            <div class="chosetype">
                <table>
                    <thead>
                        <tr>
                            <th width="29%">商品</th>
                            <th width="31%">订单详情</th>
                            <th width="13%">收货人</th>
                            <th>金额</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="orders">

                <table class="order-item" v-for="(order,index) in myorder.records" :key="order.id">
                    <thead>
                        <tr>
                            <th colspan="5">
                                <span class="ordertitle">{{ order.createTime }}　订单编号：{{ order.outTradeNo }} 
                                <span class="pull-right delete"><img src="../images/delete.png"></span></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cart,index) in order.orderDetailList" :key="cart.id">
                            <td width="60%">
                                <div class="typographic">
                                    <img :src="cart.imgUrl" style="width: 100px;height: 100px;">
                                    <a href="#" class="block-text">{{ cart.skuName }}</a>
                                    <span>x{{ cart.skuNum }}</span>
                                    <a href="#" class="service">售后申请</a>
                                </div>
                            </td>
                            <!-- 行合并,每次提交订单的时候,收件人只能填一个,每个订单是一个order,每种商品是orderDetailList的一个对象 所以每个订单只需要出现一次收件人就可以了，上下行合并实行,只要每个订单的第一个商品信息 -->
                            <td :rowspan="order.orderDetailList.length" v-if="index==0" width="8%" class="center">{{ order.consignee }}</td>
                            <td :rowspan="order.orderDetailList.length" v-if="index==0" width="13%" class="center">
                                <ul class="unstyled">
                                    <li>总金额¥{{ order.totalAmount }}.00</li>
                                    <li>在线支付</li>

                                </ul>
                            </td>
                            <td :rowspan="order.orderDetailList.length" v-if="index==0" width="8%" class="center">
                                <a href="#" class="btn">{{order.orderStatusName}} </a>
                            </td>
                            <td :rowspan="order.orderDetailList.length" v-if="index==0" width="13%" class="center">
                                <ul class="unstyled">
                                    <li>
                                        <a href="mycomment.html" target="_blank">评价|晒单</a>
                                    </li>

                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="choose-order">
                <Pagination :pageNo="page" :pageSize="limit" :total="myorder.total" :continues="5" @getPageNo="getPageNo"></Pagination>
            </div>
            
        </div>
        <!--猜你喜欢-->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike02.png" />
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike03.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike04.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
    name:'',
    data(){
        return{
            //当前第几页
            page:1,
            //每页展示的个数
            limit:3,
            //存储订单数据
            myorder:{},
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            //结构参数
            const {page,limit}=this
            //获取订单
            const result=await this.$API.reqMyOrderList(page,limit)
            if(result.code==200){
                this.myorder=result.data
            }
        },
        //之所以能获取page，是已经封装好的组件有自定义事件,每次点击可以将page当前页传给父组件,父组件通过getPageNo接收
        getPageNo(page){
            console.log(page);
            this.page=page;
            this.getData()
        }
    },
}
</script>
<style lang="less" scoped></style>