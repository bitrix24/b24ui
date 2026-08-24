// The smallest Nuxt app that installs `@bitrix24/b24ui-nuxt` from the
// workspace link, which resolves to the built `dist/` — so this boots the
// package the way a consumer would rather than the sources the unit suite
// mounts. Kept deliberately bare: everything added here is time `pnpm
// test:smoke` spends on something other than "does the package start".
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt'],
  devtools: { enabled: false },
  compatibilityDate: '2024-07-09'
})
