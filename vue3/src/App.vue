<template>
  <div id="nav">
    <router-view />
  </div>
</template>
<script>
//当 router-view 的组件含有 async setup 时，会渲染 fallback 内容
// <Suspense>
//   <template #default>
//     <router-view />
//   </template>
//   <template #fallback>
//     <span>I'm a loading screen, I'm waiting the view to be ready!</span>
//   </template>
// </Suspense>
export default {

}
</script>
<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #ebebeb;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#nav {
  height: 100%;
  background: linear-gradient(180deg, #7ca8ff, #5e9eff);
}
</style>
