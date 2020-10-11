import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import helpCenter from "../views/help-center/help-center.vue";

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
    component: () => import("../views/my/my.vue")
  },
  {
    path: "/my-grade",
    name: "我的等级",
    component: () => import("../views/my-grade/my-grade.vue")
  },
  {
    path: "/my-wallet",
    name: "提现",
    component: () => import("../views/my-wallet/my-wallet.vue")
  },
  {
    path: "/withdrawal",
    name: "提现",
    component: () => import("../views/withdrawal/withdrawal.vue")
  },
  {
    path: "/deposit",
    name: "提现明细",
    component: () => import("../views/deposit/deposit.vue")
  },
  {
    path: "/income",
    name: "收入明细",
    component: () => import("../views/income/income.vue")
  },
  {
    path: "/my-order",
    name: "我的订单",
    component: () => import("../views/my-order/my-order.vue")
  },
  {
    path: "/my-team",
    name: "我的团队",
    component: () => import("../views/my-team/my-team.vue")
  },
  {
    path: "/my-about",
    name: "关于我们",
    component: () => import("../views/about/about.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
