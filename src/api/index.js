import {
  requestGet,
  requestPost,
  requestDel,
  requestPostForm,
  requestPostMultipart
} from './request';
/**
 *   获取用户个人账户信息
 */
export const getUserInfo = (data, config) => {
  return requestGet('oms-mobile-server/v1/wx/user/account', data, config);
};

/**
 *   获取订单信息列表
 */
export const getChargeRecord = (data, config) => {
  return requestPost('oms-mobile-server/v1/wx/personal/order/page', data, config);
};

/**
 *  一键退款
 */
export const batchRefund = (data, config) => {
  return requestPostForm('oms-mobile-server/v1/personal/refund/batch', data, config);
};

/**
 *  获取符合退款条件的充值订单列表
 */
export const getRefundRechargeList = (data, config) => {
  return requestPost('oms-mobile-server/v1/personal/refund/charge/page', data, config);
};

/**
 *  在自定义退款前获得本次退款的预明细信息
 */
export const customRefundDetail = (data, config) => {
  return requestGet('oms-mobile-server/v1/personal/refund/custom/detail', data, config);
};

/**
 *  获取充电中实时数据
 */
export const getRealTimeInfo = (data, config) => {
  return requestGet('oms-mobile-server/v1/wx/charge/real_time_info', data, config);
};

/**
 *  账单结算
 */
export const settleAccount = (data, config) => {
  return requestGet('oms-mobile-server/v1/wx/charge/settle/exec', data, config);
};

/**
 *  账单结算前的信息
 */
export const settleAccountInfo = (data, config) => {
  return requestGet('oms-mobile-server/v1/wx/charge/settle/info', data, config);
};

/**
 *  根据关键字查询地图上的站点信息
 */
export const getStationByKey = (data, config) => {
  return requestPost('oms-mobile-server/v1/opr/sta/list', data, config);
};

/*-------------------------------------------------------------------------------------*/

/**
 *  获取短信验证码
 */
export const getSmsCode = (data, config) => {
  return requestPost('basic-system/v1/vercode/sms', data, config);
};
/**
 *  登录
 */
export const login = (data, config) => {
  return requestPost('basic-system/v1/wx/auth/login', data, config);
};
/**
 *  获取授权需要的签名参数
 */
export const getSign = (data, config) => {
  return requestGet('basic-system/v1/wx/auth/sign', data, config);
};
/**
 *  绑定用户
 */
export const bindUser = (data, config) => {
  return requestPost('basic-system/v1/wx/auth/bind', data, config);
};

/**
 *  获取用户个人信息
 */
export const getUserBaseInfo = (data, config) => {
  return requestGet('basic-system/v1/user/base', data, config);
};

/**
 *  保存用户个人信息
 */
export const saveUserBaseInfo = (data, config) => {
  return requestPost('basic-system/v1/user/base/upd', data, config);
};
/**
 *  分页根据输入条件查询充电站信息
 */
export const getStationList = (data, config) => {
  return requestPost('oms-operation-service/v1/opr/sta/wx/page', data, config);
};

/**
 *  根据充电站主键查询充电站初步详情
 */
export const getStationDetail = (data, config) => {
  return requestGet('oms-operation-service/v1/opr/sta/wx/detail', data, config);
};

/**
 *  用户收藏站点
 */
export const collectStation = (data, config) => {
  return requestGet('oms-operation-service/v1/user/collect/sta/confirm_or_cancel', data, config);
};

/**
 *  运营商列表
 */
export const getOprList = (data, config) => {
  return requestGet('oms-operation-service/v1/opr/list', data, config);
};

/**
 *  查询充电站下的充电桩
 */
export const getStationDetailPile = (data, config) => {
  return requestGet('oms-operation-service/v1/opr/sta/wx/detail_more/pile/list', data, config);
};

/**
 *  查询充电站的费用信息
 */
export const getStationDetailFee = (data, config) => {
  return requestGet('oms-operation-service/v1/opr/sta/wx/detail/fee', data, config);
};

/**
 *  提交意见
 */
export const submitAdvice = (data, config) => {
  return requestPost('oms-operation-service/v1/opr/feed/back/submission', data, config);
};

/**
 *  上传图片
 */
export const uploadImage = (data, config) => {
  return requestPostMultipart('basic-system/v1/file/upload_image', data, config);
};

/**
 *  查询我的订单列表
 */
export const pageOrder = (data, config, cancelToken) => {
  return requestPost('oms-order-service/v1/my/order/page', data, config, cancelToken);
};
/**
 *   获取用户个人账户信息
 */
export const getUserAccount = (data, config) => {
  return requestGet('oms-order-service/v1/my/account', data, config);
};

/**
 *   获取账户列表
 */
export const getAccountList = (data, config) => {
  return requestGet('oms-order-service/v1/my/accounts', data, config);
};

/**
 *   获取我的订单分类统计
 */
export const getOrderStatCount = (data, config) => {
  return requestGet('oms-order-service/v1/my/order/stat', data, config);
};

