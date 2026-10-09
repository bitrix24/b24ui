import { describe, it, expect, vi } from 'vitest'
import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import ColorModeButton from '../../../src/runtime/components/color-mode/ColorModeButton.vue'

// The fork's `useColorMode` returns a forced stub when `appConfig.colorMode` is off, which it is in the
// Nuxt test project, so the color mode is replaced by a plain reactive one for both test projects.
vi.mock('../../../src/runtime/composables/color-mode/useColorMode', async () => {
  const store = ref('light')
  return {
    useColorMode: () => ({
      get preference() { return store.value },
      set preference(value: string) { store.value = value },
      get value() { return store.value },
      forced: false
    })
  }
})

describe('ColorModeButton', () => {
  it('updates the label after hydrating when the client resolves dark mode', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { useColorMode } = await import('../../../src/runtime/composables/color-mode/useColorMode')
    const colorMode = useColorMode()
    const preference = colorMode.preference
    colorMode.preference = 'dark'
    await nextTick()

    const html = await renderToString(createSSRApp(() => h(ColorModeButton)))
    const container = document.createElement('div')
    container.innerHTML = html
    expect(container.querySelector('button')?.getAttribute('aria-label')).toBe('Switch to dark mode')

    const app = createSSRApp(() => h(ColorModeButton))
    app.mount(container)
    await nextTick()

    expect(warn.mock.calls.flat().join('\n')).not.toMatch(/Hydration/)
    expect(container.querySelector('button')?.getAttribute('aria-label')).toBe('Switch to light mode')

    app.unmount()
    colorMode.preference = preference
    warn.mockRestore()
  })
})
