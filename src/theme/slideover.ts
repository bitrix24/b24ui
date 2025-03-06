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
    overlay: 'fixed inset-0 bg-base-950/20 dark:bg-base-950/30',
    content: [
      'fixed',
      'bg-base-50 dark:bg-base-950',
      // 'divide-y divide-(--ui-border)',
      'sm:shadow-lg',
      'flex flex-col focus:outline-none'
    ].join(' '),
    header: [
      'mt-4 px-5',
      'flex items-center gap-1.5'
    ].join(' '),
    wrapper: 'min-h-2xl',
    body: [
      'mx-0 mt-2',
      'flex-1 overflow-y-auto'
    ].join(' '),
    footer: 'bg-white dark:bg-base-950 flex items-center justify-center gap-3 py-4 border-t border-t-1 border-t-base-900/10 dark:border-t-white/20 shadow-top-md p-2 pr-(--scrollbar-width)',
    title: 'font-b24-system font-light text-4.5xl leading-none text-base-900 dark:text-base-150',
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
        content: 'inset-x-0 bottom-0 max-h-full'
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
    scrollbarThin: {
      true: {
        body: 'scrollbar-thin'
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
      side: ['top', 'bottom'],
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
  ],
  defaultVariants: {
    side: 'right',
    scrollbarThin: true,
    overlayBlur: 'auto'
  }
}
