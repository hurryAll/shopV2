import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import TypeNav from '@/components/TypeNav/index.vue'
import Carousel from '@/components/Carousel/index.vue'
import { reqGetSearchInfo } from './api/index'
//api的两个js是分别暴露的,要用{}才行,而且必须是reqCategroList
import { reqCategoryList } from './api/index'
import store from '@/store/index'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import pagination from '@/components/Pagination/index.vue'
//按需引入element-ui
import { Button, MessageBox } from 'element-ui'
import VueLazyload from 'vue-lazyload'
import myPlugins from './plugins/myPlugins'
//这里已经在validate.js中用过Vue.use了，所以不需要再写
import validate from './plugins/validate'
// import atm from '...'
let load = require('@/assets/2.jpg')
    //使用插件
Vue.use(VueLazyload, {
    //默认懒加载图片
    loading: load
})
Vue.use(myPlugins, {
        name: 'hu',
        age: '6'
    })
    // import 'swiper/swiper-bundle.min.css'
    // reqCategoryList()
    // console.log(reqGetSearchInfo({}));
    //注册全局可用的组件 第一个参数是组件名,第二个是哪一个组件  引入时使用TypeNav.name的值引入
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(pagination.name, pagination)
    //Element-ui注册还可以直接挂载在原型上,但是记得先引入
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name, Button)
    // Vue.config.productionTip = false

//统一引入 接口API，将api的全部函数全局可用
import * as API from '@/api'
// console.log(API);
new Vue({
    render: h => h(App),

    beforeCreate() {
        //全局事件总线 $bus 的配置
        //这个this指向VM
        Vue.prototype.$bus = this;
        //全局注册
        Vue.prototype.$API = API;
    },
    router,
    //注册仓库,注册之后,所有组件的身上会多出一个$store属性
    store,
}).$mount('#app')