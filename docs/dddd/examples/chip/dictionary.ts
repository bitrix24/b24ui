import { ref } from 'vue'
import type { ChipProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: ChipProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning',
  'air-secondary',
  'air-secondary-accent',
  'air-secondary-accent-1',
  'air-tertiary'
]
export const colorValue = ref<ChipProps['color']>((colorList[0]) as ChipProps['color'])
