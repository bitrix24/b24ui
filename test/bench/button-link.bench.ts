import { bench, describe } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Button from '../../src/runtime/components/Button.vue'

// Where does a Button's render cost come from? Three rungs isolate it:
//   1. plain <button>          — baseline DOM/reactivity cost of a trivial element
//   2. B24Button (no link)     — adds the Button + B24Link component stack (B24Link
//                                renders a plain <button> when there's no `to`)
//   3. B24Button (link, `to`)  — adds the router-link path (route resolution, RouterLink)
// (2) − (1) = the b24ui component-stack overhead; (3) − (2) = the routing overhead.

// Declares `loading` so the re-render benches can toggle a prop on it too.
const Plain = { props: ['loading'], template: '<button type="button">x</button>' }

describe('mount', () => {
  bench('plain <button>', async () => {
    const wrapper = await mountSuspended(Plain)
    wrapper.unmount()
  })

  bench('B24Button (no link)', async () => {
    const wrapper = await mountSuspended(Button, { props: { label: 'x' } })
    wrapper.unmount()
  })

  bench('B24Button (link)', async () => {
    const wrapper = await mountSuspended(Button, { props: { label: 'x', to: '/' } })
    wrapper.unmount()
  })
})

// Re-render cost: a full on/off `loading` cycle per iteration (deterministic,
// ends in the initial state), re-rendering the whole subtree.
function reRenderBench(name: string, comp: any, props: Record<string, any> = {}) {
  describe(`re-render: ${name}`, () => {
    let wrapper: Awaited<ReturnType<typeof mountSuspended>>

    bench(name, async () => {
      await wrapper.setProps({ loading: true })
      await wrapper.setProps({ loading: false })
    }, {
      async setup() {
        wrapper = await mountSuspended(comp, { props })
      },
      teardown() {
        wrapper?.unmount()
      }
    })
  })
}

reRenderBench('plain <button>', Plain)
reRenderBench('B24Button (no link)', Button, { label: 'x' })
reRenderBench('B24Button (link)', Button, { label: 'x', to: '/' })
