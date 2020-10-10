import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import helpCenter from '../views/help-center/help-center.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/help-center',
    name: '帮助中心',
    component: () => import('../views/help-center/help-center.vue'),
  },
  {
    path: '/problem-list',
    name: '问题列表',
    component: () => import('../views/problem-list/problem-list.vue'),
  },
  {
    path: '/problem-list/details',
    name: '问题详情',
    component: () => import('../views/problem-details/problem-details.vue'),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
