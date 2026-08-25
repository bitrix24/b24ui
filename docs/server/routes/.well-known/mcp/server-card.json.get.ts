/**
 * MCP server card, advertised from `/` by the `Link` header in `nuxt.config.ts`
 * as `rel="service-desc"`.
 *
 * The tool, resource and prompt lists are read from the running server so the
 * card cannot drift from what `docs/server/mcp/` registers — but that listing
 * goes through the `#nuxt-mcp-toolkit/tools.mjs` virtual module, which does not
 * resolve during prerender. This site is published statically, so the card must
 * still exist there: the listing is attempted and, when it is unavailable, the
 * card is emitted without those three arrays rather than failing the build.
 *
 * A card without them is still valid — a client discovers the catalogue by
 * calling `tools/list` on the endpoint below, which is the normal MCP flow.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const site = `${config.public.canonicalUrl}${config.public.baseUrl}`

  let definitions: {
    tools: { name: string, description?: string }[]
    resources: { name: string, uri: string, description?: string }[]
    prompts: { name: string, description?: string }[]
  } | undefined

  try {
    const { listMcpDefinitions } = await import('@nuxtjs/mcp-toolkit/server')
    definitions = await listMcpDefinitions({ event }) as typeof definitions
  } catch {
    // Prerender: the virtual tools module is not resolvable. Fall through.
  }

  setResponseHeader(event, 'Content-Type', 'application/json; charset=utf-8')

  return {
    $schema: 'https://modelcontextprotocol.io/schema/server-card/v1',
    serverInfo: {
      name: 'Bitrix24 UI',
      version: config.public.version,
      title: 'Bitrix24 UI MCP Server',
      description: 'MCP server providing tools, resources and prompts to help AI agents build with Bitrix24 UI — search components and composables, retrieve documentation, fetch component metadata, and list starter templates.',
      homepage: site,
      documentation: `${site}/docs/getting-started/`,
      license: 'MIT',
      repository: 'https://github.com/bitrix24/b24ui'
    },
    endpoints: [
      {
        type: 'streamable-http',
        url: `${site}/mcp/`
      }
    ],
    capabilities: {
      tools: { listChanged: false },
      resources: { listChanged: false, subscribe: false },
      prompts: { listChanged: false },
      logging: {}
    },
    ...(definitions
      ? {
          tools: definitions.tools.map(tool => ({ name: tool.name, description: tool.description })),
          resources: definitions.resources.map(resource => ({ name: resource.name, uri: resource.uri, description: resource.description })),
          prompts: definitions.prompts.map(prompt => ({ name: prompt.name, description: prompt.description }))
        }
      : {}),
    authentication: {
      required: false
    }
  }
})
