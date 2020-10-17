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
  return requestPost("/v1/user/get_token", data, config);
};
/**
 *   个人信息
 */
export const getUserInfo = (data: objAny, config = false) => {
  return requestPost("/v1/user/info", data, config);
};
/**
 *   我的钱包
 */
export const getWalletInfo = (data: objAny, config = false) => {
  return requestPost("/v1/wallet/info", data, config);
};
/**
 *   申请绑定支付宝
 */
export const bindAlipayApply = (data: objAny, config = false) => {
  return requestPost("/v1/wallet/bindAlipayApply", data, config);
};
/**
 *   申请绑定支付宝_提交
 */
export const bindAlipaySubmit = (data: objAny, config = false) => {
  return requestPost("/v1/wallet/bindAlipaySubmit", data, config);
};
/**
 *   提现申请
 */
export const withdrawApply = (data: objAny, config = false) => {
  return requestPost("/v1/wallet/withdrawApply", data, config);
};
/**
 *   收入记录
 */
export const incomeLogs = (data: objAny, config = false) => {
  return requestPost("/v1/wallet/incomeLogs", data, config);
};
/**
 *   提现明细
 */
export const withdrawLogs = (data: objAny, config = false) => {
  return requestPost("/v1/wallet/withdrawLogs", data, config);
};
/**
 *   个人分享码
 */
export const getUserQrcode = (data: objAny, config = false) => {
  return requestPost("/v1/user/qrcode", data, config);
};
/**
 *   我的团队
 */
export const getUserMyTeam = (data: objAny, config = false) => {
  return requestPost("/v1/user/myTeam", data, config);
};
