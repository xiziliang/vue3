<template>
  <div>
    <router-link v-for="(item, index) in arr" :key="index" :to="item">{{
      item.replace("/", " ") + "页面"
    }}</router-link>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useRouter, useRoute, beforeRouteEnter } from "vue-router";
export default {
  components: {
    name: "home",
  },
  setup(prop) {
    const arr = reactive([
      "/CanvasHome",
      "/reactive",
      "/sprite",
      "/roughjs",
      "/function",
      "/susAndTemp",
      "/echarts5",
      "/threejs",
    ]);
    const router = useRouter();
    const route = useRoute();
    // router.beforeEach((to, from,next) => {
    //   debugger
    //   console.log(to)
    // })
    router.afterEach((to, from) => {
      console.log(to.fullPath);
    });
    return {
      arr,
      router,
      route,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm.arr);
    });
  },
};
</script>
<style scoped>
a {
  height: 0.3rem;
  font-size: 0.2rem;
  display: block;
  margin-top: 20px;
  text-decoration: none;
}
a:nth-child(1) {
  margin-top: 0px;
}
a:hover {
  color: skyblue !important;
}
</style>
