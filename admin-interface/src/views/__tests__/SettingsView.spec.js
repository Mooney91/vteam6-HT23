import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import SettingsView from '../SettingsView.vue';

describe('SettingsView', () => {
  it('renders properly', async () => {
    const wrapper = mount(SettingsView, {
      props: {
        backend: 'http://localhost:1337',
      },
    });

    expect(wrapper.find('h1').text()).toBe('Settings');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.database-table').exists()).toBe(true);
  });
});