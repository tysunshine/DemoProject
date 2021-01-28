import axios from "axios";
import qs from 'qs';
import {Message} from 'element-ui';
import {logout, storage} from '@/utils/tools.js';

// axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.timeout = 60000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

/*
 *请求前拦截
 *用于处理需要请求前的操作
 */
axios.interceptors.request.use(
    config => {
        var token = storage.get('token');
        if (token) {
            config.headers["token"] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
/*
 *请求响应拦截
 *用于处理数据返回后的操作
 */
axios.interceptors.response.use(
    response => {
        return new Promise((resolve, reject) => {
            const res = response.data;
            if (res.result == 200) {
                resolve(res);
            // token过期
            } else if (res.result == 401) {
                Message.error('用户登陆过期，请重新登陆');
                reject(res);
                logout();
            } else{
                Message.error(res.message);
                reject(res);
            }
        })
    },
    error => {
        //断网处理或者请求超时
        if (!error.response) {
            //请求超时
            if (error.message.includes("timeout")) {
                Message.error('请求超时，请检查互联网连接');
            } else {
                //断网，可以展示断网组件
                Message.error('请检查网络是否已连接');
            }
            return;
        }
        const status = error.response.status;
        Message.error(error.response.data.message);
        return Promise.reject(error);
    }
);
/*
 *get方法，对应get请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'get',
            params: params,
            withCredentials:true,   //允许跨域携带cookit
        }).then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        });
    });
}

/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
function postFn(url, form, params) {
    return new Promise((resolve, reject) => {
        var option = {
            url,
            method: 'post',
            data: params,
            withCredentials:true,   //允许跨域携带cookit
        }
        // form表单提交
        if (form) {
            option.headers = {
                'content-type': 'application/x-www-form-urlencoded'
            }
            option.data = qs.stringify(params);
        }

        axios(option).then(res => {
            resolve(res);
        })
        .catch(err => {
            if (err.msg) {
                Message.error(err.msg);
            }
            reject(err);
        });
    });
}
export function post (url, params) {
    return postFn(url, false, params);
}
export function postForm (url, params) {
    return postFn(url, true, params)
}


