import { queryCollection } from '@nuxt/content/server'

// const DOMAIN = 'https://bitrix24.github.io/b24ui'

export default defineEventHandler(async (event) => {
  const pages = await queryCollection(event, 'docs')
    .select('path', 'title')
    .where('extension', '=', 'md')
    .where('path', 'NOT LIKE', '%/.navigation')
    .order('path', 'ASC')
    .all()

  const sections: Record<string, { title: string, path: string }[]> = {}

  for (const page of pages) {
    const parts = page.path.replace(/^\/docs\//, '').split('/')
    const sectionKey = parts[0] || 'docs'
    if (!sections[sectionKey]) {
      sections[sectionKey] = []
    }
    sections[sectionKey].push({ title: page.title, path: page.path })
  }

  const sectionLabels: Record<string, string> = {
    'getting-started': 'Getting Started',
    'components': 'Components',
    'composables': 'Composables',
    'typography': 'Typography'
  }

  let md = '# Bitrix24 UI Sitemap\n\n'
  md += '> Markdown index of every page on https://bitrix24.github.io/b24ui/. Each link points to the raw `.md` source (e.g. `https://bitrix24.github.io/b24ui/raw/docs/components.md`).\n\n'

  const config = useRuntimeConfig()
  const baseUrl = `${config.public.canonicalUrl}${config.public.baseUrl}/raw`

  for (const [key, pages] of Object.entries(sections)) {
    const label = sectionLabels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')
    md += `## ${label}\n\n`
    for (const page of pages) {
      const pageLabel = (page.title || page.path)
        .replace(/\\/g, '\\\\')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
      md += `- [${pageLabel}](${baseUrl}${page.path}.md)\n`
    }
    md += '\n'
  }

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  return md
})
