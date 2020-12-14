<template>
  <div>
    <Create @handle="handleClick"></Create>
  </div>
</template>

<script>
import Create from "./Create";
export default {
  components: {
    Create,
  },
  setup(props) {
    const handleClick = (data) => {
      console.log("接收到子组件数据:", data);
    };
    return {
      handleClick,
    };
  },
};
</script>

<style scoped></style>
