/**
 * Slideover
 * A dialog that slides in from any side of the screen.
 * ---
 * @link: /api_help/js_lib/sidepanel/index.php
 * @see `sidepanel` -> BX.SidePanel.Instance.open
 * @see src/theme/modal.ts
 *
 * @todo: btn close like b24
 */

const safeList = [
  'group-hover:rounded-full group-hover:border-1 group-hover:border-current'
].join(' ')

export default {
  slots: {
    overlay: 'fixed inset-0 bg-[#00204e]/52', //  bg-base-950/20 dark:bg-base-950/30 // [#00204e]/52
    content: [
      'fixed',
      'bg-base-50 dark:bg-base-950',
      // 'divide-y divide-(--ui-border)',
      'sm:shadow-lg',
      'flex flex-col focus:outline-none'
    ].join(' '),
    header: [
      // fix 'mt-4 px-5',
      'pt-[20px]',
      'flex items-center gap-1.5'
    ].join(' '),
    wrapper: 'min-h-2xl',
    body: [
      'mx-0 mt-2',
      // fix 'flex-1 overflow-y-auto'
      'flex-1'
    ].join(' '),
    footer: 'bg-white dark:bg-base-950 flex items-center justify-center gap-3 py-4 border-t border-t-1 border-t-base-900/10 dark:border-t-white/20 shadow-top-md p-2 pr-(--scrollbar-width)',
    title: 'font-[family-name:var(--ui-font-family-primary)] text-(--ui-color-design-plain-content) font-semibold mb-0 text-(length:--ui-font-size-4xl)',
    description: 'mt-2 mb-1 text-base-500 dark:text-base-400 text-sm',
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
      top: {
        content: 'inset-x-0 top-0 max-h-full'
      },
      right: {
        content: 'right-0 inset-y-0 w-full max-w-[28rem]'
      },
      bottom: {
        // fix content: 'inset-x-0 bottom-0 max-h-full'
        content: [
          'right-0 top-[18px] bottom-0',
          'max-h-[calc(100%-18px)] w-full max-w-[calc(100%-150px)]',
          'rounded-t-[18px]'
        ].join(' ')
      },
      left: {
        content: 'left-0 inset-y-0 w-full max-w-[28rem]'
      }
    },
    transition: {
      true: {
        overlay: 'motion-safe:data-[state=open]:animate-[fade-in_200ms_ease-out] motion-safe:data-[state=closed]:animate-[fade-out_200ms_ease-in]'
      }
    },
    // @todo remove this
    scrollbarThin: {
      true: {
        // fix body: 'scrollbar-thin'
      }
    }
  },
  compoundVariants: [
    // region close ////
    // close: 'absolute ' ////
    {
      side: 'right',
      class: {
        close: [
          'pl-1.5 pr-2.5',
          'top-3 -translate-x-full left-0',
          'rounded-l-full'
        ].join(' ')
      }
    },
    {
      side: 'left',
      class: {
        close: [
          'pr-1.5 pl-2.5',
          'top-3 translate-x-full right-0',
          'rounded-r-full'
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
    {
      side: 'bottom',
      class: {
        close: [
          'pl-1.5 pr-[4px]',
          'top-[17px] -translate-x-full left-0',
          'rounded-l-full'
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
    side: 'right',
    scrollbarThin: true,
    overlayBlur: 'auto'
  }
}
