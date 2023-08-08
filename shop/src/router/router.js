import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './index.js'
import store from '@/store/index.js'
Vue.use(VueRouter)
    //拷贝一份老版的push方法
let oldPush = VueRouter.prototype.push
let oldReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location, reslove, reject) {
    if (reslove && reject) {
        oldPush.call(this, location, reslove, reject)
    } else {
        oldPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, reslove, reject) {
    if (reslove && reject) {
        oldReplace.call(this, location, reslove, reject)
    } else {
        oldReplace.call(this, location, () => {}, () => {})
    }
}

let router = new VueRouter({
    routes: index,
    //路由跳转后滚动条所在位置，代表滚动条最上方
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

//token已经全局可用，存于header中，下方是解决用户信息刷新就消失的方案

//路由全局守卫：前置守卫（在路由跳转前判断）
//to去哪  from从哪  next放行
router.beforeEach(async(to, from, next) => {
    //引入了store，用户登录了才会有token
    let token = store.state.user.token
        //用户信息,空对象为真,所以用字符串
    let name = store.state.user.userInfo.name
        // console.log(token);
    if (token) {
        //已经登陆了就不能再去登录注册页面
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            //如果去的不是login页面可以
            if (name) {
                //如果有用户信息直接放行
                next()
            } else {
                try {
                    //没有信息获取信息后放行。
                    await store.dispatch('getUserInfo')
                        // console.log('没获取到信息');
                    next()
                } catch (error) {
                    //这种情况说明有token但是拿不到信息,说明token过期
                    // alert(error.message)
                    await store.dispatch('userLogout')
                    alert('登录信息已过期')
                    next('/login')
                }
            }

        }
    } else {
        //未登录有些页面就不允许跳转
        //已经有了用户信息
        let toPath = to.path
            //indexOf=-1时代表没有找到指定内容
        if (toPath.indexOf('/shopcart') != -1 || toPath.indexOf('/trade') != -1 || toPath.indexOf('/paysuccess') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // console.log('不能跳转');
            alert('请优先登录')
                //带一个query参数，传递没登录时点击想要进入的页面,登录之后直接跳转的那个页面(功能代码在login组件中)
            next('/login?a=' + toPath)
        } else {
            next()
        }


    }
    // console.log(store);
})

export default router