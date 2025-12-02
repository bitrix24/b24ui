import type { UIMessage } from 'ai'

/**
 * @see https://github.com/nuxt-modules/mcp-toolkit/blob/main/apps/docs/app/composables/useAIChat.ts
 */

export function useAIChat() {
  const isOpen = useState('ai-chat-open', () => false)
  const messages = useState<UIMessage[]>('ai-chat-messages', () => [])
  const pendingMessage = useState<string | undefined>('ai-chat-pending', () => undefined)

  function open(initialMessage?: string, clearPrevious = false) {
    if (clearPrevious) {
      messages.value = []
    }

    if (initialMessage) {
      pendingMessage.value = initialMessage
    }
    isOpen.value = true
  }

  function clearPending() {
    pendingMessage.value = undefined
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function clearMessages() {
    messages.value = []
  }

  return {
    isOpen,
    messages,
    pendingMessage,
    open,
    clearPending,
    close,
    toggle,
    clearMessages
  }
}
