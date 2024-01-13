import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import ParkingView from '../ParkingView.vue';

describe('ParkingView', () => {
  it('renders properly', async () => {
    const wrapper = mount(ParkingView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337',
      },
    });

    expect(wrapper.find('h1').text()).toBe('Parking Stations');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.database-table').exists()).toBe(true);
  });
});
