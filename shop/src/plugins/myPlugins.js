//手写插件

//Vue插件一定暴露一个对象
let myPlugins = {};

//Vue.use()就是调用install
myPlugins.install = function(Vue, option) {
        //使用方传递一个参数(option)  direvtice是指令,第一个参数写传递的option内的值,第二个参数是执行的函数
        //于是在组件中 就可以使用 v-hu绑定在标签上了,从而触发函数
        //element是标签,App.vue里h1里用了,所以是h1，  can是option和v-hu绑定的属性的值,can.value是v-hu绑定的值
        //如果这里用option.age也可以，但是组件里不可再用v-hu  用v-6（自己定义的值）
        Vue.directive(option.name, (element, can) => {
            element.innerHTML = can.value
                // console.log(can);
                // 给v-hu增加修饰符ll，则modifiers变为 modifiers:{ll:true}  这是v-model.lazy之类的实现原理
                // console.log(element);
                // console.log('在' + element + '执行了函数' + '传递的值是' + value);
                // console.log(value);

        })
    }
    //暴露对象
export default myPlugins