import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@container/Home"; //首页

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    redirect: {
      name: "index"
    },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import(/* webpackChunkName: "index" */ "@views/index"),
        meta: {
          title: "小米首页"
        }
      },
      {
        path: "product/:id",
        name: "product",
        component: () =>
          import(/* webpackChunkName: "product" */ "@views/product.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "detail/:id",
        name: "detail",
        component: () =>
          import(/* webpackChunkName: "detail" */ "@views/detail.vue"),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: "/order",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "order" */ "@container/Order.vue"),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: "cart",
        name: "cart",
        component: () =>
          import(/* webpackChunkName: "cart" */ "@views/cart.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "aliPay",
        name: "aliPay",
        component: () =>
          import(/* webpackChunkName: "aliPay" */ "@views/aliPay.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "orderList",
        name: "orderList",
        component: () =>
          import(/* webpackChunkName: "orderList" */ "@views/orderList.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "orderComfirm",
        name: "orderComfirm",
        component: () =>
          import(
            /* webpackChunkName: "orderComfirm" */ "@views/orderComfirm.vue"
          ),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@views/login.vue")
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console
  console.log("to", to);
  next();
});

export default router;
