/**
 * PinInput
 * ---
 * @see Input
 * @todo doc
 */
export default () => ({
  slots: {
    root: 'relative inline-flex items-center gap-1.5',
    base: [
      'px-0 py-0',
      'border-0 focus:outline-none',
      'disabled:cursor-not-allowed',
      'disabled:pointer-events-none',
      'disabled:select-none',
      'disabled:opacity-30',
      'disabled:resize-none',
      'text-center',
      'appearance-none transition duration-300 ease-linear', // transition-colors
      'text-(--ui-color-base-1)',
      'style-blurred-bg-input',
      'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
      'hover:text-(--ui-color-base-1)',
      'focus:text-(--ui-color-base-1)',
      'active:text-(--ui-color-base-1)',
      'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
      'focus-visible:ring-1',
      'focus-visible:ring-inset',
      'focus-visible:ring-(--b24ui-border-color)'
    ].join(' ')
  },
  variants: {
    size: {
      xss: {
        base: 'size-[20px] text-(length:--ui-font-size-4xs)/[normal]'
      },
      xs: {
        base: 'size-[24px] text-(length:--ui-font-size-xs)/[normal]'
      },
      sm: {
        base: 'size-[28px] text-(length:--ui-font-size-sm)/[normal]'
      },
      md: {
        base: 'size-[34px] text-(length:--ui-font-size-lg)/[normal]'
      },
      lg: {
        base: 'size-[38px] text-(length:--ui-font-size-lg)/[normal]'
      },
      xl: {
        base: 'size-[46px] text-(length:--ui-font-size-2xl)/[normal]'
      }
    },
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
    rounded: {
      true: 'rounded-(--ui-border-radius-3xl)',
      false: 'rounded-(--ui-border-radius-sm)'
    },
    noBorder: { true: 'ring-0 focus-visible:ring-0 style-transparent-bg' },
    underline: {
      true: [
        'rounded-none',
        'ring-0 focus-visible:ring-0 style-transparent-bg',
        'border-b-1',
        'border-b-(--ui-color-design-outline-stroke)'
      ].join(' ')
    },
    highlight: { true: 'ring ring-inset ring-(--b24ui-border-color)' },
    fixed: {
      false: ''
    }
  },
  compoundVariants: [
    // region ring for focus and highlight ////
    {
      highlight: false,
      noBorder: false,
      underline: false,
      class: {
        base: [
          'ring ring-inset',
          'ring-(--ui-color-design-outline-stroke)',
          'focus-visible:ring-1',
          'focus-visible:ring-inset',
          'focus-visible:ring-(--b24ui-border-color)',
          'hover:not-disabled:not-data-disabled:ring-1 hover:not-disabled:not-data-disabled:ring-inset hover:not-disabled:not-data-disabled:ring-(--b24ui-border-color)',
          'data-[state=open]:ring-1 data-[state=open]:ring-inset data-[state=open]:ring-(--b24ui-border-color)'
        ].join(' ')
      }
    },
    {
      highlight: true,
      noBorder: false,
      underline: false,
      class: {
        base: [
          'ring ring-inset',
          'ring-(--b24ui-border-color)',
          'focus-visible:ring-1',
          'focus-visible:ring-inset',
          'focus-visible:ring-(--b24ui-border-color)',
          'hover:ring-1 hover:ring-inset hover:ring-(--b24ui-border-color)',
          'data-[state=open]:ring-1 data-[state=open]:ring-inset data-[state=open]:ring-(--b24ui-border-color)'
        ].join(' ')
      }
    },
    {
      noBorder: false,
      underline: true,
      class: {
        base: [
          'focus-visible:border-(--b24ui-border-color)'
        ].join(' ')
      }
    },
    {
      highlight: true,
      noBorder: false,
      underline: true,
      class: {
        base: [
          'ring-0',
          'border-b-(--b24ui-border-color)'
        ].join(' ')
      }
    },
    {
      highlight: true,
      noBorder: true,
      underline: false,
      class: {
        base: [
          'ring-0'
        ].join(' ')
      }
    },
    // endregion ////
    // region fixed ////
    {
      fixed: false,
      size: 'xss',
      class: 'md:text-(length:--ui-font-size-4xs)/[normal]'
    },
    {
      fixed: false,
      size: 'xs',
      class: 'md:text-(length:--ui-font-size-xs)/[normal]'
    },
    {
      fixed: false,
      size: 'sm',
      class: 'md:text-(length:--ui-font-size-sm)/[normal]'
    },
    {
      fixed: false,
      size: 'md',
      class: 'md:text-(length:--ui-font-size-lg)/[normal]'
    },
    {
      fixed: false,
      size: 'lg',
      class: 'md:text-(length:--ui-font-size-lg)/[normal]'
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'md',
    color: 'air-primary'
  }
})
