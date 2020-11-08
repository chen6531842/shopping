import { objAny } from "../common/common-interface";
import common from "../common/common";
import config from "../config/config";
import store from "../store/index";
import { login } from "@/api/index";
import { Toast } from "vant";
const init: objAny = {
  isInit: false,
  async init(next: Function, to: objAny) {
    this.isInit = true;
    const userInfo = common.get("app_userInfo"); //本地保存的登录token
    const code = common.request("code") || ""; //
    const win: objAny = window;
    if (code != "") {
      // 请求CODE
      const ret = await login({
        code: code,
        front_url: win.location.origin
      });
      if (ret.code == 0) {
        common.save("app_userInfo", ret.data);

        store.commit("SET_USERINFO", ret.data);
        store.commit("SET_ISLOGIN", true);
        next(to.path);
      } else {
        Toast(ret.msg);
      }
    } else if (userInfo) {
      store.commit("SET_ISLOGIN", true);
      store.commit("SET_USERINFO", userInfo);
      next();
    } else {
      const url = win.location.href.replace(/#/g, "__");
      win.location.href =
        config.getCodeUrl + "?url=" + url + "&appId=" + config.appId;
    }
  }
};

export default init;
