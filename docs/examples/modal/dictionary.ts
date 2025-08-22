import { ref } from 'vue'
import type { ModalProps } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const title = ref('Heads up!')
export const description = ref('Let\'s signal the manager that the deal is not moving.')

export const overlayBlurList: ModalProps['overlayBlur'][] = [
  'auto',
  'on',
  'off'
]
export const overlayBlurValue = ref<ModalProps['overlayBlur']>((overlayBlurList[0]) as ModalProps['overlayBlur'])
