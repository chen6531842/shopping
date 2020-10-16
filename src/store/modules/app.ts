/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-20 15:12:36
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-10-16 13:47:16
 */
import common from "../../common/common";

import router from "../../router/index";
import { objAny } from "../../common/common-interface";
const state = {
  isLogin: false,
  token: "",
  userInfo: {}
};

const getters = {};

const mutations = {
  /**
   * 是否登录
   * @param state
   * @param status 状态
   */
  SET_ISLOGIN(state: objAny, status: boolean): void {
    state.isLogin = status;
  },
  SET_USERINFO(state: objAny, data: objAny): void {
    state.userInfo = data;
  },
  SET_TOKEN(state: objAny, token: string): void {
    state.token = token;
  }
};

const actions = {
  // async getOprInfo({ commit }: objAny) {
  //   const ret = await getOprInfo({});
  //   if (ret.status === configData.apiStatus) {
  //     commit("SET_OPERINFO", ret.data[0]);
  //   }
  // }
};

export default {
  state,
  mutations,
  actions,
  getters
};
