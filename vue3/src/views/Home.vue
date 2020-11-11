<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld />
    <Plan></Plan>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Plan from '../components/Plan'
export default {
    name: 'Home',
    components: {
        HelloWorld,
        Plan
    }
}
</script>
