import Vue from 'vue';
import CubeCore from 'src/components/CubeCore';

describe('CubeCore.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(CubeCore),
    });
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Rubik Cube');
  });
});
