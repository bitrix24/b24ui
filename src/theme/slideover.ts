/**
 * Slideover
 * A dialog that slides in from any side of the screen.
 * ---
 * @link: /api_help/js_lib/sidepanel/index.php
 * @see `sidepanel` -> BX.SidePanel.Instance.open
 * @see src/theme/modal.ts
 */

const safeList = [
  'group-hover:rounded-full group-hover:border-1 group-hover:border-current'
].join(' ')

export default {
  slots: {
    overlay: 'fixed inset-0 bg-linear-to-b from-[#00204e]/52 to-[#00204e]', //
    content: [
      'fixed',
      'sm:shadow-lg',
      'flex flex-col focus:outline-none',
      'h-full'
    ].join(' '),
    sidebarLayoutRoot: 'relative',
    sidebarLayoutHeaderWrapper: 'relative',
    sidebarLayoutPageWrapper: 'min-h-full pb-[calc(53px_+_10px)] px-[20px] ps-[20px] pe-[20px] pb-[20px] overflow-y-auto scrollbar-thin',
    sidebarLayoutContainer: 'gap-[22px]',
    sidebarLayoutPageBottomWrapper: 'relative',
    sidebarLayoutLoadingWrapper: '',
    sidebarLayoutLoadingIcon: '',
    header: [
      'pt-[24px]',
      'flex-1 flex items-center gap-x-[12px] gap-y-1.5'
    ].join(' '),
    wrapper: 'min-h-[30px]',
    title: [
      'font-[family-name:var(--ui-font-family-primary)]',
      'text-(--b24ui-typography-label-color)',
      'font-(--ui-font-weight-semi-bold)',
      'mb-0',
      'text-(length:--ui-font-size-4xl)/[calc(var(--ui-font-size-4xl)+2px)]'
    ].join(' '),
    description: [
      'mt-1',
      'text-(--b24ui-typography-description-color)',
      'text-(length:--ui-font-size-sm)'
    ].join(' '),
    close: 'absolute',
    body: [
      'size-full',
      'flex-1'
    ].join(' '),
    footer: [
      'absolute inset-x-0 bottom-0',
      'bg-(--ui-color-bg-content-primary)', // --ui-color-bg-content-primary
      'flex items-center justify-center gap-3',
      'border-t border-t-1 border-t-(--ui-color-divider-less)',
      'shadow-top-md',
      'py-[9px] px-2 pr-(--scrollbar-width)'
    ].join(' '),
    safeList
  },
  variants: {
    useFooter: {
      true: {
        sidebarLayoutPageWrapper: 'mb-[calc(53px)] min-h-[calc(100vh_-_53px)]' // -_18px
      }
    },
    overlayBlur: {
      auto: {
        overlay: 'motion-safe:backdrop-blur-sm'
      },
      on: {
        overlay: 'backdrop-blur-sm'
      },
      off: {
        overlay: ''
      }
    },
    side: {
      // @todo fix if parent SidebarLayout.isUseSideBar > w-[calc(100%-135x)] > w-[calc(100%-150px)]
      top: {
        content: '', // 'sm:rounded-t-none'
        sidebarLayoutRoot: '' // sm:rounded-t-none
      },
      right: {
        content: '', // sm:rounded-t-none
        sidebarLayoutRoot: '' // sm:rounded-t-none
      },
      bottom: {
        content: '',
        sidebarLayoutRoot: ''
      },
      left: {
        content: '', // sm:rounded-t-none
        sidebarLayoutRoot: '' // sm:rounded-t-none
      }
    },
    inset: {
      true: {
        content: 'rounded-[18px]',
        sidebarLayoutRoot: 'rounded-[18px]'
      }
    },
    transition: {
      true: {
        overlay: 'motion-safe:data-[state=open]:animate-[fade-in_200ms_ease-out] motion-safe:data-[state=closed]:animate-[fade-out_200ms_ease-in]'
      }
    }
  },
  compoundVariants: [
    // region side && inset ////
    {
      side: 'top',
      inset: true,
      class: {
        content: 'max-h-[calc(100%-2rem)] inset-x-4 top-4'
      }
    },
    {
      side: 'top',
      inset: true,
      useFooter: true,
      class: {
        sidebarLayoutPageWrapper: 'min-h-[calc(100vh_-_53px-2rem)]'
      }
    },
    {
      side: 'top',
      inset: false,
      class: {
        content: 'max-h-full inset-x-0 top-0'
      }
    },
    {
      side: 'right',
      inset: true,
      class: {
        content: 'w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] inset-y-4 right-4 '
      }
    },
    {
      side: 'right',
      inset: true,
      useFooter: true,
      class: {
        sidebarLayoutPageWrapper: 'min-h-[calc(100vh_-_53px-2rem)]'
      }
    },
    {
      side: 'right',
      inset: false,
      class: {
        content: 'w-[calc(100%-60px)] sm:w-[calc(100%-150px)] inset-y-0 right-0'
      }
    },
    {
      side: 'bottom',
      inset: true,
      class: {
        content: [
          'max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] end-4 bottom-4'
        ].join(' ')
      }
    },
    {
      side: 'bottom',
      inset: true,
      useFooter: true,
      class: {
        sidebarLayoutPageWrapper: 'min-h-[calc(100vh_-_53px_-_2rem)]'
      }
    },
    {
      side: 'bottom',
      inset: false,
      class: {
        content: [
          'max-h-full sm:max-h-[calc(100%-18px)] right-[5px] top-0 sm:top-[18px] bottom-0',
          'w-[calc(100%-60px-5px)] sm:w-[calc(100%-150px-70px)]',
          'sm:rounded-t-[18px]'
        ].join(' '),
        sidebarLayoutRoot: 'sm:rounded-t-[18px]'
      }
    },
    {
      side: 'left',
      inset: true,
      class: {
        content: 'w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] inset-y-4 left-4'
      }
    },
    {
      side: 'left',
      inset: true,
      useFooter: true,
      class: {
        sidebarLayoutPageWrapper: 'min-h-[calc(100vh_-_53px-2rem)]'
      }
    },
    {
      side: 'left',
      inset: false,
      class: {
        content: 'w-[calc(100%-60px)] sm:w-[calc(100%-150px)] inset-y-0 left-0'
      }
    },
    // endregion ////
    // region bottom & footer -> min-h ////
    {
      side: 'bottom',
      inset: false,
      useFooter: true,
      class: {
        sidebarLayoutPageWrapper: 'sm:min-h-[calc(100vh_-_53px_-18px)]'
      }
    },
    // endregion ////
    // region btn.close ////
    {
      side: ['right', 'bottom'],
      inset: false,
      class: {
        close: [
          'pl-1.5 pr-[4px]',
          'top-[17px] -translate-x-full left-[1px]',
          'rounded-l-full'
        ].join(' ')
      }
    },
    {
      side: 'left',
      inset: false,
      class: {
        close: [
          'pr-1.5 pl-[4px]',
          'top-[17px] translate-x-full right-[1px]',
          'rounded-r-full',
          '[&>div]:flex-row-reverse'
        ].join(' ')
      }
    },
    {
      // side: 'top',
      inset: true,
      class: {
        close: [
          'top-4 end-4'
        ].join(' ')
      }
    },
    {
      side: 'top',
      class: {
        close: [
          'top-4 end-4'
        ].join(' ')
      }
    },
    // endregion ////
    // region transition ////
    {
      transition: true,
      side: 'top',
      class: {
        content: 'motion-safe:data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] motion-safe:data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]'
      }
    },
    {
      transition: true,
      side: 'right',
      class: {
        content: 'motion-safe:data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] motion-safe:data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]'
      }
    },
    {
      transition: true,
      side: 'bottom',
      class: {
        content: 'motion-safe:data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] motion-safe:data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]'
      }
    },
    {
      transition: true,
      side: 'left',
      class: {
        content: 'motion-safe:data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] motion-safe:data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    side: 'bottom',
    overlayBlur: 'off'
  }
}
