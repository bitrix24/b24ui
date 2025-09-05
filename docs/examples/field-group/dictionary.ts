import { ref } from 'vue'
import type { FieldGroupProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/field-group'

export const orientations: FieldGroupProps['orientation'][] = [
  'horizontal',
  'vertical'
]
export const orientation = ref('horizontal' as FieldGroupProps['orientation'])

export const sizes: FieldGroupProps['size'][] = [
  'xss',
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
]
export const size = ref('md' as FieldGroupProps['size'])
