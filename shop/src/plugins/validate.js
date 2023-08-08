import Vue from "vue";
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文 message
import validate from 'vee-validate'
Vue.use(validate);
//表单验证
validate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages, //表示中文提示信息
        is: (field) => `${field}必须与密码相同` //修改内置规则的message,让密码与确认密码相同
    },
    attributes: {
        //错误提示的前缀  某某格式无效
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议',
    }
});

//自定义校验规则
//定义协议必须打勾同意

//agree是自定义校验的名字，随机
validate.Validator.extend('agree1', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})