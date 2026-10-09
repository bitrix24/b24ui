import { defineComponent } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DashboardGroup from '../../src/runtime/components/DashboardGroup.vue'
import DashboardSearch from '../../src/runtime/components/DashboardSearch.vue'
import Modal from '../../src/runtime/components/Modal.vue'
import CommandPalette from '../../src/runtime/components/CommandPalette.vue'
import { renderEach } from '../component-render'
import theme from '#build/b24ui/dashboard-search'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

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
  const sizes = Object.keys(theme.variants.size) as any

  const groups = [{
    id: 'links',
    label: 'Go to',
    items: [{
      label: 'Home',
      to: '/'
    }]
  }]

  const props = { groups, open: true, portal: false }

  renderEach(
    DashboardWrapper,
    [
    // Props
      ['with groups', { props }],
      ['with icon', { props: { ...props, icon: SignIcon } }],
      ['with placeholder', { props: { ...props, placeholder: 'Search' } }],
      ['with loading', { props: { ...props, loading: true } }],
      /** @memo not use loadingIcon */
      // ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: SignIcon } }],
      ['without colorMode', { props: { ...props, colorMode: false } }],
      ['with fullscreen', { props: { ...props, fullscreen: true } }],
      ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
      ['with b24ui', { props: { ...props, b24ui: { input: '[&>input]:text-lg' } } }],
      ['with class', { props: { ...props, class: 'sm:max-w-5xl' } }]
    ],
    async (_, options) => {
      const wrapper = await mountSuspended(DashboardWrapper, options)
      await vi.dynamicImportSettled()
      expect(wrapper.html()).toMatchSnapshot()
    }
  )

  it('mounts the modal once opened', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, { props: { ...props, open: false } })

    expect(wrapper.findComponent(Modal).exists()).toBe(false)

    await wrapper.setProps({ open: true } as any)
    await vi.dynamicImportSettled()

    expect(wrapper.findComponent(CommandPalette).text()).toContain('Home')
  })

  it('mounts the modal before opening with `unmountOnHide: false`', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, { props: { ...props, open: false, unmountOnHide: false } })
    await vi.dynamicImportSettled()

    expect(wrapper.findComponent(CommandPalette).text()).toContain('Home')
  })

  // Upstream's test covers ContentSearch only; the same fallback changed here.
  it('labels the dialog with the translated search label', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, { props })
    await vi.dynamicImportSettled()

    const dialog = wrapper.find('[role="dialog"]')
    const title = wrapper.find(`#${dialog.attributes('aria-labelledby')}`)
    expect(title.text()).toBe('Search…')
    expect(wrapper.html()).not.toContain('dashboardSearch.')

    wrapper.unmount()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, {
      props
    })
    await vi.dynamicImportSettled()

    expect(await axe(wrapper.element, {
      // "ARIA input fields must have an accessible name (aria-input-field-name)"
      //
      // Fix any of the following:
      //  aria-label attribute does not exist or is empty
      //  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
      //  Element has no title attribute
      rules: {
        'aria-input-field-name': { enabled: false }
      }
    })).toHaveNoViolations()
  })
})
