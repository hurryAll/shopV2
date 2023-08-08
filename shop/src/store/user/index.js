import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"
// import {set } from "nprogress"
//登录注册模块
const state = {
    code: '',
    token: getToken(),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    //token是令牌  uuid用户唯一标识符   将来一般通过token找服务器要用户信息
    //vuex存储的数据不是持久化的,一刷新就没了,所以令牌一般存储到本地里
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, info) {
        state.userInfo = info
    },
    //清除本地数据
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        //还要把localStorage的清空
        removeToken();
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //把验证码返回，（正常情况是把 验证码发到用户手机里
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
                //将pending改为正确
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务[token]
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        console.log(result.code);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
                //持久化存储token，因为一刷新登录后的主页就获取不到toekn了
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            console.log('--------------');
            //提交用户信息
            commit('GETUSERINFO', result.data)
                // return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
        //这里不return是因为一开始用户进入时，是未登录的状态,没有触发userLogin()所以还没有token，会报错
        //  else {
        //     return Promise.reject(new Promise('faile'))
        // }
    },
    //退出登录
    async userLogout({ commit }) {
        //向服务器发起请求,清除token
        let result = await reqLogout();
        if (result.code == 200) {
            //提交到mutation去修改state(把登录后得到的用户数据都清空)
            commit('CLEAR')
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}