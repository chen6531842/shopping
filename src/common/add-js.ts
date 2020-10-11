/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-29 11:27:25
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-10-10 22:00:30
 */

import config from "../config/config";
// import {} from './common-interface'

export const addJS = (url: string, id: string): Promise<[]> => {
  return new Promise(resolve => {
    const scriptObj = document.getElementById(id);
    if (scriptObj != null) {
      resolve();
    } else {
      const scriptDom = document.createElement("script");
      scriptDom.id = id;
      scriptDom.type = "text/javascript";
      scriptDom.src = url;
      document.head.appendChild(scriptDom);
      scriptDom.onload = function() {
        resolve();
      };
    }
  });
};

export const addSwiperJS = () => {
  // 图表
  const url = "./common/swiper-4.3.5.min.js";
  return addJS(url, "swiperJS");
};
