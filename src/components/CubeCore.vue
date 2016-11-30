<template>
<div class="hello">
  <h1>{{ title }}</h1>
  <button type="button" name="button" @click="clockR">R</button>
  <div class="cube">
    <Cube v-for="position in positions" :position="position" :ref="position[0]+'-'+position[1]+'-'+position[2]" :key="position[0]+'-'+position[1]+'-'+position[2]"></Cube>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import Cube from './Cube';


const positions = []
for (let x = 1; x < 4; x++) {
  for (let y = 1; y < 4; y++) {
    for (let z = 1; z < 4; z++) {
      positions.push([x, y, z])
    }
  }
}

export default {
  name: 'CubeCore',
  data() {
    return {
      title: 'Rubik Cube',
      positions
    };
  },
  methods: {
    clockR() {
      console.log('---line---', this.$refs['1-1-1'][0]);
      this.positions = _.shuffle(this.positions)
    },
  },
  components: {
    Cube,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cube {
  font-size: 60px;
  width: 180px;
  height: 180px;
  position: relative;
  left: -20px;
  margin: 40px auto;
  transform-style: preserve-3d;
  transform: rotateX(-35deg) rotateY(-45deg) translateX(90px);
}
</style>
