/**
 * Switch
 * A control that toggles between two states.
 * ---
 * @link bitrix/js/...
 */

/**
 * @todo at desc link to b24.ui
 */
export default {
  slots: {
    root: 'relative flex items-start',
    base: [
      'cursor-pointer',
      'inline-flex items-center',
      'shrink-0',
      'rounded-(--ui-border-radius-pill)',
      'outline-(--ui-color-background-transparent)',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'transition-[background] duration-200',
      'border-2 border-(--ui-color-background-transparent)',
      'data-[state=unchecked]:bg-(--ui-color-base-5)',
      'data-[state=checked]:bg-(--b24ui-background) focus-visible:outline-(--b24ui-border-color)'
    ].join(' '),
    container: 'flex items-center',
    thumb: [
      'group', 'pointer-events-none',
      'flex items-center justify-center',
      'rounded-(--ui-border-radius-pill)',
      'bg-(--ui-color-base-white-fixed)',
      'shadow-lg',
      'ring-0',
      'transition-transform duration-200',
      'data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0'
    ].join(' '),
    icon: [
      'absolute shrink-0',
      'group-data-[state=unchecked]:text-(--ui-color-base-5) edge-dark:group-data-[state=unchecked]:text-(--ui-color-gray-60)',
      'opacity-0',
      'p-0.5',
      'size-full',
      'transition-[color,opacity] duration-200',
      'group-data-[state=checked]:text-(--b24ui-background)'
    ].join(' '),
    wrapper: [
      'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
      'ms-2'
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
      'air-primary': { base: 'style-filled' },
      'air-primary-success': { base: 'style-filled-success' },
      'air-primary-alert': { base: 'style-filled-alert' },
      'air-primary-copilot': { base: 'style-filled-copilot' },
      'air-primary-warning': { base: 'style-filled-warning' },
      // @deprecate ////
      'default': { base: 'style-old-default' },
      'danger': { base: 'style-old-danger' },
      'success': { base: 'style-old-success' },
      'warning': { base: 'style-old-warning' },
      'primary': { base: 'style-old-primary' },
      'secondary': { base: 'style-old-secondary' },
      'collab': { base: 'style-old-collab' },
      'ai': { base: 'style-old-ai' }
    },
    size: {
      xs: {
        base: 'w-[28px]',
        container: 'h-[16px]',
        thumb: 'size-[12px] data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3',
        wrapper: 'text-(length:--ui-font-size-xs)',
        label: 'leading-[16px]'
      },
      sm: {
        base: 'w-[32px]',
        container: 'h-[16px]',
        thumb: 'size-[14px] data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5',
        wrapper: 'text-(length:--ui-font-size-sm)',
        label: 'leading-[16px]'
      },
      md: {
        base: 'w-[36px]',
        container: 'h-[20px]',
        thumb: 'size-[16px] data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4',
        wrapper: 'text-(length:--ui-font-size-md)',
        label: 'leading-[20px]'
      },
      lg: {
        base: 'w-[40px]',
        container: 'h-[20px]',
        thumb: 'size-[20px] data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4',
        wrapper: 'text-(length:--ui-font-size-xl)',
        label: 'leading-[20px]'
      }
    },
    checked: {
      true: {
        icon: 'group-data-[state=checked]:opacity-100'
      }
    },
    unchecked: {
      true: {
        icon: 'group-data-[state=unchecked]:opacity-100'
      }
    },
    loading: {
      true: {
        icon: 'animate-spin'
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
    }
  },
  defaultVariants: {
    color: 'air-primary',
    size: 'md'
  }
}
