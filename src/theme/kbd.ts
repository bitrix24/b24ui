/**
 * Kbd
 * A kbd element to display a keyboard key.
 */

export default {
  slots: {
    base: [
      'ui-btn --air',
      'inline-flex items-center justify-center',
      'px-1 rounded-(--ui-border-radius-2xs)',
      'font-normal font-(family-name:--ui-font-family-system-mono)',
      'border border-(length:--ui-border-width-thin) border-(--ui-btn-border-color)',
      'text-(--ui-btn-color) bg-(--ui-btn-background)'
    ].join(' ')
  },
  variants: {
    accent: {
      default: '--style-outline',
      accent: '--style-outline-accent-1',
      less: '--style-outline-no-accent'
    },
    size: {
      sm: 'h-[20px] min-w-[20px] text-[10px] leading-none',
      md: 'h-[24px] min-w-[24px] text-[14px] leading-none',
      lg: 'h-[28px] min-w-[28px] text-[18px] leading-none'
    }
  },
  defaultVariants: {
    accent: 'less',
    size: 'md'
  }
}
