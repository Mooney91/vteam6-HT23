import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RentalView from '../RentalView.vue'

describe('RentalView', () => {
  it('renders properly', async () => {
    const wrapper = mount(RentalView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337'
      }
    })

    expect(wrapper.find('h1').text()).toBe('Rental Logs')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.database-table').exists()).toBe(true)
  })
})
