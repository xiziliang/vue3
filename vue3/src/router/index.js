import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

// NOTE:
// 将
// history.pushState(myState, '', url)
// 替换成
// await router.push(url)
// history.replaceState({ ...history.state, ...myState }, '')
// 同样，如果你在调用 history.replaceState() 时没有保留当前状态，你需要传递当前 history.state：

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //process?.env.BASE_URL 为啥process没有
  routes
})

export default router
