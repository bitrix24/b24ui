import { describe, it, expect, vi } from 'vitest'
import { join } from 'pathe'
import ComponentImportPlugin from '../../src/plugins/components'

const runtimeDir = join(process.cwd(), 'src/runtime')

// `src/unplugin` resolves `runtimeDir` from `import.meta.url`, which is not a file url under happy-dom.
vi.mock('../../src/unplugin', () => ({ runtimeDir: join(process.cwd(), 'src/runtime') }))

function resolveId(id: string, importer?: string, options: Record<string, any> = {}) {
  const [plugin] = ComponentImportPlugin({ components: false, ...options } as any, { framework: 'vite' } as any)
  return (plugin!.resolveId as any).call({}, id, importer)
}

// Upstream's version of this file drives every case through `Icon.vue`. This
// fork has no `Icon` component at all — it renders icons from
// `@bitrix24/b24icons-vue` — so `Link.vue` stands in for it. That is not a
// cosmetic swap: `Icon` lives in `vue/components`, `Link` in
// `vue/overrides/<router mode>`, so the router-mode branch of `overrideSources`
// carries the cases upstream puts on the plain one. The color-mode components
// cover the `vue/components` side.
describe('bitrix24:b24ui:components', () => {
  it('overrides relative imports inside the runtime', () => {
    expect(resolveId('./Link.vue', join(runtimeDir, 'components/Button.vue'))).toBe(join(runtimeDir, 'vue/overrides/vue-router/Link.vue'))
  })

  it('overrides explicit package imports', () => {
    expect(resolveId('@bitrix24/b24ui-nuxt/components/Link.vue', '/app/src/App.tsx')).toBe(join(runtimeDir, 'vue/overrides/vue-router/Link.vue'))
    expect(resolveId('@bitrix24/b24ui-nuxt/runtime/components/Link.vue', '/app/src/App.tsx')).toBe(join(runtimeDir, 'vue/overrides/vue-router/Link.vue'))
    expect(resolveId('@bitrix24/b24ui-nuxt/components/color-mode/ColorModeSwitch.vue', '/app/src/App.tsx', { colorMode: true })).toBe(join(runtimeDir, 'vue/components/color-mode/ColorModeSwitch.vue'))
  })

  it('overrides absolute path imports', () => {
    expect(resolveId(join(runtimeDir, 'components/Link.vue'), '/app/src/App.tsx')).toBe(join(runtimeDir, 'vue/overrides/vue-router/Link.vue'))
    expect(resolveId('/app/node_modules/@bitrix24/b24ui-nuxt/dist/runtime/components/Link.vue', '/app/src/App.tsx')).toBe(join(runtimeDir, 'vue/overrides/vue-router/Link.vue'))
    expect(resolveId('C:\\app\\node_modules\\@bitrix24\\b24ui-nuxt\\dist\\runtime\\components\\Link.vue', 'C:/app/src/App.tsx')).toBe(join(runtimeDir, 'vue/overrides/vue-router/Link.vue'))
    expect(resolveId(join(runtimeDir, 'components/Button.vue'), '/app/src/App.tsx')).toBeUndefined()
  })

  // Both paths here are chosen so a looser implementation resolves them:
  // `prose/Link.vue` shares its basename with a real override, so a
  // `resolveFile`-style lookup would match it, and the foreign package has the
  // exact tail the regex looks for, so a regex missing the package prefix would
  // match it. A component with no override at all (`Button.vue`) would pass
  // either way and proves nothing.
  it('leaves other package imports alone', () => {
    expect(resolveId('@bitrix24/b24ui-nuxt/components/prose/Link.vue', '/app/src/App.tsx')).toBeUndefined()
    expect(resolveId('some-other-lib/components/Link.vue', '/app/src/App.tsx')).toBeUndefined()
  })

  // Fork-only: `LinkBase` is overridden for inertia and nowhere else, so the
  // same specifier has to resolve differently per router mode. Upstream has no
  // component shaped like this — its inertia override dir and its default one
  // hold the same names.
  it('resolves an override that only one router mode declares', () => {
    expect(resolveId('@bitrix24/b24ui-nuxt/components/LinkBase.vue', '/app/src/App.tsx', { router: 'inertia' })).toBe(join(runtimeDir, 'vue/overrides/inertia/LinkBase.vue'))
    expect(resolveId('@bitrix24/b24ui-nuxt/components/LinkBase.vue', '/app/src/App.tsx')).toBeUndefined()
  })

  // `colorMode: false` ignores `color-mode/**/*.vue` when the source is built,
  // so the override must not be found — the app gets the plain component.
  it('does not override color-mode components when colorMode is off', () => {
    expect(resolveId('@bitrix24/b24ui-nuxt/components/color-mode/ColorModeSwitch.vue', '/app/src/App.tsx')).toBeUndefined()
  })
})
