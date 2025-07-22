import { computed, ref } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

export const action = ref('Action 1')
export const menuTop = computed<NavigationMenuItem[]>(() => {
  return [
    {
      label: 'Action 1',
      type: 'trigger' as NavigationMenuItem['type'],
      active: action.value === 'Action 1',
      onSelect() {
        action.value = 'Action 1'
      }
    },
    {
      label: 'Action 2',
      type: 'trigger' as NavigationMenuItem['type'],
      active: action.value === 'Action 2',
      onSelect() {
        action.value = 'Action 2'
      }
    },
    {
      label: 'Action 3',
      type: 'trigger' as NavigationMenuItem['type'],
      active: action.value === 'Action 3',
      onSelect() {
        action.value = 'Action 3'
      }
    }
  ]
})
