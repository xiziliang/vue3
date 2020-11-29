<template>
  <div>
    <div>{{ name }}</div>
    <div>{{ name2 }}</div>
    <button @click="change">点击</button>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  reactive,
  toRefs,
  watch,
  getCurrentInstance,
  isProxy,
  isRef,
} from "vue";
export default {
  setup(props, context) {
    const instance = getCurrentInstance(); // === this
    const name = ref("小明");
    const state = reactive({
      name2: 123,
    });
    // watch ref 直接写值 不用写函数
    watch(name, (newValue, oldValue) => {
      console.log(newValue, oldValue);
      console.log("变化了");
    });
    console.log("isProxy", isProxy(state));
    // watch监听 proxy对象要用函数  箭头函数不用加{}
    watch(
      () => {
        return state.name2;
      },
      (newValue, oldValue) => {
        console.log(newValue, oldValue);
      },
      {
        immediate: true,
      }
    );
    const change = () => {
      state.name2++;
      if (name.value === "小明") {
        name.value = "小红";
      } else {
        name.value = "小明";
      }
    };
    console.log(context);

    return {
      ...toRefs(state),
      change,
      name,
    };
  },
};
</script>

<style scoped></style>
