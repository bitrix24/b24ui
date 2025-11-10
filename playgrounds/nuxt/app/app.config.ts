import type { Direction } from '@bitrix24/b24ui-nuxt'

export default defineAppConfig({
  dir: 'ltr' as Direction,
  toaster: {
    position: 'top-right' as const,
    duration: 5000,
    max: 5,
    expand: true,
    disableSwipe: false
  },
  b24ui: {},
  colorMode: true,
  colorModeTypeLight: 'edge-dark' as const
})
