<template>
  <div id="CanvasHome" class="CanvasHome">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld :msg="msg" msg2="周老师" />
    <!-- <Plan></Plan> -->
    <Canvas></Canvas>
    <!-- <Canvas></Canvas> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Plan from "../components/Plan";
import Canvas from "../components/Canvas";
import { ref, computed } from "vue";
export default {
  name: "CanvasHome",
  components: {
    HelloWorld,
    Plan,
    Canvas,
  },
  setup(props) {
    const msg = ref("你好");
    return {
      msg,
    };
  },
};
</script>
