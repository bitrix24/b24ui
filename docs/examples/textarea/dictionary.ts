import { ref } from 'vue'
import type { TextareaProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: TextareaProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<TextareaProps['color']>((colorList[0]) as TextareaProps['color'])
