import { queryCollection } from '@nuxt/content/server'
import { eventHandler, setHeader } from 'h3'

// const DOMAIN = 'https://bitrix24.github.io/b24ui'

export default eventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.canonicalUrl}${config.public.baseUrl}`
  const DOMAIN = baseUrl

  const page = await queryCollection(event, 'index').first() as any

  const title = page?.title || 'Bitrix24 UI'
  const description = page?.description || 'A comprehensive Vue UI component library (Nuxt optional) with 125+ accessible, Tailwind CSS components for building modern web applications.'

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `canonical_url: ${JSON.stringify(DOMAIN)}`,
    `last_updated: ${JSON.stringify(new Date().toISOString().split('T')[0])}`,
    '---',
    ''
  ].join('\n')

  // - MCP Server Card: <${DOMAIN}/.well-known/mcp/server-card.json>
  // - MCP endpoint: <${DOMAIN}/mcp>
  // @todo fix tg en (https://t.me/b24_dev) | ru (https://t.me/bitrix24apps)

  const body = `# ${title}

> ${description}

## About

Bitrix24 UI is a free and open source Vue UI library powered by [Reka UI](https://reka-ui.com/) and [Tailwind CSS](https://tailwindcss.com/). It works with both Nuxt and plain Vue applications.

- 125+ accessible, production-ready components
- Built on Reka UI (WAI-ARIA compliant primitives)
- Tailwind CSS theming with CSS variables and Tailwind Variants
- TypeScript support with full auto-completion
- Server-side rendering (SSR) compatible
- Dark mode support and 19 languages via i18n

## Installation

- Nuxt: <${DOMAIN}/raw/docs/getting-started/installation/nuxt.md>
- Vue: <${DOMAIN}/raw/docs/getting-started/installation/vue.md>

## Explore

- Getting started: <${DOMAIN}/raw/docs/getting-started.md>
- Components: <${DOMAIN}/raw/docs/components.md>
- Composables: <${DOMAIN}/raw/docs/composables/define-shortcuts.md>
- Typography: <${DOMAIN}/raw/docs/typography.md>
- Sitemap: <${DOMAIN}/sitemap.md>
- LLMs index: <${DOMAIN}/llms.txt>
- Full LLMs documentation: <${DOMAIN}/llms-full.txt>

## Links

- Website: <${DOMAIN}>
- GitHub: <https://github.com/bitrix24/b24ui>
- Community: <https://t.me/b24_dev>
`

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Link', `<${DOMAIN}>; rel="canonical"`)
  return frontmatter + body
})
