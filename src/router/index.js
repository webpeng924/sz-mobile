import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/bill",
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
    path: "/memberinfo",
    name: "memberinfo",
    component: () => import("../views/member/memberinfo.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue")
  },

  {
    path: "/stock",
    name: "stock",
    component: () => import(/* webpackChunkName: "about" */ "../views/stock")
  },
  {
    path: "/goods",
    name: "goods",
    component: () => import("../views/store/goods.vue")
  },
  {
    path: "/items",
    name: "items",
    component: () => import("../views/store/items.vue")
  },
  {
    path: "/addgoods",
    name: "addgoods",
    component: () => import("../views/store/addgoods.vue")
  },
  {
    path: "/additems",
    name: "additems",
    component: () => import("../views/store/additems.vue")
  },
  {
    path: "/goodsInfo",
    name: "goodsInfo",
    component: () => import("../views/store/goodsInfo.vue")
  },
  {
    path: "/itemsInfo",
    name: "itemsInfo",
    component: () => import("../views/store/itemsinfo.vue")
  },
  {
    path: "/shopinfo",
    name: "shopinfo",
    component: () => import("../views/mine/shopInfo.vue")
  },
  {
    path: "/stafflist",
    name: "stafflist",
    component: () => import("../views/mine/stafflist.vue")
  },
  {
    path: "/addstaff",
    name: "addstaff",
    component: () => import("../views/mine/addstaff.vue")
  },
  {
    path: "/quickmoney",
    name: "quickmoney",
    component: () => import("@/components/quickmoney.vue")
  },
  {
    path: "/opennew",
    name: "opennew",
    component: () => import("@/components/opennew.vue")
  },
  {
    path: "/payok",
    name: "payok",
    component: () =>
      import("@/components/payok.vue")
  },
  {
    path: "/closeBook",
    name: "closeBook",
    component: () =>
      import("@/components/closeBook.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let user = sessionStorage.getItem("userInfo");
  if (user || to.path == "/login") {
    // if (to.path == '/') {
    //   next({
    //     path: "/bill"
    //   });
    // } else {
    next();
    // }
  } else {
    next({
      path: "/login"
    });
  }
});

export default router;
