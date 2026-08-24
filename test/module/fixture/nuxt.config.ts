// A Nuxt project that exists only to be loaded, never built or served.
//
// `test/module/module-setup.spec.ts` boots it with `loadNuxt` so the module's
// real `setup()` runs; the module is referenced by path rather than by package
// name on purpose, because what is under test is the source in `src/`, not the
// built artifact. (`test/smoke/fixture` is the one that goes through the
// package.)
export default defineNuxtConfig({
  modules: ['../../../src/module'],
  devtools: { enabled: false },
  compatibilityDate: '2024-07-09'
})
