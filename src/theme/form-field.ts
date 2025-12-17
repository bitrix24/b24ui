/**
 * FormField
 * A wrapper for form elements that provides validation and error handling.
 * ---
 */

export default {
  slots: {
    root: 'font-[family-name:var(--ui-font-family-system)] font-(--ui-font-weight-regular)',
    wrapper: 'leading-(--ui-font-line-height-reset)',
    labelWrapper: 'flex content-center items-center justify-between gap-1',
    label: [
      'block',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    hint: 'text-(--b24ui-typography-description-color)',
    container: 'relative',
    description: 'leading-(--ui-font-line-height-2xs) text-(--b24ui-typography-description-color)',
    error: 'text-(--ui-color-accent-main-alert)',
    errorWrapper: 'flex flex-row flex-nowrap items-center gap-0.5',
    errorIcon: 'size-[18px]',
    help: 'leading-(--ui-font-line-height-2xs) italic text-(--b24ui-typography-description-color)'
  },
  variants: {
    useDescription: {
      true: { wrapper: '' },
      false: { wrapper: '' }
    },
    size: {
      // xss: { root: 'text-(length:--ui-font-size-3xs)', errorIcon: 'size-[16px]' },
      xs: { root: 'text-(length:--ui-font-size-xs)', errorIcon: 'size-[16px]' },
      sm: { root: 'text-(length:--ui-font-size-xs)', errorIcon: 'size-[16px]' },
      md: { root: 'text-(length:--ui-font-size-sm)', errorIcon: 'size-[18px]' },
      lg: { root: 'text-(length:--ui-font-size-md)' }
      // xl: { root: 'text-(length:--ui-font-size-md)' }
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-(--ui-color-accent-main-alert)'
      }
    },
    orientation: {
      vertical: {
        container: '', // mt-1
        description: 'mt-[2px]',
        error: 'mt-[4px]',
        errorIcon: 'mt-[2px]',
        help: 'mt-[6px]'
      },
      horizontal: {
        root: 'flex justify-between place-items-baseline gap-2'
      }
    }
  },
  compoundVariants: [
    {
      useDescription: true,
      orientation: 'vertical',
      class: { wrapper: 'mb-[6px]' }
    },
    {
      useDescription: false,
      orientation: 'vertical',
      class: { wrapper: 'mb-[10px]' }
    },
    {
      orientation: 'horizontal',
      class: { wrapper: '' }
    }
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'vertical'
  }
}
