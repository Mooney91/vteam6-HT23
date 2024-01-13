import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TitleItem from '../TitleItem.vue';

describe('TitleItem', () => {
  it('renders properly', () => {
    const wrapper = mount(TitleItem);

    expect(wrapper.exists()).toBe(true);
  });
});