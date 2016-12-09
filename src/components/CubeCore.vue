<template>
<div class="hello" @mousedown="handleMouseDown">
  <h1>{{ title }}</h1>
  <div class="button-group">
    <div class="button" @click="rotate('r', 1)">R</div>
    <div class="button" @click="rotate('r', -1)">R'</div>
    <div class="button" @click="rotate('u', -1)">U</div>
    <div class="button" @click="rotate('u', 1)">U'</div>
    <div class="button" @click="rotate('b', 1)">B'</div>
    <div class="button" @click="rotate('b', -1)">B</div>
    <div class="button" @click="rotate('f', -1)">F'</div>
    <div class="button" @click="rotate('f', 1)">F</div>
    <div class="button" @click="rotate('d', 1)">D</div>
    <div class="button" @click="rotate('d', -1)">D'</div>
    <div class="button" @click="rotate('l', 1)">L'</div>
    <div class="button" @click="rotate('l', -1)">L</div>
    <div class="button" @click="randomRotate(25,true)">随机打乱</div>
  </div>
  <div class="opacity-set">
    <label>透明度</label>
    <input @mousemove.stop="()=>{}" type="range" v-model="opacity" min="0" max="100">
  </div>
  <div class="cube" :style="'transform: rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)'">
    <Cube v-for="position in positions" :position="position" :ref="position[0]+'-'+position[1]+'-'+position[2]" :key="position[0]+'-'+position[1]+'-'+position[2]" :id="position[0]+'-'+position[1]+'-'+position[2]" :opacity="opacity/100"></Cube>
  </div>
</div>
</template>

<script>
import Cube from './Cube';

const positions = []
for (let x = 1; x < 4; x++) {
  for (let y = 1; y < 4; y++) {
    for (let z = 1; z < 4; z++) {
      positions.push([x, y, z])
    }
  }
}

function generateRandomRotateParams(last) {
  const param = {
    direction: '',
    clockwise: 0
  };

  const isReserve = (lhs, rhs) => {
    return lhs.direction === rhs.direction && lhs.clockwise + rhs.clockwise === 0
  }

  const directions = ['r', 'u', 'b', 'f', 'd', 'l'];
  param.direction = directions[Math.floor(Math.random() * 6)];
  const clockwises = [-1, 1];
  param.clockwise = clockwises[Math.floor(Math.random() * 2)];

  if (last !== undefined) {
    if (isReserve(param, last)) {
      return generateRandomRotateParams(last);
    }
  }

  return param;
}

export default {
  name: 'CubeCore',
  data() {
    return {
      title: 'Rubik Cube',
      rotateX: -35,
      rotateY: -45,
      rotateing: false,
      looping: false,
      opacity: 100,
      positions
    };
  },
  methods: {
    rotate(direction, clockwise, callback, isnotclick) {
      if (this.looping && !isnotclick) {
        return
      }
      if (this.rotateing) {
        return
      }
      let coordinate = '';
      let position = 0;
      switch (direction) {
        case 'r':
          coordinate = 'y';
          position = 3;
          break
        case 'u':
          coordinate = 'z';
          position = 3;
          break
        case 'l':
          coordinate = 'y';
          position = 1;
          break
        case 'd':
          coordinate = 'z';
          position = 1;
          break
        case 'f':
          coordinate = 'x';
          position = 3;
          break
        case 'b':
          coordinate = 'x';
          position = 1;
          break
        default:
          console.log('error direction')
      }
      this.rotateing = true;
      const list = this.$children.filter(item => item[coordinate] == position);
      list.forEach((item) => {
        Object.assign(item.colorCache, item.color);
        item.$el.style.transition = 'all .5s ease-in-out';
        if (coordinate == 'y') {
          item.rotateX += clockwise;
        } else if (coordinate == 'x') {
          item.rotateZ += clockwise;
        } else if (coordinate == 'z') {
          item.rotateY += clockwise;
        }
      })
      setTimeout(() => {
        list.forEach((item) => {
          item.$el.style.transition = 'none';
          if (coordinate == 'y') {
            item.rotateX = 0;
            if (clockwise == 1) {
              this.changeColor(this.$refs[`${this.transpose(item.z)}-${item.y}-${item.x}`][0], item, 'x', 'z', 'y')
            } else {
              this.changeColor(this.$refs[`${item.z}-${item.y}-${this.transpose(item.x)}`][0], item, 'z', 'x', 'y')
            }
          } else if (coordinate == 'x') {
            item.rotateZ = 0;
            if (clockwise == 1) {
              this.changeColor(this.$refs[`${item.x}-${item.z}-${this.transpose(item.y)}`][0], item, 'z', 'y', 'x')
            } else {
              this.changeColor(this.$refs[`${item.x}-${this.transpose(item.z)}-${item.y}`][0], item, 'y', 'z', 'x')
            }
          } else if (coordinate == 'z') {
            item.rotateY = 0;
            if (clockwise == 1) {
              this.changeColor(this.$refs[`${this.transpose(item.y)}-${item.x}-${item.z}`][0], item, 'x', 'y', 'z')
            } else {
              this.changeColor(this.$refs[`${item.y}-${this.transpose(item.x)}-${item.z}`][0], item, 'y', 'x', 'z')
            }
          }
        })
        this.rotateing = false;
        if (callback) {
          window.requestAnimationFrame(callback)
        }
      }, 500)
    },
    changeColor(c1, c2, d1, d2, d3) {
      c1.color = {
        [`${d1}1`]: c2.colorCache[`${d2}3`],
        [`${d1}3`]: c2.colorCache[`${d2}1`],
        [`${d2}3`]: c2.colorCache[`${d1}3`],
        [`${d2}1`]: c2.colorCache[`${d1}1`],
        [`${d3}1`]: c2.colorCache[`${d3}1`],
        [`${d3}3`]: c2.colorCache[`${d3}3`],
      }
    },
    transpose(x) {
      if (x == 1) {
        return 3
      } else if (x == 3) {
        return 1
      }
      return 2
    },
    handleMouseDown(e) {
      this.dragging = true;
      let firstX = e.clientX;
      let firstY = e.clientY;
      const handleMouseMove = (event) => {
        this.rotateY += (event.clientX - firstX) * 0.5;
        this.rotateX -= (event.clientY - firstY) * 0.5;
        firstX = event.clientX;
        firstY = event.clientY;
      };
      const handleMouseUp = () => {
        if (this.dragging) {
          this.dragging = false;
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },

    randomRotate(loopNum, isClick, lastParam) {
      if ((this.looping && isClick) || this.rotateing) {
        return
      }
      if (loopNum <= 0) {
        this.looping = false;
        return;
      }
      this.looping = true;
      const param = generateRandomRotateParams(lastParam);

      this.rotate(
        param.direction,
        param.clockwise,
        this.randomRotate.bind(this, loopNum - 1, false, param), true);
    },
  },
  components: {
    Cube,
  },
};
</script>

<style>
h1 {
  font-size: 30px;
  margin: 20px 0;
}

.button-group {
  height: 60px;
  line-height: 30px;
}

.button {
  padding: 0 20px;
  line-height: 21px;
  font-size: 14px;
  display: inline-block;
  margin: 0 10px 0 0;
  border: 1px solid #333;
  border-radius: 3px;
  cursor: pointer;
}

.cube {
  width: 180px;
  height: 180px;
  position: relative;
  margin: 100px auto;
  transform-style: preserve-3d;
  perspective: 10000000;
}

.opacity-set {
  font-size: 20px;
}
</style>
