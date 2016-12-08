<template>
<div class="hello" @mousedown="handleMouseDown">
  <h1>{{ title }}</h1>
  <button type="button" name="button" @click="rotate('r', 1, 500)">R</button>
  <button type="button" name="button" @click="rotate('r', -1, 500)">R'</button>
  <button type="button" name="button" @click="rotate('u', -1, 500)">U</button>
  <button type="button" name="button" @click="rotate('u', 1, 500)">U'</button>
  <button type="button" name="button" @click="rotate('b', 1, 500)">B'</button>
  <button type="button" name="button" @click="rotate('b', -1, 500)">B</button>
  <button type="button" name="button" @click="rotate('f', -1, 500)">F'</button>
  <button type="button" name="button" @click="rotate('f', 1, 500)">F</button>
  <button type="button" name="button" @click="rotate('d', 1, 500)">D</button>
  <button type="button" name="button" @click="rotate('d', -1, 500)">D'</button>
  <button type="button" name="button" @click="rotate('l', 1, 500)">L'</button>
  <button type="button" name="button" @click="rotate('l', -1, 500)">L</button>
  <button type="button" name="button" @click="test">test打乱</button>
  <button type="button" name="button" @click="randomRotate(25,true)">随机打乱</button>
  <div class="cube" :style="'transform: rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)'">
    <Cube v-for="position in positions" :position="position" :ref="position[0]+'-'+position[1]+'-'+position[2]" :key="position[0]+'-'+position[1]+'-'+position[2]"></Cube>
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

function generateRandomRotateParams() {
  const param = {
    direction: '',
    clockwise: 0
  };
  const directions = ['r', 'u', 'b', 'f', 'd', 'l'];
  param.direction = directions[Math.floor(Math.random() * 6)];
  const clockwises = [-1, 1];
  param.clockwise = clockwises[Math.floor(Math.random() * 2)];
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
      positions
    };
  },
  methods: {
    rotate(direction, clockwise, timeout, callback) {
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
        item.$el.style.transition = 'all 0.5s ease-in-out';
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
          this.$nextTick(() => {
            callback();
          })
        }
      }, timeout)
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
      document.onselectstart = function() {
        return false;
      };
      document.ondragstart = function() {
        return false;
      };

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
        document.onselectstart = null;
        document.ondragstart = null;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    randomRotate(loopNum, isClick) {
      if (this.looping && isClick) {
        return
      }
      if (loopNum <= 0) {
        this.looping = false;
        return;
      }
      this.looping = true;
      const param = generateRandomRotateParams();
      this.rotate(
        param.direction,
        param.clockwise,
        500,
        () => {
          this.randomRotate(loopNum - 1, false)
        });
    },
    test() {
      this.rotate(
        'r', 1,
        500,
        () => {
          this.rotate(
            'u', 1,
            500);
        });
    }
  },
  components: {
    Cube,
  },
};
</script>

<style>
h1 {
  font-size: 30px;
}

.cube {
  width: 180px;
  height: 180px;
  position: relative;
  margin: 120px auto;
  transform-style: preserve-3d;
  -webkit-perspective: 10000000;
}
</style>
