/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-27 14:00:36
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-11-11 19:08:03
 */

import Vue from "vue";

const money = (value: number | string, type?: number): string | number => {
  if (typeof value === "number" && !isNaN(value)) {
    const n = type && type >= 0 ? type : 2;
    return value.toFixed(n);
  } else {
    return "0.00";
  }
};

Vue.filter("money", money);
