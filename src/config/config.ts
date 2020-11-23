import { objAny } from "../common/common-interface";
let configData = {
  getCodeUrl: "https://sq.xhxim.com/get-code.html",
  appId: "wxbb5cc24e67223b59",
  wxName: "小海星省钱",
  logoUrl: "/common/logo.png",
  shareImgUrl: "/common/share.jpg",
  minCash: 20 // 最小提现金额
};
//为了防止哪天在域名中间加了东西 或者接口域名变了 ，然后外面连接一个js 文件 js 文件里放这几个参数就可以了
// 其它打包路径已设置为相对路径 ,只和 static  和 index.html 文件 在同一层级就可以了
const win: objAny = window;
if (win.appConfig && typeof win.appConfig == "object") {
  configData = Object.assign(configData, win.appConfig);
}
export default configData;
