/**
 * FormField
 * A wrapper for form elements that provides validation and error handling.
 * ---
 */

export default {
  slots: {
    root: 'font-[family-name:var(--ui-font-family-system)] font-(--ui-font-weight-regular)',
    wrapper: 'leading-(--ui-font-line-height-reset)',
    labelWrapper: 'flex content-center items-center justify-between',
    label: [
      'block',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    hint: 'text-(--b24ui-typography-description-color)',
    container: 'relative',
    description: 'mt-[2px] leading-(--ui-font-line-height-2xs) text-(--b24ui-typography-description-color)',
    error: 'mt-[4px] text-(--ui-color-accent-main-alert)',
    errorWrapper: 'flex flex-row flex-nowrap items-center gap-0.5',
    errorIcon: 'size-[18px] mt-[2px]',
    help: 'mt-[6px] leading-(--ui-font-line-height-2xs) italic text-(--b24ui-typography-description-color)'
  },
  variants: {
    useDescription: {
      true: { wrapper: 'mb-[6px]' },
      false: { wrapper: 'mb-[10px]' }
    },
    size: {
      xss: { root: 'text-(length:--ui-font-size-3xs)', errorIcon: 'size-[16px]' },
      xs: { root: 'text-(length:--ui-font-size-xs)', errorIcon: 'size-[16px]' },
      sm: { root: 'text-(length:--ui-font-size-xs)', errorIcon: 'size-[16px]' },
      md: { root: 'text-(length:--ui-font-size-sm)', errorIcon: 'size-[18px]' },
      lg: { root: 'text-(length:--ui-font-size-md)' },
      xl: { root: 'text-(length:--ui-font-size-md)' }
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-(--ui-color-accent-main-alert)'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md'
  }
}
