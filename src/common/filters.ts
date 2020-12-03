/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-27 14:00:36
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-12-03 16:50:24
 */

import Vue from "vue";

const money = (value: number | string, type?: number): string | number => {
  if (typeof value === "number" && !isNaN(value)) {
    const n = type && type >= 0 ? type : 2;
    return value.toFixed(n);
  } else if (typeof value === "string" && parseFloat(value) > 0) {
    const n = type && type >= 0 ? type : 2;
    return parseFloat(value).toFixed(n);
  } else {
    return "0.00";
  }
};
const rateMoney = (value: number | string, type?: number): string | number => {
  if (value > 0) {
    value = typeof value == "string" ? parseFloat(value) : value;
    const val: string = value.toFixed(2);
    return val;
  } else {
    return 0;
  }
};

Vue.filter("money", money);
Vue.filter("rateMoney", money);
