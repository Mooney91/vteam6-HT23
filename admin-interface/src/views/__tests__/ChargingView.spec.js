import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChargingView from '../ChargingView.vue'

describe('ChargingView', () => {
  it('renders properly', async () => {
    const wrapper = mount(ChargingView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337'
      }
    })

    expect(wrapper.find('h1').text()).toBe('Charging Stations')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.database-table').exists()).toBe(true)
  })
})
