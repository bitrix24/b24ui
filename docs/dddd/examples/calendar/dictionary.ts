import { ref } from 'vue'
import type { CalendarProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const colorList: CalendarProps['color'][] = [
  'air-primary',
  'air-primary-success',
  'air-primary-alert',
  'air-primary-copilot',
  'air-primary-warning'
]
export const colorValue = ref<CalendarProps['color']>((colorList[0]) as CalendarProps['color'])
