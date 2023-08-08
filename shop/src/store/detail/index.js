import { reqGoodsInfo, reqAddorUpdateShopCart } from "@/api"
import { getUUID } from "@/utils"
const state = {
    goodInfo: {},
    //临时游客身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODSINFO(state, g) {
        state.goodInfo = g
    }
}
const actions = {
    //获取商品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data)
        }
    },
    //将产品加入购物车
    async getAddorUpdate({ commit }, { skuId, skuNum }) {
        let result = await reqAddorUpdateShopCart(skuId, skuNum)
            // if (result.code == 200) {
            //     console.log(result);
            // }
    }

}
const getters = {
    categoryView(state) {
        //categoryView起始值是空数组,有值取值，没值取空对象,空对象的布尔值是false
        //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        //当前计算出的 categoryview属性值至少是一个空对象，假的报错不会有了。
        return state.goodInfo.categoryView || {}
    },
    //简化产品数据的信息
    skuInfo(s) {
        return s.goodInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(s) {
        return s.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}