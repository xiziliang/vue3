<template>
  <div>
    <router-link v-for="(item, index) in arr" :key="index" :to="item">{{
      item.replace("/", " ") + "页面"
    }}</router-link>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  components: {
    name: "home",
  },
  setup(prop) {
    const arr = reactive(["/CanvasHome", "/reactive", "/sprite", "/roughjs","/function","/susAndTemp","/echarts5"]);
    return {
      arr,
    };
  },
};
</script>
<style scoped>
a {
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
