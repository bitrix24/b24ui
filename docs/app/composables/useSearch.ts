import type { UIMessage } from 'ai'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import ViewmodeCodeIcon from '@bitrix24/b24icons-vue/editor/ViewmodeCodeIcon'
import FormattingIcon from '@bitrix24/b24icons-vue/editor/FormattingIcon'
// import FormIcon from '@bitrix24/b24icons-vue/outline/FormIcon'
// import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

/**
 * @memo not use AIChat at this place
 * @see docs/app/components/AIChatSlideover.vue
 */
// const isDev = import.meta.dev
const isDev = false

export function useSearch() {
  const route = useRoute()
  const { frameworks } = useFrameworks()

  const chat = ref(false)
  const fullscreen = ref(false)
  const searchTerm = ref('')
  const messages = ref<UIMessage[]>([])

  function onSelect(e: any) {
    e.preventDefault()

    messages.value = searchTerm.value
      ? [{
          id: '1',
          role: 'user',
          parts: [{ type: 'text', text: searchTerm.value }]
        }]
      : [{
          id: '1',
          role: 'assistant',
          parts: [{ type: 'text', text: 'Hello, how can I help you today?' }]
        }]

    chat.value = true
  }

  const links = computed(() => [
    ...(
      isDev
        ? [
            !searchTerm.value && {
              label: 'Ask AI',
              description: 'Ask the AI assistant powered by our custom MCP server for help.',
              icon: RobotIcon,
              b24ui: {
                itemLeadingIcon: 'text-(--ui-color-accent-main-primary) group-data-highlighted:not-group-data-disabled:text-(--ui-color-copilot-accent-primary)'
              },
              onSelect
            }
          ]
        : []
    ),
    {
      label: 'Docs',
      description: 'Learn how to get started with Bitrix24 UI.',
      icon: PlayLIcon,
      to: '/docs/getting-started/',
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Components',
      description: 'Explore the components available in Bitrix24 UI.',
      icon: DeveloperResourcesIcon,
      to: '/docs/components/',
      active: route.path.startsWith('/docs/components')
    },
    {
      label: 'Composables',
      description: 'Learn how to use the composables available in Bitrix24 UI.',
      icon: ViewmodeCodeIcon,
      to: '/docs/composables/define-shortcuts/',
      active: route.path.startsWith('/docs/composables')
    },
    {
      label: 'Typography',
      description: 'Discover the typography features and customization options in Bitrix24 UI.',
      icon: FormattingIcon,
      to: '/docs/typography/',
      active: route.path.startsWith('/docs/typography')
    },
    // {
    //   label: 'Templates',
    //   icon: FormIcon,
    //   description: 'Explore official templates built with Bitrix24 UI.',
    //   to: '/templates/'
    // },
    // {
    //   label: 'Showcase',
    //   icon: DemonstrationOnIcon,
    //   description: 'Explore some of the amazing projects built with Bitrix24 UI.',
    //   to: '/showcase/'
    // },
    {
      label: 'GitHub',
      description: 'Check out the Bitrix24 UI repository and follow development on GitHub.',
      icon: GitHubIcon,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }
  ].filter(link => !!link))

  const groups = computed(() => [
    ...(
      isDev
        ? [{
            id: 'ai',
            label: 'AI',
            ignoreFilter: true,
            items: searchTerm.value
              ? [{
                  label: `Ask AI for “${searchTerm.value}”`,
                  icon: RobotIcon,
                  b24ui: {
                    itemLeadingIcon: 'text-(--ui-color-accent-main-primary) group-data-highlighted:not-group-data-disabled:text-(--ui-color-copilot-accent-primary)'
                  },
                  onSelect
                }]
              : []
          }]
        : []
    ),
    {
      id: 'framework',
      label: 'Framework',
      items: frameworks.value
    }
  ])

  return {
    links,
    groups,
    chat,
    fullscreen,
    searchTerm,
    messages
  }
}
