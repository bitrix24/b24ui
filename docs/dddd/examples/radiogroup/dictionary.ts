import { ref } from 'vue'
import type { RadioGroupProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: RadioGroupProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<RadioGroupProps['color']>((colorList[0]) as RadioGroupProps['color'])
