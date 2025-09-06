import { ref } from 'vue'
import type { InputMenuProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: InputMenuProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<InputMenuProps['color']>((colorList[0]) as InputMenuProps['color'])
