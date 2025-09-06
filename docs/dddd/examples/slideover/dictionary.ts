import { ref } from 'vue'
import type { SlideoverProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/slideover'

export const title = ref('Heads up!')
export const description = ref('Let\'s signal the manager that the deal is not moving.')

export const sideList: SlideoverProps['side'][] = [
  'bottom',
  'right',
  'top',
  'left'
]
export const sideValue = ref<SlideoverProps['side']>((sideList[0]) as SlideoverProps['side'])

export const overlayBlurList: SlideoverProps['overlayBlur'][] = [
  'auto',
  'on',
  'off'
]
export const overlayBlurValue = ref<SlideoverProps['overlayBlur']>((overlayBlurList[2]) as SlideoverProps['overlayBlur'])
