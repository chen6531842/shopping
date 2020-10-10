/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-01-09 14:43:21
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-05-29 09:23:58
 */

// 对象 { 'a' : 'str' }
export interface objStr {
  [propName: string]: string;
}
// 对象 { 'a' : 1 }
export interface objNumber {
  [propName: string]: number;
}
// 对象可以用任何值
export interface objAny {
  [propName: string]: any;
}

export interface regCallback {
  (name?: objAny): void;
}
export interface numberCallback {
  (name?: number): void;
}
export interface stringCallback {
  (name?: string): void;
}
// export interface arrStr {
//   string;
// }
