import {
  requestGet,
  requestPost,
  requestDel,
  // requestPostForm,
  requestPostMultipart
} from "./request";
import { objAny } from "../common/common-interface";
/**
 *   登录
 */
export const login = (data: objAny, config = false) => {
  return requestGet("/mock/23/v1/user/get_token", data, config);
};
/**
 *   获取用户个人账户信息
 */
export const getUserInfo = (data: objAny, config = false) => {
  return requestGet("oms-mobile-server/v1/wx/user/account", data, config);
};
