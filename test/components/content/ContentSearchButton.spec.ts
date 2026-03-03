import { describe } from 'vitest'
import ContentSearchButton from '../../../src/runtime/components/content/ContentSearchButton.vue'
import { renderEach } from '../../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('ContentSearchButton', () => {
  renderEach(ContentSearchButton, [
    // Props
    ['with label', { props: { label: 'Open' } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with kbds', { props: { kbds: ['alt', 'o'] } }],
    ['without collapsed', { props: { collapsed: false } }],
    ['with class', { props: { class: 'w-full' } }]
  ])
})
