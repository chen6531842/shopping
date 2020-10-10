/*
 * @Autor: 杨华
 * @Version: 1.0
 * @Date: 2019-11-26 15:16:55
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-10-09 22:21:47
 */
import { objAny } from '../common/common-interface';
let configData = {};
//为了防止哪天在域名中间加了东西 或者接口域名变了 ，然后外面连接一个js 文件 js 文件里放这几个参数就可以了
// 其它打包路径已设置为相对路径 ,只和 static  和 index.html 文件 在同一层级就可以了
const win: objAny = window;
if (win.appConfig && typeof win.appConfig == 'object') {
  configData = Object.assign(configData, win.appConfig);
}
export default configData;
