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
function initThreejs() {
  // const clock = new THREE.Clock();
  // const container = document.getElementById('Threejs');

  // const stats = new Stats();
  // container.appendChild(stats.dom);

  // const renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfe3dd);
  scene.add(new THREE.AmbientLight(0x999999)) // 环境光
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.set(5, 2, 8);
// debugger
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/assets/js/draco/gltf/');
  loader.setDRACOLoader(dracoLoader);
  loader.load('assets/3Dmodule/3-d.gltf', (gltf) => {
    console.log(gltf)
    scene.add(gltf.scene);
  }, undefined, (error) => {
    console.error(error);
  });

}
export default {
  name: "Threejs",
  setup(prop, ctx) {
    onMounted(() => {
      initThreejs();
    })
    return {
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
