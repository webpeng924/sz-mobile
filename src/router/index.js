import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/bill",
        name: "bill",
        component: () => import("../views/bill")
      },
      {
        path: "/data",
        name: "data",
        component: () => import("../views/data")
      },
      {
        path: "/member",
        name: "member",
        component: () => import("../views/member")
      },
      {
        path: "/mine",
        name: "mine",
        component: () => import("../views/mine/index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let user = sessionStorage.getItem("userInfo");
  if (user || to.path == "/login") {
    if (to.path == '/') {
      next({
        path: "/bill"
      });
    }
    next();
  } else {
    next({
      path: "/login"
    });
  }
});

export default router;
