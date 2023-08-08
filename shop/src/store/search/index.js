import { reqGetSearchInfo } from "@/api"
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, s) {
        state.searchList = s
    }
}
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //当用户派发action时,传递一个参数,当不传递时默认设定为传一个空对象
        let result = await reqGetSearchInfo(params)
        console.log(result.data);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    //简化仓库中的数据
    //参数a就是本小仓库state，名字任意写
    goodsList(a) {
        //当获取了数组时返回所需要的,当用户网不好的时候a.searchList.goodsList就会返回undefind，所以此时直接给用户一个空数组
        return a.searchList.goodsList || []
    },
    trademarkList(state) { return state.searchList.trademarkList; },

    attrsList(state) { return state.searchList.attrsList; }
}
export default {
    state,
    mutations,
    actions,
    getters
}