import type { SetupContext } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { defu } from 'defu'
import { createHead } from '@unhead/vue/client'
import { mount } from '@vue/test-utils'

const head = createHead()
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
})

export async function mountSuspended(...args: Parameters<typeof mount>) {
  let setupState = {}
  const comp = args[0] as any
  if (comp.setup) {
    const originalSetup = comp.setup
    comp.setup = function (props: Record<string, any>, ctx: SetupContext) {
      setupState = originalSetup.call(this, props, ctx)
      return setupState
    }
  }
  const wrapper = mount(args[0], defu({}, args[1], {
    // Mounted into the document by default, for the reasons in
    // `.github/contributing/testing.md`. A call site that needs a detached
    // tree can still pass its own `attachTo`, because `defu` lets the
    // caller's options win.
    attachTo: document.body,
    global: {
      stubs: {
        ClientOnly: { template: '<slot />' }
      },
      plugins: [head, router]
    }
  }))

  /**
   * The router is a module singleton, and vue-router's `install` replaces
   * `app.unmount` with one that resets `currentRoute` to `START_LOCATION` and
   * clears `started`/`ready` once the last app goes. The harness unmounts
   * every wrapper, so without this the next mount renders against an
   * un-navigated router: `RouterLink` reports `isActive: false` for `to="/"`
   * and `Link` loses its active styling. The initial navigation `install`
   * kicks off is a promise, and one `$nextTick` does not outlast it.
   */
  await router.isReady()
  await wrapper.vm.$nextTick()

  // @ts-expect-error - setupState does not exist in type
  wrapper.setupState = setupState

  return wrapper
}
