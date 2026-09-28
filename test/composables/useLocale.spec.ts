import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, shallowRef } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useLocale } from '../../src/runtime/composables/useLocale'
import B24App from '../../src/runtime/components/App.vue'
import B24Button from '../../src/runtime/components/Button.vue'
import B24Pagination from '../../src/runtime/components/Pagination.vue'
import type { AppProps } from '../../src/runtime/components/App.vue'
import icons from '../../src/runtime/dictionary/icons'
import ar from '../../src/runtime/locale/ar'

const teardowns: Array<() => void> = []

afterEach(() => {
  teardowns.splice(0).forEach(fn => fn())
})

async function mountDir(appProps?: Pick<AppProps, 'dir' | 'locale'>, localeOverride?: typeof ar) {
  let dir: string | undefined

  const Probe = defineComponent({
    setup() {
      dir = useLocale(localeOverride && shallowRef(localeOverride)).dir.value
      return () => null
    }
  })

  const wrapper = await mountSuspended(defineComponent({
    render: () => appProps ? h(B24App, appProps, () => h(Probe)) : h(Probe)
  }))
  teardowns.push(() => wrapper.unmount())

  return dir
}

describe('useLocale', () => {
  it('defaults to ltr without an App', async () => {
    expect(await mountDir()).toBe('ltr')
  })

  it('follows the App dir prop without a locale', async () => {
    expect(await mountDir({ dir: 'rtl' })).toBe('rtl')
  })

  it('follows the locale dir', async () => {
    expect(await mountDir({ locale: ar })).toBe('rtl')
  })

  it('lets the App dir prop override the locale dir', async () => {
    expect(await mountDir({ locale: ar, dir: 'ltr' })).toBe('ltr')
  })

  it('keeps the dir of a locale passed to useLocale without an App', async () => {
    expect(await mountDir(undefined, ar)).toBe('rtl')
  })

  it('keeps the dir of a locale passed to useLocale over the App dir prop', async () => {
    expect(await mountDir({ dir: 'ltr' }, ar)).toBe('rtl')
  })

  // Not in upstream's set: overriding only `dir` must still provide the default
  // messages. Without the `en` fallback the provided locale is `{ dir }` alone,
  // every direction assertion above still passes, and `t()` returns raw keys.
  it('keeps the default messages when the App sets only dir', async () => {
    let label: string | undefined

    const Probe = defineComponent({
      setup() {
        label = useLocale().t('contentSearchButton.label')
        return () => null
      }
    })

    const wrapper = await mountSuspended(defineComponent({
      render: () => h(B24App, { dir: 'rtl' }, () => h(Probe))
    }))
    teardowns.push(() => wrapper.unmount())

    expect(label).toBe('Search…')
  })

  it('flips Pagination icons with the App dir prop and no locale', async () => {
    const wrapper = await mountSuspended(defineComponent({
      render: () => h(B24App, { dir: 'rtl' }, () => h(B24Pagination, { total: 100, page: 5, showEdges: true }))
    }))
    teardowns.push(() => wrapper.unmount())

    const icon = (control: string) => wrapper.findAllComponents(B24Button).find(b => b.attributes('data-slot') === control)?.props('icon')

    expect(icon('first')).toBe(icons.chevronDoubleRight)
    expect(icon('prev')).toBe(icons.chevronRight)
    expect(icon('next')).toBe(icons.chevronLeft)
    expect(icon('last')).toBe(icons.chevronDoubleLeft)
  })
})