/**
 *   获取账户信息
 */
export const getAccount = (data, config) => {
  return requestGet('oms-order-service/v1/my/account', data, config);
};

/**
 *   自定义退款申请(退款到微信钱包)
 */
export const customRefund = (data, config) => {
  return requestPostForm('oms-order-service/v1/refund/wx/custom', data, config);
};

/**
 *   微信统一下单
 */
export const makePayOrder = (data, config) => {
  return requestPost('oms-order-service/v1/recharge/wx', data, config);
};

/**
 *   查询结果
 */
export const queryPayResult = (data, config) => {
  return requestPostForm('oms-order-service/v1/recharge/wx/result', data, config);
};

/**
 *   获取字典
 */
export const getDictInfo = (data, config) => {
  return requestGet('basic-system/v1/dict/item/list', data, config);
};
/**
 *   量获取多个字典信息大类下小类列表集合
 */
export const getDictInfoList = (data, config) => {
  return requestGet('basic-system/v1/dict/item/list_batch', data, config);
};
/**
 *   获取标签
 */
export const getTags = (data, config) => {
  return requestGet('oms-operation-service/v1/opr/tag/list', data, config);
};

/**
 *  收藏列表
 */
export const getCollect = (data, config) => {
  return requestGet('oms-operation-service/v1/user/collect/sta/list', data, config);
};

/**
 *  根据交易类型、起止时间查询个人交易流水列表
 */
export const getTransactionList = (data, config) => {
  return requestPost('oms-order-service/v1/account/transaction/page', data, config);
};

/**
 *  根据订单编号查询交易详细信息
 */
export const getTransactionDetail = (data, config) => {
  return requestGet('oms-order-service/v1/account/transaction/detail', data, config);
};

/**
 *  用户更新手机号码获取校验码
 */
export const getValidateCode = (data, config) => {
  return requestPost('basic-system/v1/vercode/sms/validate', data, config);
};

/**
 *  更新用户手机号码
 */
export const updateUserPhone = (data, config) => {
  return requestPost('basic-system/v1/user/base/upd_phone_no', data, config);
};

/**
 *  退出登录
 */
export const exitLogin = (data, config) => {
  return requestPost('basic-system/v1/wx/auth/logout', data, config);
};

/**
 *  更新头像
 */
export const upUserHeadImg = (data, config) => {
  return requestPost('basic-system/v1/user/base/upd_head', data, config);
};


/**
 *   获取当前运营商下我的账户信息
 */
export const getAccountBaseInfo = (data, config) => {
  return requestGet('oms-order-service/v1/my/curr_account', data, config);
};

/**
 *   获取当前运营商的APPID
 */
export const getAppID = (data, config) => {
  return requestGet('basic-system/v1/wx/auth/appid', data, config);
};



/**
 *  准备充电
 */
export const getChargePrepareInfo = (data, config) => {
  return requestPost('oms-charge-service/v1/charge/prepare', data, config);
};

/**
 *  开始充电
 */
export const startCharge = (data, config) => {
  return requestPost('oms-charge-service/v1/charge/start', data, config);
};
/**
 *  互联互通开始充电
 */
export const hlhtStartCharge = (data, config) => {
  return requestPost('oms-charge-service/v1/charge/hlht/start', data, config);
};
/**
 *  启动充电中
 */
export const startCharging = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/charge_gun_order_status_info', data, config);
};

/**
 *  充电之前校验账户信息
 */
export const getCheckAcct = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/check_acct', data, config);
};
/**
 *  获取充电中实时数据
 */
export const startChargeRealtimeData = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/real_time_info', data, config);
};

/**
 *  结束充电
 */
export const stopCharge = (data, config) => {
  return requestPost('oms-charge-service/v1/charge/stop', data, config);
};

/**
 *  获取订单和枪口状态(充电结束和待拔枪用)
 */
export const getGunOrderStatus = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/charge_complete_gun_order_status_info', data, config);
};

/**
 *  获取订单费用结算信息
 */
export const getOrderFareInfo = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/settle/info', data, config);
};

/**
 *  执行订单结算
 */
export const doPayOrder = (data, config) => {
  return requestPost('oms-charge-service/v1/charge/settle/exec', data, config);
};

/**
 *  获取充电费率
 */
export const getChargeFee = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/fee', data, config);
};

/**
 *  根据主键查询订单详细信息
 */
export const getChargeRecordDetail = (data, config) => {
  return requestGet('oms-charge-service/v1/order/detail', data, config);
};

/**
 *  根据二维码信息获取公众号信息
 */
export const getOprPkId = (data, config) => {
  return requestGet('basic-system/v1/wx/auth/app_info', data, config);
};

/**
 *  查询token剩余时间
 */
export const getTokenTime = (data, config) => {
  return requestGet('basic-system/v1/auth/expires_in', data, config);
};

/**
 *  获取用户未结算的订单
 */
export const getNotPayOrder = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/order/concerned', data, config);
};
/**
 *  检查当前用户是否为企业会员
 */
