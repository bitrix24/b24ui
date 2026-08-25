/**
 * RFC 9727 api-catalog: a linkset naming the machine-readable descriptions of
 * this site, advertised from `/` by the `Link` header in `nuxt.config.ts`.
 *
 * Only endpoints this site actually serves are listed. Upstream anchors an
 * `openapi.json` here too; this fork has none, so it is absent by construction
 * rather than by omission.
 */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const site = `${config.public.canonicalUrl}${config.public.baseUrl}`

  const linkset = {
    linkset: [
      {
        'anchor': `${site}/mcp/`,
        'service-desc': [
          {
            href: `${site}/.well-known/mcp/server-card.json`,
            type: 'application/json'
          }
        ],
        'service-doc': [
          {
            href: `${site}/docs/getting-started/`,
            type: 'text/html'
          }
        ]
      },
      {
        'anchor': `${site}/docs`,
        'service-desc': [
          { href: `${site}/llms.txt`, type: 'text/plain' },
          { href: `${site}/llms-full.txt`, type: 'text/plain' },
          { href: `${site}/sitemap.md`, type: 'text/markdown' }
        ],
        'service-doc': [
          {
            href: `${site}/docs`,
            type: 'text/html'
          }
        ]
      }
    ]
  }

  setResponseHeader(event, 'Content-Type', 'application/linkset+json; charset=utf-8')
  return linkset
})
