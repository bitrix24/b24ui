import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Timeline from '../../src/runtime/components/Timeline.vue'
import type { TimelineProps, TimelineSlots } from '../../src/runtime/components/Timeline.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/timeline'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Timeline', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const items = [{
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: SignIcon,
    value: 'kickoff'
  }, {
    date: 'Mar 22, 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing',
    icon: Cross30Icon,
    value: 'design'
  }, {
    slot: 'custom',
    date: 'Mar 29, 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: SignIcon,
    value: 'development'
  }, {
    date: 'Apr 5, 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: Cross30Icon,
    value: 'testing-and-deployment'
  }]

  const props = { items }

  it.each([
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: 'design' } }],
    ['with defaultValue', { props: { ...props, defaultValue: 'design' } }],
    ['with valueKey', { props: { ...props, valueKey: 'title', defaultValue: 'Design Phase' } }],
    ['with air-primary color', { props: { ...props, color: 'air-primary' } }],
    ...sizes.map((size: string) => [`with size ${size} horizontal`, { props: { ...props, size } }]),
    ...sizes.map((size: string) => [`with size ${size} vertical`, { props: { ...props, size, orientation: 'vertical' } }]),
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'gap-8' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'font-bold' } } }],
    ['with reverse', { props: { ...props, reverse: true } }],
    ['with reverse and modelValue', { props: { ...props, reverse: true, modelValue: 'design' } }],
    ['with reverse and defaultValue', { props: { ...props, reverse: true, defaultValue: 'design' } }],
    // Slots
    ['with indicator slot', { props, slots: { indicator: () => 'Indicator slot' } }],
    ['with wrapper slot', { props, slots: { wrapper: () => 'Wrapper slot' } }],
    ['with date slot', { props, slots: { date: () => 'Date slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with custom-wrapper slot', { props, slots: { 'custom-wrapper': () => 'Custom wrapper slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TimelineProps, slots?: Partial<TimelineSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Timeline)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Timeline, {
      props: {
        items,
        modelValue: 'design'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
