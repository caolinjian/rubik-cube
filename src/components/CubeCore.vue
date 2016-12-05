<template>
<div class="hello" @mousedown="handleMouseDown">
  <h1>{{ title }}</h1>
  <button type="button" name="button" @click="rotate('r',1)">R</button>
  <button type="button" name="button" @click="rotate('r',-1)">R'</button>
  <button type="button" name="button" @click="rotate('u',-1)">U</button>
  <button type="button" name="button" @click="rotate('u',1)">U'</button>
  <button type="button" name="button" @click="rotate('b',1)">B'</button>
  <button type="button" name="button" @click="rotate('b',-1)">B</button>
  <button type="button" name="button" @click="rotate('f',-1)">F'</button>
  <button type="button" name="button" @click="rotate('f',1)">F</button>
  <button type="button" name="button" @click="rotate('d',1)">D</button>
  <button type="button" name="button" @click="rotate('d',-1)">D'</button>
  <button type="button" name="button" @click="rotate('l',1)">L'</button>
  <button type="button" name="button" @click="rotate('l',-1)">L</button>
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

export default {
  name: 'CubeCore',
  data() {
    return {
      title: 'Rubik Cube',
      rotateX: -35,
      rotateY: -45,
      rotateing: false,
      positions
    };
  },
  methods: {
    rotate(direction, clockwise) {
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
      }, 500)
    },
    changeColor(c1, c2, d1, d2, d3) {
      c1.color[`${d1}1`] = c2.colorCache[`${d2}3`];
      c1.color[`${d1}3`] = c2.colorCache[`${d2}1`];
      c1.color[`${d2}3`] = c2.colorCache[`${d1}3`];
      c1.color[`${d2}1`] = c2.colorCache[`${d1}1`];
      c1.color[`${d3}1`] = c2.colorCache[`${d3}1`];
      c1.color[`${d3}3`] = c2.colorCache[`${d3}3`];
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
      const firstX = e.clientX;
      const firstY = e.clientY;
      document.onselectstart = function() {
        return false;
      };
      document.ondragstart = function() {
        return false;
      };

      const handleMouseMove = (event) => {
        this.rotateY += (event.clientX - firstX) * 0.02;
        this.rotateX -= (event.clientY - firstY) * 0.02;
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
}
</style>
