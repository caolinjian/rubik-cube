<template>
<div class="hello" @mousedown="handleMouseDown">
  <h1>{{ title }}</h1>
  <button type="button" name="button" @click="rotate('r',1)">R</button>
  <button type="button" name="button" @click="rotate('r',-1)">R'</button>
  <button type="button" name="button" @click="rotate('u',-1)">U</button>
  <button type="button" name="button" @click="rotate('u',1)">U'</button>
  <button type="button" name="button" @click="rotate('b',1)">B'</button>
  <button type="button" name="button" @click="rotate('f',-1)">F'</button>
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
      positions
    };
  },
  methods: {
    rotate(direction, clockwise) {
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
      this.$children.filter(item => item[coordinate] == position).forEach((item) => {
        if (coordinate == 'y') {
          item.rotateX += clockwise;
          setTimeout(() => {
            if (clockwise == 1) {
              item.dataPosition = [this.transpose(item.z), position, item.x]
            } else {
              item.dataPosition = [item.z, position, this.transpose(item.x)]
            }
          }, 500)
        } else if (coordinate == 'x') {
          item.rotateZ += clockwise;
          setTimeout(() => {
            if (clockwise == 1) {
              item.dataPosition = [position, item.z, this.transpose(item.y)]
            } else {
              item.dataPosition = [position, this.transpose(item.z), item.y]
            }
          }, 500)
        } else if (coordinate == 'z') {
          item.rotateY += clockwise;
          setTimeout(() => {
            if (clockwise == 1) {
              item.dataPosition = [this.transpose(item.y), item.x, position]
            } else {
              item.dataPosition = [item.y, this.transpose(item.x), position]
            }
          }, 500)
        }
      })
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
