import { ref } from 'vue'
import type { ToastProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: ToastProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning',
  'air-secondary'
]
export const colorValue = ref<ToastProps['color']>((colorList[0]) as ToastProps['color'])
