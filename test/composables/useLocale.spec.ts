import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, provide, shallowRef } from 'vue'
import type { Component, VNode } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { localeContextInjectionKey, useLocale } from '../../src/runtime/composables/useLocale'
import B24App from '../../src/runtime/components/App.vue'
import B24Breadcrumb from '../../src/runtime/components/Breadcrumb.vue'
import B24Button from '../../src/runtime/components/Button.vue'
import B24Calendar from '../../src/runtime/components/Calendar.vue'
import B24CommandPalette from '../../src/runtime/components/CommandPalette.vue'
import B24InputDate from '../../src/runtime/components/InputDate.vue'
import B24InputMenu from '../../src/runtime/components/InputMenu.vue'
import B24InputNumber from '../../src/runtime/components/InputNumber.vue'
import B24InputRating from '../../src/runtime/components/InputRating.vue'
import B24InputTime from '../../src/runtime/components/InputTime.vue'
import B24Pagination from '../../src/runtime/components/Pagination.vue'
import B24PinInput from '../../src/runtime/components/PinInput.vue'
import B24Range from '../../src/runtime/components/Range.vue'
import B24Skeleton from '../../src/runtime/components/Skeleton.vue'
import B24Stepper from '../../src/runtime/components/Stepper.vue'
import type { AppProps } from '../../src/runtime/components/App.vue'
import icons from '../../src/runtime/dictionary/icons'
import ar from '../../src/runtime/locale/ar'
import de from '../../src/runtime/locale/de'
import en from '../../src/runtime/locale/en'
import fr from '../../src/runtime/locale/fr'

const teardowns: Array<() => void> = []

afterEach(() => {
  teardowns.splice(0).forEach(fn => fn())
})

async function mountDir(appProps?: Pick<AppProps, 'dir' | 'locale' | 'toaster'>, localeOverride?: typeof ar, providedLocale?: typeof ar) {
  let dir: string | undefined

  const Probe = defineComponent({
    setup() {
      dir = useLocale(localeOverride && shallowRef(localeOverride)).dir.value
      return () => null
    }
  })

  const wrapper = await mountSuspended(defineComponent({
    setup: () => {
      if (providedLocale) {
        provide(localeContextInjectionKey, shallowRef(providedLocale))
      }
    },
    render: () => appProps ? h(B24App, appProps, () => h(Probe)) : h(Probe)
  }))
  teardowns.push(() => wrapper.unmount())

  return dir
}

async function mountInApp(appProps: Pick<AppProps, 'locale' | 'toaster'>, render: () => VNode) {
  const wrapper = await mountSuspended(defineComponent({
    render: () => h(B24App, appProps, render)
  }))
  teardowns.push(() => wrapper.unmount())

  return wrapper
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

  it('follows a locale provided above the App', async () => {
    expect(await mountDir({}, undefined, ar)).toBe('rtl')
  })

  it('lets the App locale prop override a locale provided above it', async () => {
    expect(await mountDir({ locale: en }, undefined, ar)).toBe('ltr')
  })

  it('keeps the dir of a locale passed to useLocale without an App', async () => {
    expect(await mountDir(undefined, ar)).toBe('rtl')
  })

  it('keeps the dir of a locale passed to useLocale over the App dir prop', async () => {
    // `useLocale` is shared on the client: without `toaster: null`, `B24Toaster` would call it first.
    expect(await mountDir({ dir: 'ltr', toaster: null }, ar)).toBe('rtl')
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

  it('labels Pagination controls and pages in the App locale', async () => {
    const wrapper = await mountSuspended(defineComponent({
      render: () => h(B24App, { locale: de }, () => h(B24Pagination, { total: 30 }))
    }))
    teardowns.push(() => wrapper.unmount())

    expect(wrapper.findAll('button').map(button => button.attributes('aria-label'))).toEqual([
      'Erste Seite',
      'Vorherige Seite',
      'Seite 1',
      'Seite 2',
      'Seite 3',
      'Nächste Seite',
      'Letzte Seite'
    ])
  })

  it('labels Breadcrumb in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24Breadcrumb, { items: [{ label: 'Accueil' }] }))

    expect(wrapper.get('nav[data-slot="root"]').attributes('aria-label')).toBe('fil d\'Ariane')
  })

  it.each([
    ['date', 'Date de l\'événement'],
    ['month', 'Sélecteur de mois'],
    ['year', 'Sélecteur d\'année']
  ] as const)('labels the %s Calendar in the App locale', async (type, label) => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24Calendar, { type }))

    expect(wrapper.get('[data-slot="root"]').attributes('aria-label')).toMatch(new RegExp(`^${label}, `))
  })

  it('labels the CommandPalette listbox in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24CommandPalette as Component))

    expect(wrapper.get('[role="listbox"]').attributes('aria-label')).toBe('Résultats')
  })

  it('labels InputDate segments in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24InputDate))

    expect(['day', 'month', 'year'].map(part => wrapper.get(`[data-segment="${part}"]`).attributes('aria-label'))).toEqual(['jour', 'mois', 'année'])
  })

  it('labels the InputMenu trigger in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24InputMenu))

    expect(wrapper.get('[data-slot="trailing"]').attributes('aria-label')).toBe('Afficher les options')
  })

  it('describes InputNumber in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24InputNumber))

    expect(wrapper.get('input').attributes('aria-roledescription')).toBe('champ numérique')
  })

  it('labels InputRating values in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24InputRating, { length: 3 }))

    expect(wrapper.findAll('[data-slot="indicator"]').map(indicator => indicator.attributes('aria-label'))).toEqual(['Noter 1 sur 3', 'Noter 2 sur 3', 'Noter 3 sur 3'])
  })

  it('labels InputTime segments in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24InputTime, { granularity: 'second' }))

    expect(['hour', 'minute', 'second'].map(part => wrapper.get(`[data-segment="${part}"]`).attributes('aria-label'))).toEqual(['heure', 'minute', 'seconde'])
  })

  it('labels PinInput inputs in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24PinInput, { length: 3 }))

    expect(wrapper.findAll('input[data-slot="base"]').map(input => input.attributes('aria-label'))).toEqual([
      'code PIN, caractère 1 sur 3',
      'code PIN, caractère 2 sur 3',
      'code PIN, caractère 3 sur 3'
    ])
  })

  it('labels Skeleton in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24Skeleton))

    expect(wrapper.get('[aria-busy="true"]').attributes('aria-label')).toBe('chargement')
  })

  it.each([
    [10, ['Curseur']],
    [[0, 10, 20], ['Valeur 1 sur 3', 'Valeur 2 sur 3', 'Valeur 3 sur 3']]
  ])('labels Range thumbs of %j in the App locale', async (modelValue, labels) => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24Range, { modelValue }))

    expect(wrapper.findAll('[role="slider"]').map(thumb => thumb.attributes('aria-label'))).toEqual(labels)
  })

  it('labels Stepper in the App locale', async () => {
    const wrapper = await mountInApp({ locale: fr }, () => h(B24Stepper, { items: [{ title: 'A' }] }))

    expect(wrapper.get('[data-slot="root"]').attributes('aria-label')).toBe('progression')
  })

  it('labels Toaster in the App locale', async () => {
    const wrapper = await mountInApp({ locale: de, toaster: { portal: false } }, () => h('div'))

    expect(wrapper.findComponent({ name: 'ToastProvider' }).props('label')).toBe('Benachrichtigung')
    expect(wrapper.get('[role="region"]').attributes('aria-label')).toBe('Benachrichtigungen (F8)')
  })
})
