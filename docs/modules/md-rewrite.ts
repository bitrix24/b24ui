import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule((_options, nuxt) => {
  nuxt.hooks.hook('nitro:init', (nitro) => {
    /**
     * @memo This is only for vercel ??
     */
    if (nitro.options.dev || !nitro.options.preset.includes('vercel')) {
      return
    }
    nitro.hooks.hook('compiled', async () => {
      const config = useRuntimeConfig()
      const { resolve } = process.getBuiltinModule('node:path')
      const { readFile, writeFile }
        = process.getBuiltinModule('node:fs/promises')
      const vcJSON = resolve(nitro.options.output.dir, 'config.json')
      const vcConfig = JSON.parse(await readFile(vcJSON, 'utf8'))
      /**
       * @memo need test `config.public.baseUrl`
       */
      vcConfig.routes.unshift({
        src: `^${config.public.baseUrl}/docs/(.*)$`,
        dest: `${config.public.baseUrl}/raw/docs/$1.md`,
        has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }],
        check: true
      })
      await writeFile(vcJSON, JSON.stringify(vcConfig, null, 2), 'utf8')
    })
  })
})
