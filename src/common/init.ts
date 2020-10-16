import { objAny } from "../common/common-interface";
import common from "../common/common";
import config from "../config/config";
import store from "../store/index";
import { login } from "@/api/index";
const init: objAny = {
  isInit: false,
  async init(next: Function, to: objAny) {
    this.isInit = true;
    const token = common.get("token") || ""; //本地保存的登录token
    const code = common.request("code") || ""; //
    const win: objAny = window;
    if (code != "") {
      // 请求CODE
      const ret = await login({
        code: code,
        front_url: win.location.origin
      });
      next();
    } else if (token) {
      store.commit("SET_TOKEN", token);
      next();
    } else {
      const url = win.location.href.replace(/#/g, "__");
      win.location.href =
        config.getCodeUrl + "?url=" + url + "&appId=" + config.appId;
    }
  }
};

export default init;
