<template>
<div ref="root">{{abc}}</div>
</template>

<script>
import {
  ref,
  onMounted
} from 'vue'
export default {
  setup(props, context) {
    const root = ref();
    console.log(context)
    onMounted(() => {
      console.log(root);
    })
    return {
      root,
      abc: ref('今晚打老虎')
    }
  }
}
</script>

<style scoped>

</style>
