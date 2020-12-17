import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/CanvasHome",
    name: "CanvasHome",
    component: () =>
      import(/* webpackChunkName: "CanvasHome" */ "../views/CanvasHome.vue"),
  },
  {
    path: "/reactive",
    name: "Reactive",
    component: () =>
      import(/* webpackChunkName: "reactive" */ "../views/Reactive.vue"),
  },
  {
    path: "/sprite",
    name: "Sprite",
    component: () =>
      import(/* webpackChunkName: "sprite" */ "../views/Sprite.vue"),
  },
  {
    path: "/roughjs",
    name: "roughjs",
    component: () =>
      import(/* webpackChunkName: "roughjs" */ "../views/rough.vue"),
  },
  {
    path: "/function",
    name: "function",
    component: () =>
      import(/* webpackChunkName: "function" */ "../views/函数式编程.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
