import { ref } from 'vue'
import type { CheckboxProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: CheckboxProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<CheckboxProps['color']>((colorList[0]) as CheckboxProps['color'])
