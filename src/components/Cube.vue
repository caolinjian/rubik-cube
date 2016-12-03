<template lang="html">
    <div class="box" :style="styleObject">
        <div class="face">{{''+x+y+z}}</div>
        <div class="face">{{''+x+y+z}}</div>
        <div class="face">{{''+x+y+z}}</div>
        <div class="face">{{''+x+y+z}}</div>
        <div class="face">{{''+x+y+z}}</div>
        <div class="face">{{''+x+y+z}}</div>
    </div>
</template>

<script>
/*
 ** 设魔方初始状态为，最上方黄色面向人这边（前）为红色，左边为蓝色右边绿色对面（后）橙色，下面白色
 ** 每个面（face）的顺序是前，右，下，左，上，后
 ** 左边已后左下为[1,1,1]，前后为x轴,左右为y轴,上下z轴。例如：前左下是[3,1,1]，后右下[1,3,1]
 */
export default {
  props: ['position'],
  data() {
    return {
      dataPosition: this.position,
      x: 0,
      y: 0,
      z: 0,
      styleObject: {
        transform: '',
        transformOrigin: ''
      },
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    }
  },
  mounted() {
    this.x = this.position[0];
    this.y = this.position[1];
    this.z = this.position[2];
    this.initColor();
  },
  computed: {
    styleObject() {
      let transform = '';
      let transformOrigin = '';
      if (this.position[1] == 1) {
        transform = 'translateX(-1.1em)'
        transformOrigin = '1.6em'
      } else if (this.position[1] == 3) {
        transform = 'translateX(1.1em)'
        transformOrigin = '-.6em'
      } else if (this.position[1] == 2) {
        transform = 'translateX(-0em)'
        transformOrigin = '0.5em'
      }
      if (this.position[2] == 1) {
        transform += ' translateY(1.1em)'
        transformOrigin += ' -0.6em'
      } else if (this.position[2] == 3) {
        transform += ' translateY(-1.1em)'
        transformOrigin += ' 1.6em'
      } else if (this.position[2] == 2) {
        transform += ' translateY(-0em)'
        transformOrigin += ' 0.5em'
      }
      if (this.position[0] == 1) {
        transform += ' translateZ(-1.1em)'
        transformOrigin += ' 1.1em'
      } else if (this.position[0] == 3) {
        transform += ' translateZ(1.1em)'
        transformOrigin += ' -1.1em'
      } else if (this.position[0] == 2) {
        transform += ' translateZ(-0em)'
        transformOrigin += ' 0em'
      }
      transform += ` rotateX(${this.rotateX * 90}deg) rotateY(${this.rotateY * 90}deg) rotateZ(${this.rotateZ * 90}deg)`
      return {
        transform,
        transformOrigin
      }
    }
  },
  methods: {
    initColor() {
      const faces = this.$el.querySelectorAll('.face');
      if (this.position[1] == 1) {
        faces[3].style.background = 'blue'
      } else if (this.position[1] == 3) {
        faces[1].style.background = 'green'
      }
      if (this.position[2] == 1) {
        faces[2].style.background = 'white'
      } else if (this.position[2] == 3) {
        faces[4].style.background = 'yellow'
      }
      if (this.position[0] == 1) {
        faces[5].style.background = 'orange'
      } else if (this.position[0] == 3) {
        faces[0].style.background = 'red'
      }
    },
  },
  watch: {
    dataPosition(val) {
      this.x = val[0];
      this.y = val[1];
      this.z = val[2];
    }
  }
}
</script>

<style scoped>
.box {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 60px;
  left: 60px;
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
}

.face {
  position: absolute;
  top: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, .1);
  line-height: 1rem;
  background: grey;
  font-size: 20px;
  text-align: center;
}

.face:nth-child(1) {
  transform: translateZ(.5rem);
}

.face:nth-child(2) {
  transform: translateX(.5rem) rotateY(90deg);
}

.face:nth-child(3) {
  transform: translateY(.5rem) rotateX(90deg);
}

.face:nth-child(4) {
  transform: translateX(-.5rem) rotateY(90deg);
}

.face:nth-child(5) {
  transform: translateY(-.5rem) rotateX(90deg);
}

.face:nth-child(6) {
  transform: translateZ(-.5rem);
}
</style>
