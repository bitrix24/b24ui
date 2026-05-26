import { describe } from 'vitest'
import { renderEach } from '../component-render'
import ProsePrompt from '../../src/runtime/components/prose/Prompt.vue'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('ProsePrompt', () => {
  renderEach(ProsePrompt, [
    // Props
    ['with description', { props: { description: 'Description' } }],
    ['with icon', { props: { icon: Search2Icon } }],
    ['with iconName', { props: { iconName: 'InfoCircleIcon' } }],
    ['with actions', { props: { actions: ['copy', 'cursor', 'windsurf'] as const } }],
    ['with class', { props: { class: 'p-5' } }],
    ['with b24ui', { props: { b24ui: { icon: 'size-5' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Prompt body' } }]
  ])
})
