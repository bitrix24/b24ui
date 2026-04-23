import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule((_options, nuxt) => {
  nuxt.hooks.hook('nitro:init', (nitro) => {
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
      vcConfig.routes.unshift(
        // Add Vary header so CDNs don't serve cached HTML to agents or vice versa
        {
          src: `^${config.public.baseUrl}/docs/(?!.*\\.md$).*$`,
          headers: { Vary: 'Accept, User-Agent' },
          continue: true
        },
        // Rewrite /docs/*.md URLs to the raw markdown handler
        // @memo But at GitHub Pages we use /raw
        {
          src: `^${config.public.baseUrl}/docs/(.*)\\.md$`,
          dest: `${config.public.baseUrl}/raw/docs/$1.md`
        },
        // Serve markdown when Accept: text/markdown is requested
        {
          src: `^${config.public.baseUrl}/docs/(.*)$`,
          dest: `${config.public.baseUrl}/raw/docs/$1.md`,
          has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }]
        },
        // Serve markdown to known AI agent user agents
        {
          src: `^${config.public.baseUrl}/docs/(.*)$`,
          dest: `${config.public.baseUrl}/raw/docs/$1.md`,
          has: [{ type: 'header', key: 'user-agent', value: '.*(ClaudeBot|Claude-Web|anthropic-ai|GPTBot|ChatGPT-User|OAI-SearchBot|Google-Extended|Google-CloudVertexBot|Meta-ExternalAgent|Meta-ExternalFetcher|PerplexityBot|YouBot|DeepSeekBot|Amazonbot|cohere-ai|AI2Bot|Applebot-Extended|Bytespider).*' }]
        }
      )
      await writeFile(vcJSON, JSON.stringify(vcConfig, null, 2), 'utf8')
    })
  })
})
