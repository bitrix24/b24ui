import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue'
import DashboardNavbar from '../../src/runtime/components/DashboardNavbar.vue'
import type { DashboardNavbarProps, DashboardNavbarSlots } from '../../src/runtime/components/DashboardNavbar.vue'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-b24/Bitrix24Icon'

const DashboardWrapper = defineComponent({
  components: {
    B24DashboardGroup: DashboardGroup as any,
    B24DashboardNavbar: DashboardNavbar as any
  },
  inheritAttrs: false,
  template: `<B24DashboardGroup>
  <B24DashboardNavbar v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </B24DashboardNavbar>
</B24DashboardGroup>`
})

describe('DashboardNavbar', () => {
  it.each([
    // Props
    ['with icon', { props: { icon: Bitrix24Icon } }],
    ['with title', { props: { title: 'Dashboard' } }],
    ['without toggle', { props: { toggle: false } }],
    ['with toggle', { props: { toggle: { color: 'primary' as const, variant: 'solid' as const } } }],
    ['with toggleSide', { props: { toggleSide: 'right' as const } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'px-8' } }],
    ['with b24ui', { props: { b24ui: { left: 'gap-3' } } }],
    // Slots
    ['with title slot', { slots: { title: () => 'Title slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }],
    ['with left slot', { slots: { left: () => 'Left slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with right slot', { slots: { right: () => 'Right slot' } }],
    ['with toggle slot', { slots: { toggle: () => 'Toggle slot' } }]
  ])('renders %s correctly', async (_: string, options: { props?: DashboardNavbarProps, slots?: Partial<DashboardNavbarSlots> }) => {
    const wrapper = await mountSuspended(DashboardWrapper, options)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, {
      props: {
        title: 'Dashboard'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
