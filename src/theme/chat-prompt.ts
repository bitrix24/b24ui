/**
 * ChatPrompt
 * An enhanced Textarea component optimized for prompt submission in AI chat interfaces.
 * ---
 */

export default {
  slots: {
    root: 'relative flex flex-col items-stretch gap-[2px] ps-[12px] pe-[8px] py-[8px] w-full rounded-lg',
    header: 'flex items-center gap-[8px]',
    body: 'py-[4px] items-start',
    footer: 'flex items-center justify-end gap-[8px]',
    base: 'pt-[1px] pb-[0px] text-(length:--ui-font-size-lg)/(--ui-font-line-height-2xs)'
  },
  variants: {
    variant: {
      outline: {
        root: [
          'bg-(--ui-color-design-outline-bg)',
          'ring ring-(--ui-color-design-outline-stroke) ring-1',
          'text-(--ui-color-design-outline-content)'
        ].join(' ')
      },
      tinted: {
        root: [
          'bg-(--ui-color-design-tinted-na-bg)',
          'ring ring-(--ui-color-design-tinted-na-stroke) ring-(length:--ui-design-tinted-na-stroke-weight)',
          'text-(--ui-color-design-tinted-na-content)'
        ].join(' ')
      },
      filled: {
        root: [
          'bg-(--ui-color-design-filled-na-bg)',
          'ring ring-(--ui-color-design-filled-na-stroke) ring-(length:--ui-design-filled-na-stroke-weight)',
          'text-(--ui-color-design-filled-na-content)'
        ].join(' ')
      },
      plain: {
        root: [
          'bg-(--ui-color-design-plain-bg)',
          'ring ring-(--ui-color-design-plain-stroke) ring-(length:--ui-design-plain-stroke-weight)',
          'text-(--ui-color-design-plain-content)'
        ].join(' ')
      }
    }
  },
  defaultVariants: {
    variant: 'outline'
  }
}
