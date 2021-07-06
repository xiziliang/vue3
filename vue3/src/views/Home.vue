<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <D3/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import D3 from '../components/d3.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    D3
  }
}
</script>
