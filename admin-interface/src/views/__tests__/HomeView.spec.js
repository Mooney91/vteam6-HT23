import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('renders properly', async () => {
    const wrapper = mount(HomeView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337'
      }
    })

    expect(wrapper.find('h1').text()).toBe('Welcome!')

    await wrapper.vm.$nextTick()
  })
})
