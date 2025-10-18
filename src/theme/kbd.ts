/**
 * Kbd
 * A kbd element to display a keyboard key.
 * ---
 * @memo not use color
 * @memo not use variant
 */

export default {
  slots: {
    base: [
      'inline-flex items-center justify-center',
      'px-1',
      'rounded-(--ui-border-radius-2xs)',
      'font-(--ui-font-weight-normal) font-[family-name:var(--ui-font-family-system-mono)]',
      'uppercase',
      'border border-(length:--b24ui-border-width) border-(--b24ui-border-color)',
      'text-(--b24ui-color) bg-(--b24ui-background)'
    ].join(' ')
  },
  variants: {
    accent: {
      default: 'style-outline',
      accent: 'style-outline-accent-1',
      less: 'style-outline-no-accent'
    },
    size: {
      sm: 'h-[20px] min-w-[20px] text-(length:--ui-font-size-4xs)/(--ui-font-line-height-reset)',
      md: 'h-[24px] min-w-[24px] text-(length:--ui-font-size-md)/(--ui-font-line-height-reset)',
      lg: 'h-[28px] min-w-[28px] text-(length:--ui-font-size-2xl)/(--ui-font-line-height-reset)'
    }
  },
  defaultVariants: {
    accent: 'less',
    size: 'md'
  }
}
