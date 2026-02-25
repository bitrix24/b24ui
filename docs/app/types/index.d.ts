import type { FaqQuestions, LocalizedFaqQuestions } from '../../modules/bx-assistant/runtime/types'

export type { FaqCategory, FaqQuestions, LocalizedFaqQuestions } from '../../modules/bx-assistant/runtime/types'

declare module 'nuxt/schema' {
  interface AppConfig {
    docs: {
      locale: string
    }
    bxAssistant?: {
      /**
       * Show the floating input at the bottom of documentation pages.
       * @default true
       */
      floatingInput?: boolean
      /**
       * Show the "Explain with AI" button in the documentation sidebar.
       * @default true
       */
      explainWithAi?: boolean
      /**
       * FAQ questions to display in the chat slideover.
       * Can be a simple array of strings, an array of categories, or a locale-based object.
       * @example Simple format: ['How to install?', 'How to configure?']
       * @example Category format: [{ category: 'Getting Started', items: ['How to install?'] }]
       * @example Localized format: { en: ['How to install?'], fr: ['Comment installer ?'] }
       */
      faqQuestions?: FaqQuestions | LocalizedFaqQuestions
      /**
       * Keyboard shortcuts configuration.
       */
      shortcuts?: {
        /**
         * Shortcut to focus the floating input.
         * @default 'meta_i'
         */
        focusInput?: string
      }
      /**
       * Icons configuration.
       */
      icons?: {
        /**
         * Icon for the assistant trigger button and slideover header.
         * @memo we use AiStarsIcon
         * @link?: docs/modules/bx-assistant/runtime/components/AssistantChat.vue:11
         */
        // trigger?: string
        /**
         * Icon for the "Explain with AI" button.
         * @memo we use AiStarsIcon
         * @link docs/app/pages/docs/[...slug]/index.vue:162
         */
        // explain?: string
      }
    }
  }
}

export {}
