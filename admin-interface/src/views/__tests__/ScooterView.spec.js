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

    // You can add more specific assertions based on your component's behavior
    expect(wrapper.find('h1').text()).toBe('Scooters');

    // For async operations, you may need to wait for Vue to update the DOM
    await wrapper.vm.$nextTick();

    // For example, you can test if the component fetches data and updates the DOM accordingly
    expect(wrapper.find('.database-table').exists()).toBe(true);
  });

// createTest('YourComponent', YourComponent, {
//   // Define a test case for zoomToScooter
//   'zoomToScooter method should set coordinates and zoom correctly': async () => {
//     // Mount the component
//     const vm = createVue({
//       template: '<your-component ref="component" />',
//     });

//     // Call the zoomToScooter method with a sample item
//     vm.$refs.component.zoomToScooter({ Location: '40.7128,-74.0060' });

//     // Assert that coordinates and zoom are set correctly
//     expect(vm.$refs.component.coordinates).toEqual(['40.7128', '-74.0060']);
//     expect(vm.$refs.component.zoom).toBe(20);
//   },
// });
});
