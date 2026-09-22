import { defineComponent } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Toaster from '../../src/runtime/components/Toaster.vue'
import Toast from '../../src/runtime/components/Toast.vue'
import { useToast } from '../../src/runtime/composables/useToast'
import { ClientOnly } from '#components'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

const ToastWrapper = defineComponent({
  components: {
    B24Toaster: Toaster,
    B24Toast: Toast,
    ClientOnly
  },
  inheritAttrs: false,
  template: `<B24Toaster :portal="false">
  <ClientOnly>
    <B24Toast v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </B24Toast>
  </ClientOnly>
</B24Toaster>`
})

describe('Toast', () => {
  const props = { title: 'Toast' }

  renderEach(ToastWrapper, [
    // Props
    ['with title', { props }],
    ['with description', { props: { ...props, description: 'This is a toast' } }],
    ['with icon', { props: { ...props, icon: SignIcon } }],
    ['with avatar', { props: { ...props, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with actions', { props: { ...props, actions: [{ label: 'Action' }] } }],
    ['with orientation vertical', { props: { ...props, icon: SignIcon, description: 'This is a toast', actions: [{ label: 'Action' }], orientation: 'vertical' as const } }],
    ['with orientation horizontal', { props: { ...props, icon: SignIcon, description: 'This is a toast', actions: [{ label: 'Action' }], orientation: 'horizontal' as const } }],
    ['without close', { props: { ...props, close: false } }],
    ['with closeIcon', { props: { ...props, closeIcon: Cross30Icon } }],
    ['with type', { props: { ...props, type: 'background' } }],
    ['with color success', { props: { ...props, color: 'air-primary-success' } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'bg-red-500/50' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'font-(--ui-font-weight-bold)' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with close slot', { props, slots: { close: () => 'Close slot' } }]
  ])

  // `Toaster` spreads the whole toast object onto `<B24Toast>` and also binds
  // `@click="toast.onClick && toast.onClick(toast)"` on the same element, so
  // `onClick` arrived twice — once as a fallthrough listener, once as the
  // explicit handler. Reproduced before fixing: the handler ran 2 times for one
  // click.
  //
  // The API is taken from inside `setup()` rather than from the test body,
  // which is a fork-only adaptation. `useToast` calls `inject()`, and outside a
  // component instance that warns — `useToast.spec.ts` sits in
  // `KNOWN_NOISY_SPECS` for exactly this reason, and upstream has no such gate.
  // Reaching for it through a component keeps this file off that list.
  it('calls onClick once per click', async () => {
    const onClick = vi.fn()
    let toast!: ReturnType<typeof useToast>

    const Harness = defineComponent({
      components: { B24Toaster: Toaster },
      setup() {
        toast = useToast()
        return {}
      },
      template: `<B24Toaster :portal="false" />`
    })

    const wrapper = await mountSuspended(Harness)
    toast.clear()
    const body = toast.add({ title: 'Toast', onClick })

    await vi.waitFor(() => expect(wrapper.find('[data-slot="base"]').exists()).toBe(true))
    await wrapper.find('[data-slot="base"]').trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: body.id, title: 'Toast' }))

    toast.clear()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ToastWrapper, {
      props: {
        title: 'Title',
        description: 'Description',
        avatar: { src: 'https://github.com/bitrix24.png', alt: 'Some User' },
        actions: [{ label: 'Action' }]
      }
    })
    expect(await axe(wrapper.element, {
      rules: {
        // "ARIA role should be appropriate for the element (aria-allowed-role)"

        // Fix any of the following:
        //   ARIA role alert is not allowed for given element
        'aria-allowed-role': { enabled: false },
        // "ARIA hidden element must not be focusable or contain focusable elements (aria-hidden-focus)"

        // Fix all of the following:
        //   Focusable content should have tabindex="-1" or be removed from the DOM
        'aria-hidden-focus': { enabled: false },
        // "<ul> and <ol> must only directly contain <li>, <script> or <template> elements (list)"

        // Fix all of the following:
        //   List element has direct children that are not allowed: [role=alert]
        'list': { enabled: false }
      }
    })).toHaveNoViolations()
  })
})
