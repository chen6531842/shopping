import { objAny } from "../common/common-interface";
import common from "../common/common";
import config from "../config/config";
import store from "../store/index";
const init: objAny = {
  isInit: false,
  async init(next: Function, to: objAny) {
    this.isInit = true;
    const token = common.get("token") || ""; //本地保存的登录token
    const code = common.request("code") || ""; //

    if (code != "") {
    } else if (token) {
      store.commit("SET_TOKEN", token);
      next();
    } else {
      const win: objAny = window;
      const hash = win.location.hash.replace(/#/g, "__");
      win.location.href =
        config.getCodeUrl + "?url=" + hash + "&appId=" + config.appId;
    }
  }
};

export default init;
