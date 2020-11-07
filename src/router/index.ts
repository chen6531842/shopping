import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { objAny } from "../common/common-interface";
// import Home from "../views/Home.vue";
// import helpCenter from "../views/help-center/help-center.vue";
import store from "../store/index";
import initFn from "../common/init";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/help-center/help-center.vue")
  },
  {
    path: "/help-center",
    name: "帮助中心",
    component: () => import("../views/help-center/help-center.vue")
  },
  {
    path: "/problem-list",
    name: "问题列表",
    component: () => import("../views/problem-list/problem-list.vue")
  },
  {
    path: "/problem-list/details",
    name: "问题详情",
    component: () => import("../views/problem-details/problem-details.vue")
  },
  {
    path: "/my",
    name: "我的",
    component: () => import("../views/my/my.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/my-grade",
    name: "我的等级",
    component: () => import("../views/my-grade/my-grade.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/my-wallet",
    name: "提现",
    component: () => import("../views/my-wallet/my-wallet.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/withdrawal",
    name: "提现",
    component: () => import("../views/withdrawal/withdrawal.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/deposit",
    name: "提现明细",
    component: () => import("../views/deposit/deposit.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/income",
    name: "收入明细",
    component: () => import("../views/income/income.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/my-order",
    name: "我的订单",
    component: () => import("../views/my-order/my-order.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/my-other-order",
    name: "粉丝订单",
    component: () => import("../views/other-order/other-order.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/my-team",
    name: "我的团队",
    component: () => import("../views/my-team/my-team.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/my-about",
    name: "关于我们",
    component: () => import("../views/about/about.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/wx",
    name: "获取用户信息",
    component: () => import("../views/wx/wx.vue")
  },
  {
    path: "/withdrawal-sub",
    name: "获取用户信息",
    component: () => import("../views/withdrawal-sub/withdrawal-sub.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const doc: objAny = document;
  doc.title = to.name;

  const state: any = store.state // eslint-disable-line
  if (to.meta.isLogin && !state.app.isLogin) {
    initFn.init(next, to);
  } else {
    next();
  }
});

export default router;
