import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue'
import DashboardSearch from '../../src/runtime/components/DashboardSearch.vue'
import type { DashboardSearchProps } from '../../src/runtime/components/DashboardSearch.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

const DashboardWrapper = defineComponent({
  components: {
    B24DashboardGroup: DashboardGroup as any,
    B24DashboardSearch: DashboardSearch as any
  },
  inheritAttrs: false,
  template: `<B24DashboardGroup>
  <B24DashboardSearch v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </B24DashboardSearch>
</B24DashboardGroup>`
})

describe('DashboardSearch', () => {
  const groups = [{
    id: 'links',
    label: 'Go to',
    items: [{
      label: 'Home',
      to: '/'
    }]
  }]

  const props = { groups, open: true, portal: false }

  it.each([
    // Props
    ['with groups', { props }],
    ['with icon', { props: { ...props, icon: SignIcon } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search' } }],
    ['with loading', { props: { ...props, loading: true } }],
    ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: Cross30Icon } }],
    ['without colorMode', { props: { ...props, colorMode: false } }],
    ['with fullscreen', { props: { ...props, fullscreen: true } }],
    ['with b24ui', { props: { ...props, b24ui: { input: '[&>input]:text-lg' } } }],
    ['with class', { props: { ...props, class: 'sm:max-w-5xl' } }]
  ])('renders %s correctly', async (_: string, options: { props?: DashboardSearchProps }) => {
    const wrapper = await mountSuspended(DashboardWrapper, options)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
