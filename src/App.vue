<template>
  <div id="app">
    <CubeCore></CubeCore>
  </div>
</template>

<script>
import CubeCore from './components/CubeCore';

export default {
  name: 'app',
  components: {
    CubeCore,
  },
};
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 60px;
    user-select:none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
