/**
 * FileUpload
 * ---
 * @todo add demo
 * @todo add docs
 * @todo fix color
 */
export default {
  slots: {
    root: [
      'relative',
      'flex flex-col'
    ].join(' '),
    base: [
      'w-full',
      'flex-1',
      'bg-(--b24ui-background)/90',
      'border-(--b24ui-border-color) border-(length:--b24ui-border-width)',
      'text-(--b24ui-color)',
      'flex flex-col gap-2 items-stretch justify-center',
      'rounded-(--ui-border-radius-md)',
      'focus-visible:outline-2',
      'transition-[background]'
    ].join(' '),
    wrapper: 'flex flex-col items-center justify-center text-center',
    icon: 'shrink-0',
    avatar: 'shrink-0',
    label: 'mt-2 text-(--b24ui-color) font-(--ui-font-weight-medium)',
    description: 'mt-1 text-(--b24ui-typography-description-color)',
    actions: 'mt-4 flex flex-wrap gap-1.5 shrink-0',
    files: '',
    file: 'relative',
    fileLeadingAvatar: 'shrink-0',
    fileWrapper: 'flex flex-col min-w-0',
    fileName: 'text-(--b24ui-color) truncate',
    fileSize: 'text-(--b24ui-typography-description-color) truncate',
    fileTrailingButton: ''
  },
  variants: {
    color: {
      'air-primary': { root: 'light style-filled-inverted' },
      'air-primary-success': { root: 'light style-filled-success-inverted' },
      'air-primary-alert': { root: 'light style-filled-alert-inverted' },
      'air-primary-copilot': { root: 'light style-filled-copilot-inverted' },
      'air-primary-warning': { root: 'light style-filled-warning-inverted' },
      'air-secondary': { root: 'style-outline' },
      'air-secondary-alert': { root: 'light style-tinted-alert' },
      'air-secondary-accent': { root: 'light style-tinted' },
      'air-secondary-accent-1': { root: 'style-outline-accent-1' },
      'air-secondary-accent-2': { root: 'style-outline-accent-2' },
      'air-tertiary': { root: 'style-outline-no-accent' }
    },
    variant: {
      area: {
        wrapper: 'px-4 py-3',
        base: 'p-4'
      },
      button: {
      }
    },
    size: {
      xs: {
        base: 'text-(length:--ui-font-size-xs)',
        icon: 'size-4',
        file: 'text-(length:--ui-font-size-xs) px-2 py-1 gap-1',
        fileWrapper: 'flex-row gap-1'
      },
      sm: {
        base: 'text-(length:--ui-font-size-xs)',
        icon: 'size-4',
        file: 'text-(length:--ui-font-size-xs) px-2.5 py-1.5 gap-1.5',
        fileWrapper: 'flex-row gap-1'
      },
      md: {
        base: 'text-(length:--ui-font-size-sm)',
        icon: 'size-5',
        file: 'text-(length:--ui-font-size-xs) px-2.5 py-1.5 gap-1.5'
      },
      lg: {
        base: 'ext-(length:--ui-font-size-sm)',
        icon: 'size-5',
        file: 'ext-(length:--ui-font-size-sm) px-3 py-2 gap-2',
        fileSize: 'ext-(length:--ui-font-size-xs)'
      }
    },
    layout: {
      list: {
        root: 'gap-2 items-start',
        files: 'flex flex-col w-full gap-2',
        file: [
          'min-w-0',
          'w-full',
          'rounded-(--ui-border-radius-md)',
          'flex items-center',
          'border border-(--b24ui-border-color)'
        ].join(' '),
        fileTrailingButton: 'ms-auto'
      },
      grid: {
        fileWrapper: 'hidden',
        fileLeadingAvatar: 'size-full rounded-lg',
        fileTrailingButton: [
          'absolute',
          '-top-1.5',
          '-end-1.5',
          'rounded-(--ui-border-radius-pill)',
          'border',
          // @memo change color|bg for btn
          'edge-light:[--ui-btn-background:var(--ui-color-base-white-fixed)]',
          'edge-dark:[--ui-btn-background:var(--ui-color-base-white-fixed)]',
          'edge-dark:hover:bg-(--ui-color-base-white-fixed)/90',
          'edge-dark:[--ui-btn-color:var(--ui-color-g-content-grey-1)]',
          'dark:[--ui-btn-background:var(--ui-color-g-content-grey-1)]',
          'dark:hover:bg-(--ui-color-g-content-grey-1)/90',
          'dark:[--ui-btn-color:var(--ui-color-g-content-grey-4)]'
        ].join(' ')
      }
    },
    position: {
      inside: '',
      outside: ''
    },
    dropzone: {
      true: [
        'border-dashed',
        'data-[dragging=true]:bg-(--ui-color-accent-soft-grey-1)/90'
      ].join(' ')
    },
    interactive: {
      true: ''
    },
    highlight: {
      true: ''
    },
    multiple: {
      true: ''
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    }
  },
  compoundVariants: [
    {
      class: 'focus-visible:outline-inverted'
    },
    {
      highlight: true,
      class: 'border-inverted'
    },
    {
      size: 'xs',
      layout: 'list',
      class: {
        fileTrailingButton: '-me-1'
      }
    },
    {
      size: 'sm',
      layout: 'list',
      class: {
        fileTrailingButton: '-me-1.5'
      }
    },
    {
      size: 'md',
      layout: 'list',
      class: {
        fileTrailingButton: '-me-1.5'
      }
    },
    {
      size: 'lg',
      layout: 'list',
      class: {
        fileTrailingButton: '-me-2'
      }
    },
    {
      variant: 'button',
      size: 'xs',
      class: {
        base: 'p-1'
      }
    },
    {
      variant: 'button',
      size: 'sm',
      class: {
        base: 'p-1.5'
      }
    },
    {
      variant: 'button',
      size: 'md',
      class: {
        base: 'p-1.5'
      }
    },
    {
      variant: 'button',
      size: 'lg',
      class: {
        base: 'p-2'
      }
    },
    {
      layout: 'grid',
      multiple: true,
      class: {
        files: 'grid grid-cols-2 md:grid-cols-3 gap-4 w-full',
        file: 'p-0 aspect-square'
      }
    },
    {
      layout: 'grid',
      multiple: false,
      class: {
        file: 'absolute inset-0 p-0'
      }
    },
    {
      interactive: true,
      disabled: false,
      class: 'hover:bg-elevated/25'
    }
  ],
  defaultVariants: {
    color: 'air-tertiary',
    variant: 'area',
    size: 'md'
  }
}
