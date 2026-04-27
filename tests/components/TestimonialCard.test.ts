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

  it('renders image with correct src and alt when image prop is provided', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme', person: 'Jane', quote: 'Good', image: '/logo.jpg' },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/logo.jpg')
    expect(img.attributes('alt')).toBe('Acme')
  })

  it('renders placeholder div and no img when image prop is omitted', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme', person: 'Jane', quote: 'Good' },
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('[data-testid="image-placeholder"]').exists()).toBe(true)
  })

  it('renders without person when person prop is omitted (case study)', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme Corp', description: 'A short paragraph about how Acme uses the platform.' },
    })
    expect(wrapper.text()).toContain('Acme Corp')
    expect(wrapper.text()).toContain('A short paragraph')
  })

  it('renders both quote and description when both are provided (combined use)', () => {
    const wrapper = mount(TestimonialCard, {
      props: {
        org: 'Acme',
        person: 'Jane',
        quote: 'Great tool.',
        description: 'Additional context about the deployment.',
      },
    })
    expect(wrapper.text()).toContain('Great tool.')
    expect(wrapper.text()).toContain('Additional context about the deployment.')
  })
})
