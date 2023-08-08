//home模块的小仓库
//看需要获取数据的dom在哪个页面,如果在home页面,就在home里三连环
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"
const state = {
    //state默认初始值,(根据接口返回的数据来初始化,判断用数组还是对象等等)
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const mutations = {
    CATEGORYLIST(state, c) {
        state.categoryList = c
    },
    GETBANNERLIST(state, b) {
        state.bannerList = b
    },
    GETFLOORLIST(state, f) {
        state.floorList = f
    }
}
const actions = {
    //通过API里面的接口函数调用,向服务器发请求,获取服务器的数据
    async categoryList({ commit }) {
        // console.dir(commit)解构commit提交功能
        //reqCategoryList就是封装的API
        // let result = reqCategoryList()这样的话直接是一个promise对象,用语法糖async和await直接得到数据
        let result = await reqCategoryList()
            // console.log(result);
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 读取轮播图的mock数据
    async GetBannerList({ commit }) {
        let result = await reqGetBannerList()
            // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },

    async GetFloorList({ commit }) {
        let result = await reqGetFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
                // console.log(result);
        }

    }

    // 不用语法糖
    // categoryList() {
    //     let result = reqCategoryList()
    //     result.then(res => {
    //         console.log(res);
    //     }, err => {
    //         console.log(err);
    //     })
    // }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}