import { ref } from 'vue'
import type { SwitchProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: SwitchProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<SwitchProps['color']>((colorList[0]) as SwitchProps['color'])
