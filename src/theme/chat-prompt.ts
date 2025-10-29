/**
 * ChatPrompt
 * An enhanced Textarea component optimized for prompt submission in AI chat interfaces.
 * ---
 * @todo add variant
 * @todo add demo
 * @todo add docs
 */

export default {
  slots: {
    root: 'relative flex flex-col items-stretch gap-2 px-2.5 py-2 w-full rounded-lg backdrop-blur',
    header: 'flex items-center gap-1.5',
    body: 'items-start',
    footer: 'flex items-center justify-between gap-1.5',
    base: 'text-base/5'
  },
  variants: {
    variant: {
      outline: {
        root: [
          'bg-(--ui-color-design-outline-bg)',
          'ring ring-(--ui-color-design-outline-stroke) ring-(length:--ui-design-outline-stroke-weight)',
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
