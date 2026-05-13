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
      'text-label'
    ].join(' '),
    hint: 'text-description',
    container: 'relative',
    description: 'leading-(--ui-font-line-height-2xs) text-description',
    error: 'text-(--ui-color-accent-main-alert)',
    errorWrapper: 'flex flex-row flex-nowrap items-center gap-0.5',
    errorIcon: 'size-4.5',
    help: 'leading-(--ui-font-line-height-2xs) italic text-description'
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
      md: { root: 'text-(length:--ui-font-size-sm)', errorIcon: 'size-4.5' },
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
    size: 'md'
  }
}
