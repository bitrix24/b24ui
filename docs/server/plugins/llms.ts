import type { H3Event } from 'h3'
import type { PageCollectionItemBase } from '@nuxt/content'
import { withoutTrailingSlash } from 'ufo'
import { clearMD } from '../utils/clearMD'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:llms:generate:document', async (event: H3Event, doc: PageCollectionItemBase) => {
    if (doc.body.value[0]?.[0] !== 'h1') {
      doc.body.value.push(['hr', {}, ''])
      doc.body.value.unshift(['blockquote', {}, doc.description])
    }

    await transformMDC(event, doc as any)
  })

  nitroApp.hooks.hook('llms:generate', (_, { sections }) => {
    // Transform links except for "Documentation Sets"
    sections.forEach((section) => {
      if (section.title !== 'Documentation Sets') {
        section.links = section.links.map(link => ({
          ...link,
          href: transformRawLink(link.href)
        }))
      }
    })

    // Move "Documentation Sets" to the end
    const docSetIdx = sections.findIndex(s => s.title === 'Documentation Sets')
    if (docSetIdx !== -1) {
      const [docSet] = sections.splice(docSetIdx, 1)
      sections.push(docSet)
    }
  })

  /**
   * @see docs/server/routes/raw/[...slug].md.get.ts
   */
  nitroApp.hooks.hook('beforeResponse', (event, content) => {
    if (event.path === '/llms-full.txt') {
      content.body = clearMD(content.body)
    }
  })
})

function transformRawLink(href: string) {
  const config = useRuntimeConfig()

  return `${withoutTrailingSlash(href.replace(new RegExp(`^${config.public.canonicalUrl}${config.public.baseUrl}`), `${config.public.canonicalUrl}${config.public.baseUrl}/raw`))}.md`
}
