//api一般写axios内容,对其进行二次封装
import axios from 'axios'
import nProgress from 'nprogress'
//得先引入进度条样式才有进度条
import 'nprogress/nprogress.css'
import store from '@/store'
// console.log(nProgress);
//创建一个axios实例
const requests = axios.create({
        //发起请求时,路径会出现/api  (不用自己再写了)
        baseURL: '/api',
        //请求超时的时间为5秒
        timeout: 5000,
    })
    //请求拦截器,在请求发起之前做一些事
requests.interceptors.request.use((config) => {
    // console.log('-----------');
    // console.log(config);
    //config是配置对象,对象中的header属性请求头很重要
    //进度条开始动
    // console.log(store);
    if (store.state.detail.uuid_token) {
        //和后端商议一个请求头字段 uuid
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //把token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nProgress.start()
    return config
})

//响应成功与失败参数
requests.interceptors.response.use((res) => {
        //成功的回调函数：服务器响应数据传回以后,响应拦截器可以检测到,可以做一些事
        //进度条结束
        nProgress.done()
        return res.data
    }, (err) => {
        console.log(err.message);
        return Promise.reject(new Error('faile'))
    })
    //暴露的不是axios本身,而是自己创建的axios实例
export default requests