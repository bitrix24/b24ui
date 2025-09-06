import { ref } from 'vue'
import type { BadgeProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: BadgeProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning',
  'air-secondary',
  'air-secondary-alert',
  'air-secondary-accent',
  'air-secondary-accent-1',
  'air-secondary-accent-2',
  'air-tertiary',
  'air-selection'
]
export const colorValue = ref<BadgeProps['color']>((colorList[0]) as BadgeProps['color'])
