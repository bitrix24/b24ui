import { withLeadingSlash } from 'ufo'
import { stringify } from 'minimark/stringify'
import { queryCollection } from '@nuxt/content/server'
import type { Collections, PageCollectionItemBase } from '@nuxt/content'
import { getRouterParams, eventHandler, setHeader } from 'h3'
import collections from '#content/manifest'
import { transformMDC } from '../../utils/transformMDC'
import { clearMD } from '../../utils/clearMD'

// const DOMAIN = 'https://bitrix24.github.io/b24ui'

export default eventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.canonicalUrl}${config.public.baseUrl}`

  const slug = getRouterParams(event)['slug.md']
  if (!slug?.endsWith('.md')) {
    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    return `---\ntitle: Not Found\n---\n\n# Page Not Found\n\nThe requested page does not exist. Browse the [sitemap](${config.public.baseUrl}/sitemap.md) to find available pages.\n`
  }

  let path = withLeadingSlash(slug.replace('.md', ''))
  if (path.endsWith('/index')) {
    path = path.substring(0, path.length - 6)
  }

  const _collections = Object.entries(collections as unknown as Record<string, { type: string }>)
    .filter(([_key, value]) => value.type === 'page')
    .map(([key]) => key) as string[]

  let page: PageCollectionItemBase | null = null
  for (const collection of _collections) {
    page = await queryCollection(event, collection as keyof Collections).path(path).first() as PageCollectionItemBase | null
    if (page) break
  }

  if (!page) {
    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    return `---\ntitle: Not Found\n---\n\n# Page Not Found\n\nThe page \`${config.public.baseUrl}${path}\` does not exist. Browse the [sitemap](${config.public.baseUrl}/sitemap.md) to find available pages.\n`
  }

  // Transform MDC components to standard elements for LLM consumption
  await transformMDC(event, page as any)

  // Add title and description to the top of the page if missing
  if (page.body.value[0]?.[0] !== 'h1') {
    page.body.value.unshift(['blockquote', {}, page.description])
    page.body.value.unshift(['h1', {}, page.title])
  }

  const canonicalUrl = `${baseUrl}${page.path}`
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(page.title || '')}`,
    `description: ${JSON.stringify(page.description || '')}`,
    `canonical_url: ${JSON.stringify(canonicalUrl)}`,
    `last_updated: ${JSON.stringify(new Date().toISOString().split('T')[0])}`,
    '---',
    ''
  ].join('\n')

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Link', `<${canonicalUrl}>; rel="canonical"`)
  // @see docs/server/plugins/llms.ts
  const body = clearMD(stringify({ ...page.body, type: 'minimark' }, { format: 'markdown/html' }))
  return frontmatter + body + `\n\n## Sitemap\n\nSee the full [sitemap](${config.public.baseUrl}/sitemap.md) for all pages.\n`
})
