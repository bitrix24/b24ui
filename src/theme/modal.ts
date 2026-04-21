/**
 * Modal
 * A dialog window that can be used to display a message or request user input.
 * ---
 * @link: /api_d7/bitrix/ui/dialogs/dialogs.php
 * @see bitrix/js/ui/dialogs/messagebox/..
 *
 * @todo: use modal template from - What's new in Bitrix24 + set position ~> top-right
 * @todo: add wizard component
 */

export default {
  slots: {
    overlay: 'fixed inset-0',
    content: [
      'base-mode',
      'bg-(--ui-color-bg-content-primary)',
      'flex flex-col gap-0',
      'focus:outline-none'
    ].join(' '),
    contentWrapper: 'flex-1 flex flex-col gap-0',
    header: 'px-4 py-4 sm:px-6 flex items-stretch justify-between gap-1.5 min-h-(--b24ui-header-height)',
    wrapper: 'min-h-full flex-1 flex flex-col items-start justify-center gap-0',
    body: [
      'px-4 sm:px-6 flex-1 text-(length:--ui-font-size-md) leading-normal',
      'text-(--ui-color-base-2)',
      'text-(length:--ui-font-size-md)'
    ].join(' '),
    footer: [
      'px-4 py-4 sm:px-6 sm:py-6',
      'flex items-center justify-between gap-3'
      // 'border-t border-t-1 border-t-(--ui-color-divider-default)'
    ].join(' '),
    title: [
      'font-[family-name:var(--ui-font-family-primary)]',
      'text-(--ui-color-base-1)',
      'font-(--ui-font-weight-bold)',
      'mb-0',
      'text-[calc(var(--ui-font-size-2xl)+1px)]/(--ui-font-size-2xl)',
      'wrap-break-word'
    ].join(' '),
    description: [
      'text-(--b24ui-typography-description-color)',
      'text-(length:--ui-font-size-sm)',
      'wrap-break-word'
    ].join(' '),
    close: '[--ui-btn-height:24px]'
  },
  variants: {
    overlayBlur: {
      auto: { overlay: 'motion-safe:backdrop-blur-0.5' },
      on: { overlay: 'backdrop-blur-0.5' },
      off: { overlay: '' }
    },
    transition: {
      true: {
        overlay: 'motion-safe:data-[state=open]:animate-[fade-in_200ms_ease-out] motion-safe:data-[state=closed]:animate-[fade-out_200ms_ease-in]',
        content: 'motion-safe:data-[state=open]:animate-[scale-in_200ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_200ms_ease-in]'
      }
    },
    fullscreen: {
      true: {
        content: 'inset-0',
        // header: 'border-b-1 border-b-(--ui-color-divider-default)',
        body: 'py-4'
      },
      false: {
        content: [
          'w-[calc(100vw-2rem)] max-w-[32rem]',
          'rounded-[calc(var(--ui-border-radius-2xl)+2px)] shadow-lg'
          // @memo see components/popup.css
          // 'ring ring-(--popup-window-border)'
        ].join(' '),
        contentWrapper: '' // overflow-hidden
      }
    },
    overlay: {
      true: {
        overlay: 'bg-[#003366]/20'
      }
    },
    scrollable: {
      true: {
        overlay: 'overflow-y-auto',
        content: 'relative'
      },
      false: {
        content: 'fixed',
        body: 'overflow-y-auto'
      }
    },
    scrollbarThin: {
      true: {
        body: 'scrollbar-thin'
      }
    }
  },
  compoundVariants: [
    {
      scrollable: true,
      fullscreen: false,
      class: {
        overlay: 'grid place-items-center p-4 sm:py-8'
      }
    },
    {
      scrollable: false,
      fullscreen: false,
      class: {
        content: [
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)]' // //  overflow-hidden
        ].join(' '),
        contentWrapper: 'overflow-hidden'
      }
    },
    {
      scrollable: false,
      fullscreen: true,
      class: {
        content: 'max-h-[calc(100dvh)]',
        contentWrapper: 'overflow-hidden'
      }
    }
  ],
  defaultVariants: {
    scrollbarThin: true,
    overlayBlur: 'auto'
  }
}
