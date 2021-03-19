<template>
  <div>
    <div>
      creat组件
    </div>
    <!-- <button @click="onClick">点击</button> -->
    <div v-for="(item, i) in planlist" :key="i">
      <div>大家好，我是{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch, computed } from "vue";
import { useStore } from "vuex";
import * as type from "../store/action-type";
export default {
  name: "Create",
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      planlist: store.state.planlist, // store.state.planlist 是一个固定值 刚上来是[], 通过vuex改变的是store中的值，并不是state.planlist
    }); //  state.planlist是响应式，但是已经赋过初始值了，后边只有把通过vuex把planlist改变以后再赋值给state.planlist才能再页面上相应
    onMounted(() => {
      store.dispatch(type.SET_PLAN);
    });
    watch(
      () => store.state.planlist,
      (newValue) => {
        state.planlist = [...newValue];
      }
    );
    const onClick = () => {
      emit("handle", "我是子组件");
    };
    return {
      ...toRefs(state),
      // onClick,
    };
  },
};
</script>

<style scoped></style>
