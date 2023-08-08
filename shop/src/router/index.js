// import home from '../pages/Home/index.vue'
// import search from '../pages/Search/index.vue'
// import register from '../pages/Register/index.vue'
// import login from '../pages/Login/index.vue'
// import Detail from '../pages/Detail'
// import addCar from '../pages/AddCartSuccess'
// import shopCart from '../pages/ShopCart'
// import trade from '../pages/Trade'
// import pay from '../pages/Pay'
// import paySuccess from '../pages/PaySuccess'
// import center from '../pages/Center'
//center下的二级路由
// import MyOrder from '../pages/Center/myOrder'
// import GroupOrder from '../pages/Center/groupOrder'
//路由懒加载,用户只有调用某个路由时才会加载对应的组件(用什么加载什么,节省功耗)
const lazyRouter = () => { console.log(111); return import ('@/pages/Home/index.vue') }
export default [{
        path: '/center',
        //以下皆为路由懒加载
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        //二级路由
        children: [{
                path: 'myorder',
                component: () =>
                    import ('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () =>
                    import ('@/pages/Center/groupOrder')
            },
            {
                path: '/center',
                //默认的页面重定向
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        //结算页面
        path: '/trade',
        name: 'trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫(只负责自己的路由)
        //进入之前
        beforeEnter: (to, from, next) => {
            //from是从哪来的那个路由的信息
            //只有从购物页面才能跳转到支付页面
            if (from.path == '/shopcart') {
                next()
            } else {
                //中断跳转
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        name: 'shopCart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true }
    },
    //参数一定记得占位！！影响路由params参数的名称
    {
        path: '/detail/:skuId',
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true }
    },
    { path: '/', redirect: '/home' },
    { path: "/home", component: lazyRouter, meta: { show: true } },
    {
        path: '/search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
        meta: { show: true },
        name: 'search',
        //路由传值传props的三种方法
        //布尔型传参
        // props: true
        //对象写法
        //  props: { a: 1, b: 2 },
        //函数式传参
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: '/addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true },
        name: 'addcartsuccess'
    }
]