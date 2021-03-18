<template>
  <div id="Threejs">
    <!-- <div v-lazyimg:xxx="require('../assets/img/success.png')">
      <img src="">
    </div>-->
    <!-- <div class="container" @click="handle1(event)">
      <div class="content1" @click="handle2(event)">
        <button class="content2" @click="handle3(event)"></button>
      </div>
    </div> -->
    123
  </div>
  <div class="xx">456</div>
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
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/assets/js/draco/');
  loader.setDRACOLoader(dracoLoader);
  loader.load('/assets/3Dmodule/3-d.gltf', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
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
    const handle1 = (e) =>{
      console.log('container')
    }
    const handle2 = (e) =>{
      console.log('content1')
    }
    const handle3 = (e) =>{
      console.log('content2')
    }
    onMounted(() => {
      // initThreejs(data);
    })
    return {
      data,
      handle1,
      handle2,
      handle3,
    }
  },
};
</script>
<style scoped lang="less">
// .Sprite {
//   padding-top: 100vh;
// }
// img {
//   width: 500px;
//   height: 400px;
// }
// #demo {
//   width: 100%;
//   height: 500px;
// }
.container {
  width: 500px;
  height: 500px;
  background-color: #ccc;
  .content1 {
    width: 300px;
    height: 300px;
    background-color: red;
    .content2 {
      width: 200px;
      height: 200px;
      background-color: skyblue;
    }
  }
}
</style>
