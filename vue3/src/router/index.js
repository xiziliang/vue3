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
      import(/* webpackChunkName: "about" */ "../views/CanvasHome.vue"),
  },
  {
    path: "/reactive",
    name: "Reactive",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Reactive.vue"),
  },
  {
    path: "/sprite",
    name: "Sprite",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Sprite.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
