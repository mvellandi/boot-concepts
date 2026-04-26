import { mount } from '@vue/test-utils'
import TestimonialCard from '~/components/TestimonialCard.vue'

describe('TestimonialCard', () => {
  it('renders org, person, and quote', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme Corp', person: 'Jane Doe', quote: 'Great product!' },
    })
    expect(wrapper.text()).toContain('Acme Corp')
    expect(wrapper.text()).toContain('Jane Doe')
    expect(wrapper.text()).toContain('Great product!')
  })

  it('renders avatar img with correct src and alt when avatar prop is provided', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme', person: 'Jane', quote: 'Good', avatar: '/avatar.jpg' },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/avatar.jpg')
    expect(img.attributes('alt')).toBe('Acme')
  })

  it('renders placeholder div and no img when avatar prop is omitted', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme', person: 'Jane', quote: 'Good' },
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('[data-testid="avatar-placeholder"]').exists()).toBe(true)
  })
})
