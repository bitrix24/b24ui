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
      'text-(--ui-color-design-plain-content)',
      'ring ring-inset ring-(--ui-color-base-5)',
      'focus-visible:outline-(--b24ui-border-color)',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2'
    ].join(' '),
    indicator: [
      'flex items-center justify-center',
      'size-full',
      // 'text-(--ui-color-design-plain-content)'
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
      'text-(--ui-color-design-plain-content)'
    ].join(' '),
    description: 'text-(--ui-color-design-plain-na-content)'
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
        root: 'border border-(--ui-color-base-5) rounded-(--ui-border-radius-lg)'
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
        container: 'h-[16px]',
        wrapper: 'text-(length:--ui-font-size-xs)',
        label: 'leading-[16px]'
      },
      sm: {
        base: 'size-[14px]',
        container: 'h-[16px]',
        wrapper: 'text-(length:--ui-font-size-sm)',
        label: 'leading-[16px]'
      },
      md: {
        base: 'size-[16px]',
        container: 'h-[20px]',
        wrapper: 'text-(length:--ui-font-size-md)',
        label: 'leading-[20px]'
      },
      lg: {
        base: 'size-[20px]',
        container: 'h-[20px]',
        wrapper: 'text-(length:--ui-font-size-xl)',
        label: 'leading-[20px]'
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
    { size: 'xs', variant: 'card', class: { root: 'p-2.5' } },
    { size: 'sm', variant: 'card', class: { root: 'p-3' } },
    { size: 'md', variant: 'card', class: { root: 'p-3.5' } },
    { size: 'lg', variant: 'card', class: { root: 'p-4' } },
    // endregion ////
    // region card.border ////
    {
      variant: 'card',
      checked: true,
      class: {
        root: 'border-(--b24ui-border-color)'
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
