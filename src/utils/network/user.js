/*
 * @Description: 关于用户相关的请求方法
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-08 13:31:07
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-16 09:50:19
 */
import axios from '../request'

// 登录
export function userLogin(data) {
    return axios({
        url: '/users/login',
        method: 'post',
        data
    })
}

// 注册
export function userRegister(data) {
    return axios({
        url: '/users/register',
        method: 'post',
        data
    })
}

// 机器人聊天
export function robotChat(data) {
    return axios({
        url: '/robot',
        method: 'get',
        params:data
    })
}
