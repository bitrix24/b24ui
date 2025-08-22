import { ref } from 'vue'
import type { SelectMenuProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: SelectMenuProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<SelectMenuProps['color']>((colorList[0]) as SelectMenuProps['color'])
