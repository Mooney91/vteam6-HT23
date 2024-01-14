import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import ScooterView from '../ScooterView.vue';

describe('ScooterView', () => {
  it('renders properly', async () => {
    const wrapper = mount(ScooterView, {
      props: {
        backend: 'http://localhost:1337',
      },
    });

    expect(wrapper.find('h1').text()).toBe('Scooters');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.database-table').exists()).toBe(true);
  });
});
