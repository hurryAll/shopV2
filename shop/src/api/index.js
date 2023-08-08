//当项目大,有许多接口时,当需要改变接口,非常麻烦,因此统一管理API
import requests from './request'
import mockRequest from './mockAjax'
//让发起请求的路径自动配置,之后就不用再一个一个配了
//axios发请求,返回结果是promise对象
export const reqCategoryList = () => {
    // console.log(666);
    // console.log(requests);
    //发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}

//获取banner首页轮播图接口
//这里是直接法get，另一个是发送axios
export const reqGetBannerList = () => mockRequest.get('/banner')

//获取floor
export const reqGetFloorList = () => mockRequest.get('/floor')

//获取search搜索页面数据  /api/search
//这个search的api需要传递一个参数
export const reqGetSearchInfo = (params) => requests({
    // Request URL: http://localhost:8080/api/list
    url: '/list',
    method: "post",
    data: params
})

//获取产品详情,skId商品的Id
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" })

//将产品加入购物车中
export const reqAddorUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车商品
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改商品选中状态
export const reqUpdateCheckById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

//登录
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//获取用户信息【需要使用token】
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
    //退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
    //获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
    //获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
    //提交订单信息
    //tradeNo订单编号
    //data的key与value一致，所以可以省略
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
    //通过订单号,获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付订单状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
    //获取个人中心数据
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: "get" })