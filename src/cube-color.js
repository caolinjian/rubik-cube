/* eslint no-param-reassign: 0*/

/*
 ** 设魔方初始状态为，最上方黄色面向人这边（前）为红色，左边为蓝色右边绿色对面（后）橙色，下面白色
 ** 每个面（face）的顺序是前，右，下，左，上，后
 ** 左边已后左下为[1,1,1]，前后为x轴,左右为y轴,上下z轴。例如：前左下是[3,1,1]，后右下[1,3,1]
 */

export const initColor = function(el, position) {
  const faces = el.querySelectorAll('.face');
  if (position[0] == 1) {
    faces[5].style.background = 'orange'
  } else if (position[0] == 3) {
    faces[0].style.background = 'red'
    el.style.transform = 'translateZ(2em)'
  } else if (position[0] == 2) {
    el.style.transform = 'translateZ(1em)'
  }
  if (position[1] == 1) {
    faces[3].style.background = 'blue'
  } else if (position[1] == 3) {
    faces[1].style.background = 'green'
    el.style.left = '2em'
  } else if (position[1] == 2) {
    el.style.left = '1em'
  }
  if (position[2] == 1) {
    faces[2].style.background = 'white'
  } else if (position[2] == 3) {
    faces[4].style.background = 'yellow'
    el.style.bottom = '2em'
  } else if (position[2] == 2) {
    el.style.bottom = '1em'
  }
}

export const restPosition = function(el, position) {
  if (position[0] == 3) {
    el.style.transform = 'translateZ(2em)'
  } else if (position[0] == 2) {
    el.style.transform = 'translateZ(1em)'
  }
  if (position[1] == 3) {
    el.style.left = '2em'
  } else if (position[1] == 2) {
    el.style.left = '1em'
  }
  if (position[2] == 3) {
    el.style.bottom = '2em'
  } else if (position[2] == 2) {
    el.style.bottom = '1em'
  }
}
