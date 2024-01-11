import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import HomeView from '../HomeView.vue';

describe('HomeView', () => {
  it('renders properly', async () => {
    const wrapper = mount(HomeView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337',
      },
    });

    // You can add more specific assertions based on your component's behavior
    expect(wrapper.find('h1').text()).toBe('Welcome!');

    // For async operations, you may need to wait for Vue to update the DOM
    await wrapper.vm.$nextTick();
  });

  // Add more test cases as needed
});
