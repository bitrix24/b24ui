import { mount as vtuMount } from '@vue/test-utils'

/**
 * Vue Test Utils' `mount`, defaulting to a tree that is in the document.
 *
 * The `vue` project gets this from its own shim; the `nuxt` project reaches
 * `mount` through `@nuxt/test-utils`, which has no seam of its own, so
 * `vitest.config.ts` aliases `@vue/test-utils` to this module for that project
 * only. `mockNuxtImport` and friends are untouched: they are macros keyed on
 * `@nuxt/test-utils/runtime`, which this does not redirect.
 *
 * Why in the document at all, and why every wrapper is unmounted after each
 * test: `.github/contributing/testing.md`.
 */
export const mount: typeof vtuMount = ((component: any, options: any) =>
  // `?? document.body` rather than a plain spread, so an explicit
  // `attachTo: undefined` means "no opinion" here as well as in the `vue`
  // project's shim, where `defu` drops it. A plain spread would have made the
  // same call mount attached in one project and detached in the other.
  vtuMount(component, { ...options, attachTo: options?.attachTo ?? document.body })) as typeof vtuMount

export * from '@vue/test-utils'
