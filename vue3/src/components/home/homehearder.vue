<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item
        :modelValue="curruntState"
        :options="options"
        @change="changes"
      />
    </van-dropdown-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { Select_Types } from "../../type";
function initData({ emit }) {
  const data = reactive({
    options: [
      { text: "全部", value: Select_Types.ALL },
      { text: "react", value: Select_Types.REACT },
      { text: "vue", value: Select_Types.VUE },
      { text: "canvas", value: Select_Types.CANVAS },
      { text: "D3", value: Select_Types.D3 },
    ],
  });
  const changes = (value: Select_Types) => {
    emit("changeState", value);
  };
  return {
    changes,
    data,
  };
}
export default defineComponent({
  name: "header",
  props: {
    curruntState: {
      type: Number as PropType<Select_Types>,
    },
  },
  emits: ["changeState"],
  setup(props, context) {
    const { changes, data } = initData(context);
    return {
      changes,
      ...toRefs(data),
    };
  },
});
</script>
<style scoped></style>
