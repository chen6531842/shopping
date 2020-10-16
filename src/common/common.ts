/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-21 13:59:26
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-10-16 14:10:54
 */

import { objAny } from "../common/common-interface";
// import configData from "../config/config";
const common: objAny = {
  /**
   * 存本地数据
   * @param item 名字
   * @param str 数据
   * @param type 本地数据类型,没有 localStorage  有 sessionStorage
   */
  save(item: string, str: string | object, type?: number): void {
    const typeData: number = type || 0;
    if (typeof str == "object") {
      str = JSON.stringify(str);
    }
    const win: objAny = window;
    if (typeData) {
      win.sessionStorage.removeItem(item);
      win.sessionStorage[item] = str;
    } else {
      win.localStorage.removeItem(item);
      win.localStorage[item] = str;
    }
  },
  /**
   * 取本地数据
   * @param item 名字
   * @param type 本地数据类型,没有 localStorage  有 sessionStorage
   */
  get(item: string, type?: number): objAny | string | boolean {
    let value: string;
    const typeData: number = type || 0;
    const win: objAny = window;
    if (typeData) {
      if (win.sessionStorage[item] !== undefined) {
        value = win.sessionStorage[item];
        if (value.indexOf("{") == 0 || value.indexOf("[") == 0) {
          return JSON.parse(value);
        } else {
          return value;
        }
      } else {
        return false;
      }
    } else {
      if (win.localStorage[item] !== undefined) {
        value = win.localStorage[item];
        if (value.indexOf("{") == 0 || value.indexOf("[") == 0) {
          return JSON.parse(value);
        } else {
          return value;
        }
      } else {
        return false;
      }
    }
  },
  /**
   * 删除本地数据
   * @param name 名字
   * @param type 本地数据类型,没有 localStorage  有 sessionStorage
   */
  remove(name?: string, type?: number) {
    const typeData: number = type || 0;
    const item: string = name || "-1";
    const win: objAny = window;
    if (typeData) {
      if (item == "-1") {
        win.sessionStorage.clear();
      } else {
        win.sessionStorage.removeItem(item);
      }
    } else {
      if (item == "-1") {
        win.localStorage.clear();
      } else {
        win.localStorage.removeItem(item);
      }
    }
  },
  out(): void {
    this.remove();
    const win: objAny = window;
    // if (configData.loginUrl) {
    //   win.location.href = configData.loginUrl;
    // } else {
    win.history.go(0);
    // }
  },
  parseParam(json: objAny): string {
    const params = Object.keys(json)
      .map(function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&");
    return params;
  },
  thisTimes: function(type: string, dateObj?: objAny): string | number {
    const d = dateObj || new Date();
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let dd = d.getDate();
    const day = d.getDay(); // 星期几
    let h = d.getHours(); // 时
    let f = d.getMinutes(); // 分
    let s = d.getSeconds(); // 秒
    y = y < 10 ? "0" + y : y;
    m = m < 10 ? "0" + m : m;
    h = h < 10 ? "0" + h : h;
    dd = dd < 10 ? "0" + dd : dd;
    f = f < 10 ? "0" + f : f;
    s = s < 10 ? "0" + s : s;
    let json: string | number = "";
    let yy = "";

    switch (type) {
      case "yy":
        json = y;
        break;
      case "mm":
        json = m;
        break;
      case "dd":
        json = dd;
        break;
      case "hh":
        json = h;
        break;
      case "ff":
        json = f;
        break;
      case "ss":
        json = s;
        break;
      case "day":
        json = day;
        break;
      case "days":
        json = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        break;
      case "yyyy":
        json = y;
        break;
      case "yyyy-MM":
        json = y + "-" + m;
        break;
      case "yyyy-MM-s":
        yy = y + "";
        yy = yy.substring(yy.length - 3, yy.length - 1);
        json = yy + "-" + m;
        break;
      case "yyyy-MM-dd":
        json = y + "-" + m + "-" + dd;
        break;
      case "yyyy-MM-dd HH:MM":
        json = y + "-" + m + "-" + dd + " " + h + ":" + f;
        break;
      case "yyyy-MM-dd HH:MM:SS":
        json = y + "-" + m + "-" + dd + " " + h + ":" + f + ":" + s;
        break;
      case "HH:MM":
        json = h + ":" + f;
        break;
      default:
        json = y + "-" + m + "-" + dd + " " + h + ":" + f + ":" + s;
        break;
    }
    return json;
  },
  userDate: function(uData: Date, type?: string) {
    const myDate = new Date(uData);
    const year = this.t(myDate.getFullYear());
    const month = this.t(myDate.getMonth() + 1);
    const day = this.t(myDate.getDate());
    const hours = this.t(myDate.getHours());
    const minutes = this.t(myDate.getMinutes());
    const second = this.t(myDate.getSeconds());
    if (type === "yyyy-MM") {
      return year + "-" + month;
    } else if (type === "yyyy-MM-dd") {
      return year + "-" + month + "-" + day;
    } else if (type === "HH:MM") {
      return hours + ":" + minutes;
    } else {
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        second
      );
    }
  },
  t(time: number) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  },
  tableNoData(text?: string) {
    const tableText = text || "暂无数据";
    return (
      "<div class='table-no-data'><i class='ivu-icon ivu-icon-ios-folder-open-outline'></i><p>" +
      tableText +
      "</p></div>"
    );
  },
  request(paras: string): string {
    const win: objAny = window;
    const url = decodeURIComponent(win.location.href);
    const paraString = url
      .substring(url.indexOf("?") + 1, url.length)
      .split("&");
    const paraObj: objAny = {};
    /* eslint-disable */
    var j
    for (var i = 0; (j = paraString[i]); i++) {
      paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(
        j.indexOf('=') + 1,
        j.length
      )
    }
    /* eslint-enable */
    const returnValue = paraObj[paras.toLowerCase()];
    if (typeof returnValue === "undefined") {
      return "";
    } else {
      return returnValue;
    }
  }
};

export default common;
