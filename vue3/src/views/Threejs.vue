<template>
  <div id="Threejs">
    threejs
    <!-- <div v-lazyimg:xxx="require('../assets/img/success.png')">
      <img src="">
    </div>-->
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted, onUnmounted, onErrorCaptured } from "vue";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// 初始化 threejs 3D 模型
function initThreejs(params) {
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xbfe3dd);
  // scene.add(new THREE.AmbientLight(0x999999)); // 环境光
  // const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
  // camera.position.set(5, 2, 8);
  // debugger
  const loader = new GLTFLoader().setPath('assets/3Dmodule/');
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('assets/js/draco/gltf/');
  loader.setDRACOLoader(dracoLoader);
  loader.load('LittlestTokyo.glb', (gltf) => {
    const model = gltf.scene;
    scene.add( model );
    // model.position.set(1, 1, 0);
    // model.scale.set(0.01, 0.01, 0.01);
    // model.traverse((child) => {
    //   if (child.isMesh) child.material.envMap = envMap;
    // });
  }, undefined, (error) => {
    console.error(error);
  });
}
function animate() {
  console.log(1)
}
export default {
  name: "Threejs",
  setup(prop, ctx) {
    const data = ref(1);
    onMounted(() => {
      initThreejs(data);
    })
    return {
      data,
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
