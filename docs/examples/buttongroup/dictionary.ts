import { ref } from 'vue'
import type { ButtonGroupProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const orientations: ButtonGroupProps['orientation'][] = [
  'horizontal',
  'vertical'
]
export const orientation = ref('horizontal' as ButtonGroupProps['orientation'])

export const sizes: ButtonGroupProps['size'][] = [
  'xss',
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
]
export const size = ref('md' as ButtonGroupProps['size'])
