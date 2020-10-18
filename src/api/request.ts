import Vue from "vue";
import axios from "axios";
import { Toast } from "vant";
import store from "../store/index";
import myConfig from "../config/config";
import { objAny } from "../common/common-interface";
// import qs from 'qs';
// import {
//   router
// } from '../router/index';
// import common from '../common/common';

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
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
      err.message = "连接服务器失败!";
    }
    return Promise.reject(err);
  }
);

Vue.prototype.$axios = axios;

Vue.prototype.$postHeaders = function(data: objAny) {
  const state: any = store.state; // eslint-disable-line
  const userInfo = state.app.userInfo;
  let headers: objAny = {
    "Content-Type": "application/json"
  };
  if (userInfo) {
    headers["x-token"] = userInfo.token;
  }
  if (data) {
    headers = Object.assign(headers, data);
  }
  return headers;
};

export const requestPost = function(
  url: string,
  params: objAny,
  showLoading: boolean,
  cancelToken?: objAny
) {
  return request(url, "post", {}, params, showLoading, cancelToken);
};
// export const requestPostForm = function (url:string, params:objAny, showLoading:boolean, cancelToken?:objAny) {
//   return request(url, 'post', {
//     'content-type': 'application/x-www-form-urlencoded'
//   }, qs.stringify(params), showLoading, cancelToken);
// };
export const requestGet = function(
  url: string,
  params: objAny,
  showLoading: boolean,
  cancelToken?: objAny
) {
  return request(url, "get", {}, params, showLoading, cancelToken);
};
export const requestDel = function(
  url: string,
  params: objAny,
  showLoading: boolean,
  cancelToken?: objAny
) {
  return request(url, "DELETE", {}, params, showLoading, cancelToken);
};
export const requestPostMultipart = function(
  url: string,
  params: objAny,
  showLoading: boolean,
  cancelToken?: objAny
) {
  return request(
    url,
    "post",
    {
      "Content-Type": "multipart/form-data"
    },
    params,
    showLoading,
    cancelToken
  );
};

function clearLoading(toast: objAny) {
  if (toast) {
    toast.clear();
  }
}

function request(
  url: string,
  method: any,
  header: objAny,
  data: objAny,
  showLoading: boolean,
  cancelToken?: objAny
) {
  const Vn = Vue.prototype;

  // if (url.indexOf('http') === -1 && url.indexOf(myConfig.ajaxUrl) === -1) {
  //   url = myConfig.ajaxUrl + url;
  // }
  let toast: objAny;
  if (!showLoading) {
    toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: "加载中..."
    });
  }

  // 请求
  return new Promise<any>((resolve, reject) => {
    const axiosConfig: objAny = {
      method: method,
      url: url,
      headers: Vn.$postHeaders(header),
      cancelToken: new axios.CancelToken(function executor(c) {
        if (cancelToken) {
          cancelToken.cancel = c;
        }
      })
    };
    if (method === "get" || method === "DELETE") {
      axiosConfig["params"] = data;
    } else {
      axiosConfig["data"] = data;
    }
    axios(axiosConfig)
      .then(result => {
        clearLoading(toast);
        if (result.data.code == -1) {
          const win: objAny = window;
          const href = win.location.origin + "/#/my";
          const url = href.replace(/#/g, "__");
          win.location.href =
            myConfig.getCodeUrl + "?url=" + url + "&appId=" + myConfig.appId;
        }
        resolve(result.data);
      })
      .catch(error => {
        clearLoading(toast);
        reject(error);
      });
  });
}
