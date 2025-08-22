import { ref } from 'vue'

export type ContentAlignVariants = 'start' | 'center' | 'end'
export const contentAlignVariants: ContentAlignVariants[] = ['start', 'center', 'end']
export const contentAlign = ref(contentAlignVariants[0])

export type ContentSideVariants = 'top' | 'right' | 'bottom' | 'left'
export const contentSideVariants: ContentSideVariants[] = ['top', 'right', 'bottom', 'left']
export const contentSide = ref(contentSideVariants[1])

export const contentSideOffset = ref<number>(8)
