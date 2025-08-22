import { ref } from 'vue'
import type { SelectItem, SelectProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const selectItems = ['CRM settings', 'My company details', 'Access permissions'] satisfies SelectItem[]
export const selectItem = ref(selectItems[2])

export const colorList: SelectProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<SelectProps['color']>((colorList[0]) as SelectProps['color'])
