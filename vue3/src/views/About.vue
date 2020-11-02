<template>
  <div>
    <div>{{ name }}</div>
    <div>{{ name2 }}</div>
    <button @click="change">点击</button>
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs, watch } from "vue";
export default {
  setup(props, context) {
    let name = ref("小明");
    let state = reactive({
      name2: "徐建",
    });
    watch(name, (newValue, oldValue) => {
      console.log(newValue, oldValue);
      console.log("变化了");
    });
    watch(
      state,
      (newValue, oldValue) => {
        console.log(newValue, oldValue);
      },
      {
        immediate: true,
      }
    );
    const change = () => {
      if (name.value === "小明") {
        name.value = "小红";
      } else {
        name.value = "小明";
      }
    };

    return {
      ...toRefs(state),
      change,
      name,
    };
  },
};
</script>

<style scoped>
</style>
