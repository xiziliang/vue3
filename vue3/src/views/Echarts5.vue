<template>
  <div id="box">
    <AsyncComp ></AsyncComp>
    <Comp></Comp>
    <CustomComp></CustomComp>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted, onErrorCaptured } from "vue";
import AsyncComp from '../components/echarts5Comp/异步数据加载带loading.vue';
import Comp from '../components/echarts5Comp/正常柱状图.vue';
import CustomComp from '../components/echarts5Comp/自定义图形.vue';
export default {
  name: "Echarts5",
  components: {
    AsyncComp,
    Comp,
    CustomComp
  },
  setup(prop, ctx) {

    return {
    }
  },
};
</script>
<style scoped lang="less">
#box {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap:wrap;
  background-color: #fff;
  .box,.box2,.box3{
    width: 9rem;
    height: 500px;
  }
}
</style>
