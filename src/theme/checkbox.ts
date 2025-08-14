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
      'flex items-center justify-center',
      'size-full',
      'text-(--b24ui-color)'
    ].join(' '),
    container: 'flex items-center',
    icon: 'shrink-0 size-full',
    wrapper: [
      'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)'
    ].join(' '),
    label: [
      'cursor-pointer',
      'block',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    description: 'text-(--b24ui-typography-description-color)'
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
        wrapper: 'text-(length:--ui-font-size-xs)',
        label: 'leading-[11px]'
      },
      sm: {
        base: 'size-[14px]',
        container: 'h-[14px]',
        wrapper: 'text-(length:--ui-font-size-sm)',
        label: 'leading-[14px]'
      },
      md: {
        base: 'size-[16px]',
        container: 'h-[16px]',
        wrapper: 'text-(length:--ui-font-size-lg)',
        label: 'leading-[15px]'
      },
      lg: {
        base: 'size-[20px]',
        container: 'h-[20px]',
        wrapper: 'text-(length:--ui-font-size-xl)',
        label: 'leading-[18px]'
      }
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-(--ui-color-accent-main-alert)'
      }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-75',
        label: 'cursor-not-allowed opacity-75',
        description: 'cursor-not-allowed opacity-75'
      }
    },
    checked: {
      true: {
        base: 'ring-1 ring-(--b24ui-background) bg-(--b24ui-background)'
      }
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
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'air-primary',
    size: 'md',
    variant: 'list',
    indicator: 'start'
  }
}
