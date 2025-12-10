/**
 * Modal
 * A dialog window that can be used to display a message or request user input.
 * ---
 * @link: /api_d7/bitrix/ui/dialogs/dialogs.php
 * @see bitrix/js/ui/dialogs/messagebox/..
 *
 * @todo: use modal template from - What's new in Bitrix24 + set position ~> top-right
 * @todo: add command palette to docs example
 * @todo: add wizard component
 */

export default {
  slots: {
    overlay: 'fixed inset-0',
    content: [
      'base-mode',
      'bg-(--ui-color-bg-content-primary)',
      'flex flex-col gap-[20px]',
      'focus:outline-none',
      'p-[24px] pt-[20px]'
    ].join(' '),
    contentWrapper: 'flex flex-col gap-[15px] pt-[4px]',
    header: 'flex items-start justify-between gap-[6px]',
    wrapper: '',
    body: 'flex-1 text-(length:--ui-font-size-md) leading-normal',
    footer: [
      'flex items-center justify-between gap-[10px]',
      'border-t border-t-1 border-t-(--ui-color-divider-default)',
      'pt-[18px]'
    ].join(' '),
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
    close: '-mt-[4px]'
  },
  variants: {
    overlayBlur: {
      auto: { overlay: 'motion-safe:backdrop-blur-[2px]' },
      on: { overlay: 'backdrop-blur-[2px]' },
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
        content: 'inset-0'
      },
      false: {
        content: [
          // // 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-[calc(100vw-2rem)] max-w-[32rem]',
          // // 'max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)]',
          'rounded-[calc(var(--ui-border-radius-xl)-2px)] shadow-lg'
          // @memo see components/popup.css
          // 'ring ring-(--popup-window-border)'
        ].join(' '),
        contentWrapper: '' // //  overflow-hidden
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
    }
  ],
  defaultVariants: {
    scrollbarThin: true,
    overlayBlur: 'auto'
  }
}