export const getUserVipType = (data, config) => {
  return requestGet('oms-operation-service/v1/user/personal/check/vip_type', data, config);
};
/**
 *  企业会员主页信息
 */
export const getEntOverview = (data, config) => {
  return requestGet('oms-order-service/v1/my/ent/overview', data, config);
};
/**
 *  查询企业用户订单列表
 */
export const getEntOrder = (data, config) => {
  return requestPost('oms-order-service/v1/my/ent_order/page', data, config);
};
/**
 *  获取企业账户信息
 */
export const getEntAccount = (data, config) => {
  return requestGet('oms-order-service/v1/account/query/ent', data, config);
};
/**
 *  获取公众号会员全部电卡信息
 */
export const getCardList = (data, config) => {
  return requestGet('basic-system/v1/user/base/card_list', data, config);
};
/**
 *  关联电卡详情
 */
export const getCardDetails = (data, config) => {
  return requestGet('oms-operation-service/v1/card/detail', data, config);
};
/**
 *  取消电卡
 */
export const unbindCard = (data, config) => {
  return requestPostForm('oms-operation-service/v1/card/unbind', data, config);
};

/**
 *  启动超时，结束充电
 */
export const startTimeout = (data, config) => {
  return requestPost('oms-charge-service/v1/charge/start/timeout', data, config);
};

/**
 *  获取结算后的订单信息
 */
export const getOrderafterSettle = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/order/after_settle', data, config);
};

/**
 *  获取枪口信息
 */
export const getChargeGunInfo = (data, config) => {
  return requestGet('oms-charge-service/v1/charge/gun_info', data, config);
};
/**
 *  更新订单阅读状态
 */
export const upOrderRead = (data, config) => {
  return requestPost('oms-charge-service/v1/order/read', data, config);
};

/**
 *  获取站点联系电话
 */
export const getStaPhone = (data, config) => {
  return requestGet('oms-operation-service/v1/opr/sta/phone', data, config);
};
/**
 *  申请一卡多充
 */
export const applyMultiCharge = (data, config) => {
  return requestPostForm('oms-operation-service/v1/opr/multicharge/apply_multiCharge', data, config);
};
/**
 *  获取反馈消息列表
 */
export const getFeedList = (data, config) => {
  return requestPost('oms-operation-service/v1/opr/feed/back/page/content', data, config);
};
/**
 *  获取运营商的信息
 */
export const getOperInfo = (data, config) => {
  return requestGet('basic-system/v1/sys/opr/get', data, config);
};
/**
 *  获取车辆信息集合
 */
export const getCarList = (data, config) => {
  return requestGet('basic-system/v1/user/car/list', data, config);
};
/**
 *  添加车辆信息
 */
export const addCar = (data, config) => {
  return requestPost('basic-system/v1/user/car/add', data, config);
};
/**
 *  更新车辆信息
 */
export const upCar = (data, config) => {
  return requestPost('basic-system/v1/user/car/upd', data, config);
};
/**
 *  删除车辆信息
 */
export const delCar = (data, config) => {
  return requestDel('basic-system/v1/user/car/del', data, config);
};
/**
 *  设置默认车辆信息
 */
export const setDefaultCar = (data, config) => {
  return requestPost('basic-system/v1/user/car/set_default', data, config);
};
/**
 *  
切换订单车牌号
 */
export const chargeCarno = (data, config) => {
  return requestPost('oms-charge-service/v1/order/charge_carno', data, config);
};
/**
 *  
查询站点最新的公告
 */
export const getStaNotice = (data, config) => {
  return requestGet('oms-operation-service/v1/notice/info/newest/notice', data, config);
};
/**
 *  
查询站点公告内容详情
 */
export const getStaNoticeDetails = (data, config) => {
  return requestGet('oms-operation-service/v1/notice/info/detail/notice', data, config);
};
/**
 *  
根据主键查询订单简要信息
 */
export const getOrderDetails = (data, config) => {
  return requestGet('oms-charge-service/v1/order/detail/short', data, config);
};
/**
 *  
获取系统公告轮播对象集合
 */
export const getSystemnotice = (data, config) => {
  return requestGet('oms-operation-service/v1/notice/info/list/system_notice', data, config);
};
/**
 *  
获取运营商的 logo
 */
export const getOprLogo = (data, config) => {
  return requestGet('oms-operation-service/v1/opr/wx/config/opr/logo', data, config);
};

/**
 *  
根据桩枪ID获取当前订单号
 */
export const getOrderCurrent = (data, config) => {
  return requestPostForm('oms-charge-service/v1/order/current', data, config);
};
/**
 *  
分页查询我的优惠券信息
 */
export const getMyCoupon = (data, config) => {
  return requestPost('oms-order-service/v1/my/coupon/page', data, config);
};
/**
 *  
查询优惠券使用说明
 */
export const getMyCouponInstructions= (data, config) => {
  return requestGet('oms-order-service/v1/my/coupon/instructions', data, config);
};