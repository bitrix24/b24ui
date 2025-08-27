import { ref, computed } from 'vue'
// @ts-expect-error Everything is fine, it's vitepress that's acting up
import { airColorsPrimary } from './../dictionary'
import type { AlertProps, ButtonProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/alert'

export const colorList: AlertProps['color'][] = [
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
  'air-tertiary'
]

export const colorValue = ref<AlertProps['color']>((colorList[0]) as AlertProps['color'])

export const colorPrimaryList = computed(() => {
  return airColorsPrimary(colorList)
})
export const colorPrimaryValue = ref<AlertProps['color']>((colorList[0]) as AlertProps['color'])

export const title = ref('Heads up!')
export const description = ref('Let\'s signal the manager that the deal is not moving.')

export const sizes: AlertProps['size'][] = [
  'sm',
  'md'
]
export const size = ref('md' as AlertProps['size'])

export const orientations: AlertProps['orientation'][] = [
  'vertical',
  'horizontal'
]
export const orientation = ref('vertical' as AlertProps['orientation'])

// #region snippetSimpleActions
export const alertSimpleItems = [
  {
    label: 'View',
    color: 'air-secondary-accent-1' as ButtonProps['color']
  },
  {
    label: 'Copy',
    color: 'air-secondary-accent-2' as ButtonProps['color']
  }
] satisfies ButtonProps[]
// #endregion snippetSimpleActions
