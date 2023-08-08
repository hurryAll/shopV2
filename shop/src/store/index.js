import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
    //引入小仓库
import home from './home/index'
import search from './search/index'
import detail from './detail/index'
import shopcart from './shopcart/index'
import user from './user/index'
import trade from './trade/index'
export default new Vuex.Store({
        //实现Vuex仓库模块开发数据存储
        modules: {
            home,
            search,
            detail,
            shopcart,
            user,
            trade,
        }
    })
    //都是对象
    //state:仓库存储数据的地方
    // const state = {
    //         count: 1
    //     }
    //     //mutations:修改state的唯一手段
    // const mutations = {
    //         ADD(state) {
    //             state.count++
    //         }
    //     }
    //     //actions:处理action,书写业务逻辑,也可以异步处理
    // const actions = {
    //         //可以书写业务逻辑,但是不能修改state里的值
    //         add({ commit }) {
    //             commit("ADD")
    //         }
    //     }
    //     //getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
    // const getters = {}

// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters,
// })