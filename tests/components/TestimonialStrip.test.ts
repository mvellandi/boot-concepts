import { mount } from '@vue/test-utils'
import TestimonialStrip from '~/components/TestimonialStrip.vue'

describe('TestimonialStrip', () => {
  it('renders slotted content inside the scroll track', () => {
    const wrapper = mount(TestimonialStrip, {
      slots: { default: '<div class="test-card">Card content</div>' },
    })
    expect(wrapper.find('.test-card').exists()).toBe(true)
    expect(wrapper.find('.test-card').text()).toBe('Card content')
  })

  it('renders a Previous and a Next button', () => {
    const wrapper = mount(TestimonialStrip, {
      slots: { default: '<div>Card</div>' },
    })
    expect(wrapper.find('[aria-label="Previous"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Next"]').exists()).toBe(true)
  })
})
