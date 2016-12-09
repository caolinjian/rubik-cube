<template lang="html">
    <div class="box" :style="styleObject">
        <div class="face" :style="{background:color.x3,opacity:opacity}"></div>
        <div class="face" :style="{background:color.y3,opacity:opacity}"></div>
        <div class="face" :style="{background:color.z1,opacity:opacity}"></div>
        <div class="face" :style="{background:color.y1,opacity:opacity}"></div>
        <div class="face" :style="{background:color.z3,opacity:opacity}"></div>
        <div class="face" :style="{background:color.x1,opacity:opacity}"></div>
    </div>
</template>

<script>
/*
 ** 设魔方初始状态为，最上方黄色面向人这边（前）为红色，左边为蓝色右边绿色对面（后）橙色，下面白色
 ** 每个面（face）的顺序是前，右，下，左，上，后
 ** 左边已后左下为[1,1,1]，前后为x轴,左右为y轴,上下z轴。例如：前左下是[3,1,1]，后右下[1,3,1]
 */
function myBrowser() {
  const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1;
  if (isOpera) {
    return 'Opera'
  } // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF';
  } // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  } // 判断是否Safari浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE';
  } // 判断是否IE浏览器
  return 'none'
}
export default {
  props: ['position', 'opacity'],
  data() {
    return {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      color: {
        x1: '',
        x3: '',
        y1: '',
        y3: '',
        z1: '',
        z3: '',
      },
      colorCache: {}
    }
  },
  mounted() {
    this.x = this.position[0];
    this.y = this.position[1];
    this.z = this.position[2];
    if (this.position[1] == 1) {
      this.color.y1 = '#0500c1'
    } else if (this.position[1] == 3) {
      this.color.y3 = '#138804'
    }
    if (this.position[2] == 1) {
      this.color.z1 = '#f7f8f5'
    } else if (this.position[2] == 3) {
      this.color.z3 = '#f9fd0c'
    }
    if (this.position[0] == 1) {
      this.color.x1 = '#f9640a'
    } else if (this.position[0] == 3) {
      this.color.x3 = '#c50209'
    }
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
      const mb = myBrowser();
      if (this.position[0] == 1) {
        if (mb == 'Safari') {
          transform += ' translateZ(0em)'
        } else {
          transform += ' translateZ(-1.1em)'
        }
        transformOrigin += ' 1.1em'
      } else if (this.position[0] == 3) {
        if (mb == 'Safari') {
          transform += ' translateZ(0em)'
        } else {
          transform += ' translateZ(1.1em)'
        }
        transformOrigin += ' -1.1em'
      } else if (this.position[0] == 2) {
        transform += ' translateZ(-0em)'
        transformOrigin += ' 0em'
      }
      transform += ` rotateX(${this.rotateX * 90}deg) rotateY(${this.rotateY * 90}deg) rotateZ(${this.rotateZ * 90}deg)`
      return {
        transform,
        transformOrigin,
      }
    }
  },
}
</script>

<style>
.box {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 60px;
  left: 60px;
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  border-radius: 3.14px;
  top: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, .1);
  line-height: 1rem;
  background: rgba(158,158,158,.5);
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
