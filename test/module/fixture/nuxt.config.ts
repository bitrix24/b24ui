// A Nuxt project that exists only to be loaded, never built or served.
//
// `test/module/module-setup.spec.ts` boots it with `loadNuxt` so the module's
// real `setup()` runs; the module is referenced by path rather than by package
// name on purpose, because what is under test is the source in `src/`, not the
// built artifact. (`test/smoke/fixture` is the one that goes through the
// package.)
//
// c12 merges the repository's `.nuxtrc` in here too, so `@nuxt/content` is
// always installed and `src/module.ts` always takes its content/mdc branches.
// Left alone rather than pinned: the spec asserts `appConfig.version` and
// `theme.prefix`, neither of which that branch touches. Worth knowing before
// adding a case that does — the coverage of this fixture depends on a file two
// directories up.
export default defineNuxtConfig({
  modules: ['../../../src/module'],
  devtools: { enabled: false },
  compatibilityDate: '2024-07-09'
})
