<template>
      <div>{{ data }}</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: "Suspense",
  props: {
    name
  },
  async setup(props) {
    let data = ref(null);
    const getData = () => {
        return new Promise((reslove,reject)=>{
          setTimeout(()=>{
            reslove('Suspense 你好');
            // reject('报错了')
          },3000)
        })
    }
    data.value = await getData();
    console.log(data)
    return {
      data,
      getData
    }
  },
};
</script>

<style scoped>
</style>
