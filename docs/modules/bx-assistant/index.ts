import { addComponent, addImports, addServerHandler, createResolver, defineNuxtModule, logger } from '@nuxt/kit'

export interface BxAssistantModuleOptions {
  /**
   * API endpoint path for the assistant
   * @default '/__bx__/assistant'
   */
  apiPath?: string
  /**
   * MCP server URL or path.
   * - Use a path like '/mcp' to use the built-in MCP server
   * - Use a full URL like 'https://docs.example.com/mcp' for external MCP servers
   * @default '/mcp'
   */
  mcpServer?: string
  /**
   * The DeepSeek AI model to use. Possible values: `deepseek-reasoner` | `deepseek-chat`.
   * @default 'deepseek-reasoner'
   */
  modelDeepSeek?: string
}

const log = logger.withTag('BxAssistant')

export default defineNuxtModule<BxAssistantModuleOptions>({
  meta: {
    name: 'bxAssistant',
    configKey: 'bxAssistant'
  },
  defaults: {
    apiPath: '/__bx__/assistant',
    mcpServer: '/mcp',
    modelDeepSeek: 'deepseek-reasoner'
  },
  setup(options, nuxt) {
    const hasApiKey = !!process.env.DEEPSEEK_API_KEY

    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.bxAssistant = {
      enabled: hasApiKey,
      apiPath: options.apiPath!
    }

    addImports([
      {
        name: 'useAssistant',
        from: resolve('./runtime/composables/useAssistant')
      }
    ])

    /**
     * If there is no key, then we will dynamically replace the components with a stub.
     */
    const components = [
      'AssistantChat',
      'AssistantPanel',
      'AssistantFloatingInput',
      'AssistantLoading',
      'AssistantMatrix'
    ]

    components.forEach(name =>
      addComponent({
        name,
        filePath: hasApiKey
          ? resolve(`./runtime/components/${name}.vue`)
          : resolve('./runtime/components/AssistantChatDisabled.vue')
      })
    )

    if (!hasApiKey) {
      log.warn('AI assistant disabled: DEEPSEEK_API_KEY not found')
      return
    }

    nuxt.options.runtimeConfig.bxAssistant = {
      mcpServer: options.mcpServer!,
      modelDeepSeek: options.modelDeepSeek!
    }

    const baseUrl = nuxt.options.app.baseURL ?? '/'

    const routePath = options.apiPath!.replace(baseUrl, '').replace(/^\//, '')

    addServerHandler({
      route: `/${routePath}`,
      handler: resolve('./runtime/server/api/search/')
    })
  }
})

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    bxAssistant: {
      enabled: boolean
      apiPath: string
    }
  }
  interface RuntimeConfig {
    bxAssistant: {
      mcpServer: string
      modelDeepSeek: string
    }
  }
}
