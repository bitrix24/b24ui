import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import { TooltipProvider } from 'reka-ui'
import Tooltip, { type TooltipProps, type TooltipSlots } from '../../src/runtime/components/Tooltip.vue'
import ComponentRender from '../component-render'

const TooltipWrapper = defineComponent({
  components: {
    TooltipProvider,
    B24Tooltip: Tooltip
  },
  inheritAttrs: false,
  template: `<TooltipProvider>
  <B24Tooltip v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </B24Tooltip>
</TooltipProvider>`
})

describe('Tooltip', () => {
  const props = { text: 'Tooltip', open: true, portal: false }

  it.each([
    // Props
    ['with text', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with kbds', { props: { ...props, kbds: ['meta', 'K'] } }],
    ['with class', { props: { ...props, class: 'text-sm' } }],
    ['with b24ui', { props: { ...props, b24ui: { content: 'text-sm' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TooltipProps, slots?: Partial<TooltipSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, TooltipWrapper)
    expect(html).toMatchSnapshot()
  })
})
