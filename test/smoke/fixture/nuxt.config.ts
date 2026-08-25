// A Nuxt app that installs `@bitrix24/b24ui-nuxt` from the workspace link,
// which resolves to the built `dist/` — so this boots the package the way a
// consumer would rather than the sources the unit suite mounts. Everything
// added here is time `pnpm test:smoke` spends on something other than "does
// the package start", so it stays small.
//
// It is *not* bare, though an earlier version of this comment said so. c12
// resolves the workspace root and merges the repository's own `.nuxtrc` into
// every Nuxt instance under it, this fixture included:
//
//     experimental.normalizeComponentNames=false
//     modules[]=@nuxt/content
//
// `@nuxt/content` therefore loads here despite not being in this package's
// dependencies, which is untidy and harmless — its components are not used.
// `normalizeComponentNames` is neither. It is `true` by default in Nuxt 4, so
// inheriting `false` would have this fixture boot in a configuration no
// consumer has, and component-resolution failures are exactly the class of
// boot failure this file exists to catch. Restored explicitly below; the
// config file wins over the rc.
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt'],
  devtools: { enabled: false },
  experimental: { normalizeComponentNames: true },
  compatibilityDate: '2024-07-09'
})
