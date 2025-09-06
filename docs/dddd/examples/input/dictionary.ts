import { ref } from 'vue'
import type { InputProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: InputProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<InputProps['color']>((colorList[0]) as InputProps['color'])
