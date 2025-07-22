/**
 * Slideover
 * A dialog that slides in from any side of the screen.
 * ---
 * @link: /api_help/js_lib/sidepanel/index.php
 * @see `sidepanel` -> BX.SidePanel.Instance.open
 * @see src/theme/modal.ts
 */

// :b24ui="{
// leadingIcon: ['left', 'right', 'bottom'].includes(props?.side)
//   ? 'group-hover:rounded-full group-hover:border-1 group-hover:border-current'
//   : ''
// }"
const safeList = [
  'group-hover:rounded-full group-hover:border-1 group-hover:border-current'
].join(' ')

export default {
  slots: {
    overlay: 'fixed inset-0 bg-[#00204e]/52',
    content: [
      'fixed',
      'sm:shadow-lg',
      'flex flex-col focus:outline-none',
      'h-full'
    ].join(' '),
    sidebarLayoutRoot: 'overflow-hidden light --ui-context-content-light',
    sidebarLayoutHeaderWrapper: '',
    sidebarLayoutPageBottomWrapper: '',
    header: [
      'pt-[24px]',
      'flex-1 flex items-center gap-x-[12px] gap-y-1.5'
    ].join(' '),
    wrapper: 'min-h-[30px]',
    body: [
      'size-full',
      'flex-1'
    ].join(' '),
    footer: [
      'bg-(--ui-color-bg-content-primary)',
      'flex items-center justify-center gap-3',
      'border-t border-t-1 border-t-(--ui-color-divider-less)',
      'shadow-top-md',
      'py-[9px] px-2 pr-(--scrollbar-width)'
    ].join(' '),
    title: [
      'font-[family-name:var(--ui-font-family-primary)]',
      'text-(--ui-color-design-plain-content)',
      'font-semibold',
      'mb-0',
      'text-(length:--ui-font-size-4xl)/[calc(var(--ui-font-size-4xl)+2px)]'
    ].join(' '),
    description: [
      'mt-1',
      'text-(--ui-color-design-plain-na-content)',
      'text-sm'
    ].join(' '),
    close: 'absolute',
    safeList
  },
  variants: {
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
      right: { content: 'right-0 inset-y-0 w-[calc(100%-60px)] sm:w-[calc(100%-150px)]' },
      left: { content: 'left-0 inset-y-0 w-[calc(100%-60px)] sm:w-[calc(100%-150px)]' },
      top: {
        content: 'inset-x-0 top-0 max-h-full'
      },
      bottom: {
        content: [
          'right-[5px] sm:right-[70px] top-0 sm:top-[18px] bottom-0',
          'w-[calc(100%-60px-5px)] sm:w-[calc(100%-150px-70px)]',
          'sm:max-h-[calc(100%-18px)]'
        ].join(' '),
        sidebarLayoutRoot: 'sm:rounded-t-[18px]',
        sidebarLayoutHeaderWrapper: '' // sm:rounded-t-[18px]
      }
    },
    transition: {
      true: {
        overlay: 'motion-safe:data-[state=open]:animate-[fade-in_200ms_ease-out] motion-safe:data-[state=closed]:animate-[fade-out_200ms_ease-in]'
      }
    }
  },
  compoundVariants: [
    // region btn.close ////
    {
      side: ['right', 'bottom'],
      class: {
        close: [
          'pl-1.5 pr-[4px]',
          'top-[17px] -translate-x-full -left-px',
          'rounded-l-full'
        ].join(' ')
      }
    },
    {
      side: 'left',
      class: {
        close: [
          'pr-1.5 pl-[4px]',
          'top-[17px] translate-x-full right-0',
          'rounded-r-full',
          '[&>div]:flex-row-reverse'
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
    scrollbarThin: true,
    overlayBlur: 'auto'
  }
}
