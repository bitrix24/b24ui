/**
 * Checkbox
 * An input element to toggle between checked and unchecked states.
 * ---
 */
export default {
  slots: {
    root: 'relative flex items-start',
    base: [
      'cursor-pointer',
      'flex items-center justify-center',
      'shrink-0',
      'rounded-(--ui-border-radius-2xs)',
      'text-(--b24ui-typography-label-color)',
      'ring ring-inset ring-(--ui-color-base-5)',
      'focus-visible:outline-(--b24ui-border-color)',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2'
    ].join(' '),
    indicator: [
      'rounded-(--ui-border-radius-2xs)',
      'flex items-center justify-center',
      'size-full',
      'text-(--b24ui-color)',
      'ring-1 ring-(--b24ui-background)',
      'bg-(--b24ui-background)'
    ].join(' '),
    container: 'flex items-center',
    icon: 'shrink-0 size-full',
    wrapper: [
      'w-full',
      'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)'
    ].join(' '),
    label: [
      'cursor-pointer',
      'block',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    description: 'mt-[4px] text-(--b24ui-typography-description-color)'
  },
  variants: {
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' },
      // @deprecate ////
      'default': { root: 'style-old-default' },
      'danger': { root: 'style-old-danger' },
      'success': { root: 'style-old-success' },
      'warning': { root: 'style-old-warning' },
      'primary': { root: 'style-old-primary' },
      'secondary': { root: 'style-old-secondary' },
      'collab': { root: 'style-old-collab' },
      'ai': { root: 'style-old-ai' }
    },
    variant: {
      list: {
        root: ''
      },
      card: {
        // @memo style-outline-no-accent
        root: 'border border-(--ui-color-design-outline-na-stroke) bg-(--ui-color-design-outline-na-bg)'
      }
    },
    indicator: {
      start: {
        root: 'flex-row',
        wrapper: 'ms-2'
      },
      end: {
        root: 'flex-row-reverse',
        wrapper: 'me-2'
      },
      hidden: {
        base: 'sr-only',
        wrapper: 'text-center'
      }
    },
    size: {
      xs: {
        base: 'size-[12px]',
        container: 'h-[12px]',
        wrapper: 'text-(length:--ui-font-size-xs) leading-[11px]',
        label: ''
      },
      sm: {
        base: 'size-[14px]',
        container: 'h-[14px]',
        wrapper: 'text-(length:--ui-font-size-sm) leading-[14px]',
        label: ''
      },
      md: {
        base: 'size-[16px]',
        container: 'h-[16px]',
        wrapper: 'text-(length:--ui-font-size-lg) leading-[16px]',
        label: ''
      },
      lg: {
        base: 'size-[20px]',
        container: 'h-[20px]',
        wrapper: 'text-(length:--ui-font-size-xl) leading-[18px]',
        label: ''
      }
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-(--ui-color-accent-main-alert)'
      }
    },
    disabled: {
      true: {
        root: 'opacity-30',
        base: 'cursor-not-allowed',
        label: 'cursor-not-allowed',
        description: 'cursor-not-allowed'
      }
    },
    checked: {
      true: ''
    }
  },
  compoundVariants: [
    // region card.size ////
    { size: 'xs', variant: 'card', class: { root: 'px-[13px] py-[7px] rounded-(--ui-border-radius-xs)' } }, // (28 - (1 + 1) - 12) / 2 = 7
    { size: 'sm', variant: 'card', class: { root: 'px-[13px] py-[9px] rounded-(--ui-border-radius-sm)' } }, // (34 - (1 + 1) - 14) / 2 = 9
    { size: 'md', variant: 'card', class: { root: 'px-[17px] py-[10px] rounded-(--ui-border-radius-md)' } }, // (38 - (1 + 1) - 16) / 2 = 10
    { size: 'lg', variant: 'card', class: { root: 'px-[23px] py-[12px] rounded-(--ui-border-radius-md)' } }, // (46 - (1 + 1) - 20) / 2 = 12
    // endregion ////
    // region card.border ////
    {
      variant: 'card',
      checked: true,
      class: {
        root: 'border-(--b24ui-border-color) cursor-pointer'
      }
    },
    // endregion ////
    {
      variant: 'card',
      disabled: true,
      class: {
        root: 'cursor-not-allowed'
      }
    }
  ],
  defaultVariants: {
    color: 'air-primary',
    size: 'md',
    variant: 'list',
    indicator: 'start'
  }
}
