import b24 from '../../../src/runtime/dictionary/icons'

export const themeIcons = { b24 }

export type ThemeIcons = keyof typeof themeIcons

export const cssVariableDefaults = {
  light: {},
  dark: {}
} as const
