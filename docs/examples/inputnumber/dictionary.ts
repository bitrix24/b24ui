import { ref } from 'vue'
import type { InputNumberProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: InputNumberProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<InputNumberProps['color']>((colorList[0]) as InputNumberProps['color'])
