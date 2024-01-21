import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserView from '../UserView.vue'

describe('UserView', () => {
  it('renders properly', async () => {
    const wrapper = mount(UserView, {
      props: {
        backend: 'http://localhost:1337'
      }
    })

    expect(wrapper.find('h1').text()).toBe('Users')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.database-table').exists()).toBe(true)
  })
})
