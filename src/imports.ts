// Keep in sync with the actual named exports from each composable file.
// Used by both the Nuxt module (`addImports`) and Vite plugin (`unplugin-auto-import`).
import {useLocale} from "#b24ui/composables";

export const publicComposables: Record<string, string[]> = {
  defineLocale: ['defineLocale', 'extendLocale'],
  defineShortcuts: ['defineShortcuts', 'extractShortcuts'],
  useContentSearch: ['useContentSearch'],
  useFileUpload: ['useFileUpload'],
  useFormField: ['useFormField'],
  useKbd: ['useKbd'],
  useOverlay: ['useOverlay'],
  useResizable: ['useResizable'],
  useScrollShadow: ['useScrollShadow'],
  useScrollspy: ['useScrollspy'],
  useToast: ['useToast'],
  // special composables
  useLocale: ['useLocale'],
  useDevice: ['useDevice'],
  useConfetti: ['useConfetti'],
  useSpeechRecognition: ['useSpeechRecognition']
  // @todo fix this
  // export * from './color-mode/useColorMode'
}
