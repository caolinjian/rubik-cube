<template lang="html">
    <div class="box">
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
    </div>
</template>

<script>
import {
  initColor,
  restPosition
} from '../cube-color'

export default {
  props: ['position'],
  data() {
    return {
      dataPosition: this.position
    }
  },
  mounted() {
    initColor(this.$el, this.position)
  },
  watch: {
    dataPosition() {
      restPosition(this.$el, this.dataPosition)
    }
  }
}
</script>

<style scoped>
.box {
  position: absolute;
  width: 1em;
  height: 1em;
  bottom: 0;
  left: 0;
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  top: 0;
  left: 0;
  width: 1em;
  height: 1em;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, .1);
  line-height: 1em;
  text-align: center;
  transform: all 0.5s ease-in-out;
}

.face:nth-child(1) {
  transform: translateZ(.5em);
}

.face:nth-child(2) {
  transform: translateX(.5em) rotateY(90deg);
}

.face:nth-child(3) {
  transform: translateY(.5em) rotateX(90deg);
}

.face:nth-child(4) {
  transform: translateX(-.5em) rotateY(90deg);
}

.face:nth-child(5) {
  transform: translateY(-.5em) rotateX(90deg);
}

.face:nth-child(6) {
  transform: translateZ(-.5em);
}
</style>
