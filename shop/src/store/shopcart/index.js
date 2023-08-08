import { reqCartList, reqDeleteCartById, reqUpdateCheckById } from "@/api"
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, m) {
        state.cartList = m
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车商品
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
            //不用三连环,删除之后直接给空值,要么成功要么失败
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车选中状态
    async updateCheckedByid({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除所有选中的购物车商品
    //context上下文 小仓库
    //可以引用state,context,commit
    deleteAllCheckedCart({ dispatch, getters }) {
        // alert(context)
        // console.log(getters.cartList.cartInfoList);
        //forEach用于数组
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
                //判断是否被选择
                //返回的是promise对象
                let promise = item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
                    // 将每一次执行后返回的promise对象加到promiseAll里
                promiseAll.push(promise)
            })
            //Promise.all中必须全都是promise对象，如果有一个promise失败,则全部失败,返回false
        return Promise.all(promiseAll)
    },
    //修改所有选中状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        // console.log(state);
        // console.log(isChecked);
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
                let promise = dispatch('updateCheckedByid', { skuId: item.skuId, isChecked })
                promiseAll.push(promise)
            })
            //返回最终结果
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}