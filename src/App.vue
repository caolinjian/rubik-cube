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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
