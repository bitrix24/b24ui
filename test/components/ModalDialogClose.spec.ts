import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ModalDialogClose from '../../src/runtime/components/ModalDialogClose.vue'
import Modal from '../../src/runtime/components/Modal.vue'
import Button from '../../src/runtime/components/Button.vue'

/**
 * A nineteen-line passthrough over reka-ui's `DialogClose`, used once — by
 * `SidebarLayout`, to close the mobile sidebar. It renders `as-child`, so it
 * contributes no element of its own, and everything depends on it forwarding
 * both the slot and the close behaviour to whatever it wraps.
 *
 * Mounted inside a real `Modal`: on its own, `DialogClose` has no dialog to
 * close and the test would be asserting that nothing happens. `open` is bound
 * rather than passed as a literal `true`, because a literal one is never
 * written back and the dialog would stay open however well the click worked.
 */
describe('ModalDialogClose', () => {
  const mountInModal = () => {
    const open = ref(true)

    return mountSuspended({
      components: { B24Modal: Modal, B24Button: Button, B24ModalDialogClose: ModalDialogClose },
      setup: () => ({ open }),
      template: `
        <B24Modal v-model:open="open" :portal="false" title="Title">
          <template #body>
            <B24ModalDialogClose>
              <B24Button label="Close it" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>
      `
    })
  }

  /** The dialog renders its own close button too; ours is the one with a label. */
  const ourButton = (wrapper: Awaited<ReturnType<typeof mountInModal>>) =>
    wrapper.findAll('button').find(button => button.text().includes('Close it'))!

  it('renders its child and contributes no element of its own', async () => {
    const wrapper = await mountInModal()

    // `as-child` means the child *is* the trigger — reka-ui puts the dialog
    // wiring onto the button rather than wrapping it in an element.
    expect(ourButton(wrapper).exists()).toBe(true)
    expect(wrapper.html()).not.toContain('data-slot="modalDialogClose"')
  })

  it('closes the dialog when its child is activated', async () => {
    const wrapper = await mountInModal()

    expect(wrapper.find('[data-slot="content"]').exists()).toBe(true)

    await ourButton(wrapper).trigger('click')
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(wrapper.find('[data-slot="content"]').exists()).toBe(false)
  })
})
