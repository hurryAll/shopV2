import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串
export const getUUID = () => {
    //先检查是否已经存在身份
    let uuid_token = localStorage.getItem('UUIDTOKEN')
        //如果不存在
    if (!uuid_token) {
        //生成临时游客身份并本地存储
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}