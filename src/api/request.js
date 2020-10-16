import Vue from 'vue';
import axios from 'axios';
import {
  Toast
} from 'vant';
// import store from '../store/ndex'
import myConfig from '../config/config';
import qs from 'qs';
// import {
//   router
// } from '../router/index';
// import common from '../common/common';

axios.interceptors.response.use((response) => {

  return response;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 4:
      case 401:
        // 用户未授权，跳转到登录界面
        // if (err.response.data.status === 4 || err.response.data.status === 401) {
        //   Vue.prototype.$common.remove('token');
        //   // let localOprPkId = common.query('oprPkId') ? common.query('oprPkId') : common.get('oprPkId');
        //   let localOprPkId = common.query('oprPkId') ? common.query('oprPkId') : Vue.prototype.$oprPkId;
        //   router.replace({
        //     name: 'wx',
        //     query: {
        //       oprPkId: localOprPkId
        //     }
        //   });
        // }
        // break;
    }
  } else {
    err.message = '连接服务器失败!';
  }
  return Promise.reject(err);
});

Vue.prototype.$axios = axios;

Vue.prototype.$postHeaders = function (data) {
  let token = Vue.prototype.$common.get('token');
  var headers = {
    'Authorization': 'Bearer ' + token,
  };
  if (data) {
    headers = Object.assign(headers, data);
  }
  return headers;
};

export const requestPost = function (url, params, showLoading, cancelToken) {
  return request(url, 'post', null, params, showLoading, cancelToken);
};
export const requestPostForm = function (url, params, showLoading, cancelToken) {
  return request(url, 'post', {
    'content-type': 'application/x-www-form-urlencoded'
  }, qs.stringify(params), showLoading, cancelToken);
};
export const requestGet = function (url, params, showLoading, cancelToken) {
  return request(url, 'get', null, params, showLoading, cancelToken);
};
export const requestDel = function (url, params, showLoading, cancelToken) {
  return request(url, 'DELETE', null, params, showLoading, cancelToken);
};
export const requestPostMultipart = function (url, params, showLoading, cancelToken) {
  return request(url, 'post', {
    "Content-Type": "multipart/form-data"
  }, params, showLoading, cancelToken);
};

function clearLoading(toast) {
  if (toast) {
    toast.clear();
  }
}

function request(url, method, header, data, showLoading, cancelToken) {
  let Vn = Vue.prototype;

  if (url.indexOf('http') === -1 && url.indexOf(myConfig.ajaxUrl) === -1) {
    url = myConfig.ajaxUrl + url;
  }
  let toast;
  if (showLoading) {
    toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
  }

  // 请求
  return new Promise((resolve, reject) => {
    let axiosConfig = {
      method: method,
      url: url,
      headers: Vn.$postHeaders(header),
      cancelToken: new axios.CancelToken(function executor(c) {
        if (cancelToken) {
          cancelToken.cancel = c;
        }
      })
    };
    if (method === 'get' || method === 'DELETE') {
      axiosConfig.params = data;
    } else {
      axiosConfig.data = data;
    }
    axios(axiosConfig).then((result) => {
      clearLoading(toast);
      resolve(result.data);
    }).catch((error) => {
      clearLoading(toast);
      reject(error);
    });
    
  });
}