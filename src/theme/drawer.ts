/**
 * Drawer
 * A toggleable drawer with fluid enter/exit transitions.
 * ---
 */
export default {
  slots: {
    overlay: 'fixed inset-0',
    content: [
      'fixed',
      'base-mode',
      'bg-(--ui-color-bg-content-primary)',
      'flex',
      'focus:outline-none',
      'ring ring-(--ui-color-divider-default)'
    ].join(' '),
    handle: 'shrink-0 !bg-(--ui-color-divider-default) transition-opacity',
    container: 'w-full flex flex-col gap-4 p-4 overflow-y-auto',
    header: '',
    title: [
      'font-[family-name:var(--ui-font-family-primary)]',
      'text-(--b24ui-typography-label-color)',
      'font-(--ui-font-weight-medium)',
      'mb-0',
      'text-[calc(var(--ui-font-size-2xl)+2px)]/(--ui-font-size-2xl)'
    ].join(' '),
    description: [
      'mt-1',
      'text-(--b24ui-typography-description-color)',
      'text-(length:--ui-font-size-sm)'
    ].join(' '),
    body: 'flex-1',
    footer: 'flex flex-col gap-1.5'
  },
  variants: {
    overlayBlur: {
      auto: { overlay: 'motion-safe:backdrop-blur-[2px]' },
      on: { overlay: 'backdrop-blur-[2px]' },
      off: { overlay: '' }
    },
    scrollbarThin: {
      true: {
        body: 'scrollbar-thin'
      }
    },
    overlay: {
      true: {
        overlay: 'bg-[#003366]/20'
      }
    },
    direction: {
      top: {
        content: 'mb-24 flex-col-reverse',
        handle: 'mb-4'
      },
      right: {
        content: 'flex-row',
        handle: '!ml-4'
      },
      bottom: {
        content: 'mt-24 flex-col',
        handle: 'mt-4'
      },
      left: {
        content: 'flex-row-reverse',
        handle: '!mr-4'
      }
    },
    inset: {
      true: {
        content: 'rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]'
      }
    },
    snapPoints: {
      true: ''
    }
  },
  compoundVariants: [
    {
      direction: ['top', 'bottom'],
      class: {
        content: 'h-auto max-h-[96%]',
        handle: '!w-12 !h-1.5 mx-auto'
      }
    },
    {
      direction: ['top', 'bottom'],
      snapPoints: true,
      class: {
        content: 'h-full'
      }
    },
    {
      direction: ['right', 'left'],
      class: {
        content: 'w-auto max-w-[calc(100%-2rem)]',
        handle: '!h-12 !w-1.5 mt-auto mb-auto'
      }
    },
    {
      direction: ['right', 'left'],
      snapPoints: true,
      class: {
        content: 'w-full'
      }
    },
    {
      direction: 'top',
      inset: true,
      class: {
        content: 'inset-x-4 top-4'
      }
    },
    {
      direction: 'top',
      inset: false,
      class: {
        content: 'inset-x-0 top-0 rounded-b-lg'
      }
    },
    {
      direction: 'bottom',
      inset: true,
      class: {
        content: 'inset-x-4 bottom-4'
      }
    },
    {
      direction: 'bottom',
      inset: false,
      class: {
        content: 'inset-x-0 bottom-0 rounded-t-lg'
      }
    },
    {
      direction: 'left',
      inset: true,
      class: {
        content: 'inset-y-4 left-4'
      }
    },
    {
      direction: 'left',
      inset: false,
      class: {
        content: 'inset-y-0 left-0 rounded-r-lg'
      }
    },
    {
      direction: 'right',
      inset: true,
      class: {
        content: 'inset-y-4 right-4'
      }
    },
    {
      direction: 'right',
      inset: false,
      class: {
        content: 'inset-y-0 right-0 rounded-l-lg'
      }
    }
  ]
}
