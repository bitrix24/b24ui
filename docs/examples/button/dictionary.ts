import { ref } from 'vue'
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: ButtonProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-secondary',
  'air-secondary-alert',
  'air-secondary-accent',
  'air-secondary-accent-1',
  'air-secondary-accent-2',
  'air-secondary-no-accent',
  'air-tertiary',
  'air-tertiary-accent',
  'air-tertiary-no-accent',
  'air-selection',
  'air-boost'
]
export const colorValue = ref<ButtonProps['color']>((colorList[0]) as ButtonProps['color'])

export const sizes: ButtonProps['size'][] = [
  'xss',
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
]
export const size = ref('md' as ButtonProps['size'])
