import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BigMapView from '../BigMapView.vue'

describe('BigMapView', () => {
  it('renders properly', async () => {
    const wrapper = mount(BigMapView, {
      props: {
        id: 'some-id',
        backend: 'http://localhost:1337'
      }
    })

    expect(wrapper.find('p').text()).toBe('Charging Station Parking Scooter')

    await wrapper.vm.$nextTick()
  })
})
