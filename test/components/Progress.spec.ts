import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Progress from '../../src/runtime/components/Progress.vue'
import theme from '#build/b24ui/progress'

describe('Progress', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const orientations = Object.keys(theme.variants.orientation) as any
  const animations = Object.keys(theme.variants.animation) as any
  const max = ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']

  renderEach(Progress, [
    // Props
    ['with modelValue', { props: { modelValue: 50 } }],
    ['with status', { props: { modelValue: 50, status: true } }],
    ['with status inverted', { props: { modelValue: 50, status: true, inverted: true } }],
    // `--percent` falls back to `fit-content` at zero — a b24ui-only branch
    // upstream does not have, and one no other case reaches.
    ['with status at zero', { props: { modelValue: 0, status: true } }],
    ['with max', { props: { modelValue: 2, status: true, max } }],
    ['with max inverted', { props: { modelValue: 2, status: true, inverted: true, max } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { orientation } }]),
    ...animations.map((animation: string) => [`with animation ${animation}`, { props: { animation } }]),
    ['with color success', { props: { color: 'air-primary-success', modelValue: 50 } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'w-48' } }],
    ['with b24ui', { props: { b24ui: { base: 'bg-red-200' } } }],
    // Slots
    // `status` and a `modelValue`, without which the slot never renders
    // (#454). Inherited from upstream's spec, which omits both.
    ['with status slot', { props: { status: true, modelValue: 50 }, slots: { status: () => 'Status slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 75,
        status: true
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
