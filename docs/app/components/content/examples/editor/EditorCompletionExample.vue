<script setup lang="ts">
import type { EditorCustomHandlers, EditorToolbarItem } from '@bitrix24/b24ui-nuxt'
import { useEditorCompletion } from './EditorUseCompletion'
import CopilotIcon from '@bitrix24/b24icons-vue/solid/CopilotIcon'
import CheckGrammarIcon from '@bitrix24/b24icons-vue/editor/CheckGrammarIcon'
import MakeLongerIcon from '@bitrix24/b24icons-vue/editor/MakeLongerIcon'
import MakeShorterIcon from '@bitrix24/b24icons-vue/editor/MakeShorterIcon'
import IdeaLampIcon from '@bitrix24/b24icons-vue/outline/IdeaLampIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import TranslationIcon from '@bitrix24/b24icons-vue/outline/TranslationIcon'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'
import PenIcon from '@bitrix24/b24icons-vue/actions/PenIcon'

const config = useRuntimeConfig()
const editorRef = useTemplateRef('editorRef')

const value = ref(`# AI Completion

This editor demonstrates how to add AI-powered features using the [Vercel AI SDK](https://ai-sdk.dev/). It includes ghost text autocompletion that appears as you type (press Tab to accept) and text transformation actions.

Try selecting some text and using the AI dropdown to fix grammar, extend, or simplify it.`)

const { extension: completionExtension, handlers: aiHandlers, isLoading: aiLoading } = useEditorCompletion(editorRef)

const customHandlers = {
  ...aiHandlers
} satisfies EditorCustomHandlers

const items = computed(() => [
  [
    {
      icon: CopilotIcon,
      disabled: !config.public.useAI,
      loading: aiLoading.value,
      content: { align: 'start' },
      b24ui: { leadingIcon: 'text-(--ui-color-copilot-accent-less-1)' },
      items: [
        {
          kind: 'aiFix',
          icon: CheckGrammarIcon,
          label: 'Fix spelling & grammar'
        },
        {
          kind: 'aiExtend',
          icon: MakeLongerIcon,
          label: 'Extend text'
        },
        {
          kind: 'aiReduce',
          icon: MakeShorterIcon,
          label: 'Reduce text'
        },
        {
          kind: 'aiSimplify',
          icon: IdeaLampIcon,
          label: 'Simplify text'
        },
        {
          kind: 'aiContinue',
          icon: PenIcon,
          label: 'Continue sentence'
        },
        {
          kind: 'aiSummarize',
          icon: QuoteIcon,
          label: 'Summarize'
        },
        {
          icon: TranslationIcon,
          label: 'Translate',
          children: [
            {
              kind: 'aiTranslate',
              language: 'English',
              label: 'English'
            },
            {
              kind: 'aiTranslate',
              language: 'French',
              label: 'French'
            },
            {
              kind: 'aiTranslate',
              language: 'German',
              label: 'German'
            },
            {
              kind: 'aiTranslate',
              language: 'Russian',
              label: 'Russian'
            },
            {
              kind: 'aiTranslate',
              language: 'Spanish',
              label: 'Spanish'
            }
          ]
        }
      ]
    }
  ],
  [
    {
      icon: HeaderIcon,
      content: { align: 'start' },
      items: [
        {
          kind: 'heading',
          level: 1,
          label: 'Heading 1'
        },
        {
          kind: 'heading',
          level: 2,
          label: 'Heading 2'
        },
        {
          kind: 'heading',
          level: 3,
          label: 'Heading 3'
        }
      ]
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: BoldIcon
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: ItalicIcon
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: UnderlineIcon
    }
  ]
] satisfies EditorToolbarItem<typeof customHandlers>[][])
</script>

<template>
  <B24Editor
    ref="editorRef"
    v-slot="{ editor }"
    v-model="value"
    :extensions="[completionExtension]"
    :handlers="customHandlers"
    content-type="markdown"
    :b24ui="{ base: 'p-8 sm:px-16' }"
    class="w-full min-h-74"
  >
    <B24EditorToolbar
      :editor="editor"
      :items="items"
      class="border-b border-(--ui-color-design-tinted-na-stroke) py-2 px-8 sm:px-16 overflow-x-auto"
    />
  </B24Editor>
</template>
