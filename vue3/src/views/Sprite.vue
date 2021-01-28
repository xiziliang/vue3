<template>
  <div class="Sprite">
    sprite {{ val }}
    <!-- <div v-lazyimg:xxx="require('../assets/img/success.png')">
      <img src="">
    </div>-->
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted,onUnmounted, onErrorCaptured } from "vue";
import { Observable, timer } from 'rxjs'
import { option } from '../utils/echartsOption.js'
import GlRenderer from "gl-renderer";
export default {
  name: "Sprite",
  setup(prop, ctx) {
    const val = ref(0);
    const time$ = timer(0,2000).subscribe((res)=>{
      if(val.value === 5){
        alert('午时已到!')
        time$.unsubscribe();
      }
      console.log(val.value++)
    })
    onUnmounted(()=>{
      time$.unsubscribe();
    })
    return {
      val,
      time$
    }
  },
};
</script>
<style scoped>
.Sprite {
  padding-top: 100vh;
}
img {
  width: 500px;
  height: 400px;
}
#demo {
  width: 100%;
  height: 500px;
}
</style>
