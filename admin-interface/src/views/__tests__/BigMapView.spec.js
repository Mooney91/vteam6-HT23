import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import BigMapView from '../BigMapView.vue';

describe('BigMapView', () => {
  it('renders properly', async () => {
    const wrapper = mount(BigMapView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337',
      },
    });

    // You can add more specific assertions based on your component's behavior
    expect(wrapper.find('p').text()).toBe('Charging Station Parking Scooter');

    // For async operations, you may need to wait for Vue to update the DOM
    await wrapper.vm.$nextTick();

    // For example, you can test if the component fetches data and updates the DOM accordingly
    // expect(wrapper.find('.database-table').exists()).toBe(true);
  });

  // Add more test cases as needed
});
