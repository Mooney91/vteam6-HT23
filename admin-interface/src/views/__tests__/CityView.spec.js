import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CityView from '../CityView.vue'

describe('CityView', () => {
  it('renders properly', async () => {
    const wrapper = mount(CityView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337'
      }
    })

    expect(wrapper.find('h1').text()).toBe('Cities')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.database-table').exists()).toBe(true)
  })
})
