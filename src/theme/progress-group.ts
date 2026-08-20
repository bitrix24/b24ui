/**
 * ProgressGroup
 * One progress bar carrying several values at once, each drawn as its own coloured part.
 * ---
 * @see src/theme/progress.ts
 */

export default {
  slots: {
    root: 'gap-2',
    base: [
      'flex overflow-hidden',
      'rounded-(--ui-border-radius-pill)',
      'bg-(--ui-color-base-5)'
    ].join(' '),
    segment: 'duration-200 ease-out motion-reduce:transition-none',
    // The colour lives on `segment` as a `style-*` class, which defines
    // `--b24ui-background`; the indicator reads it. Same mechanism `Progress`
    // uses between `root` and `indicator`, moved down one level because here
    // every segment carries its own colour.
    indicator: 'size-full bg-(--b24ui-background)',
    status: [
      'flex justify-end',
      'text-legend',
      'duration-200 ease-out motion-reduce:transition-none'
    ].join(' '),
    list: 'flex flex-col gap-1',
    item: 'flex items-center gap-1.5 min-w-0',
    itemLeadingIcon: 'shrink-0',
    itemLeadingDot: 'shrink-0 rounded-(--ui-border-radius-pill)',
    itemLabel: 'truncate text-label',
    itemTrailing: 'ms-auto shrink-0 text-legend'
  },
  variants: {
    color: {
      'air-primary': {
        segment: 'style-filled',
        itemLeadingIcon: 'style-filled text-(--b24ui-background)',
        itemLeadingDot: 'style-filled bg-(--b24ui-background)'
      },
      'air-primary-success': {
        segment: 'style-filled-success',
        itemLeadingIcon: 'style-filled-success text-(--b24ui-background)',
        itemLeadingDot: 'style-filled-success bg-(--b24ui-background)'
      },
      'air-primary-alert': {
        segment: 'style-filled-alert',
        itemLeadingIcon: 'style-filled-alert text-(--b24ui-background)',
        itemLeadingDot: 'style-filled-alert bg-(--b24ui-background)'
      },
      'air-primary-copilot': {
        segment: 'style-filled-copilot',
        itemLeadingIcon: 'style-filled-copilot text-(--b24ui-background)',
        itemLeadingDot: 'style-filled-copilot bg-(--b24ui-background)'
      },
      'air-primary-warning': {
        segment: 'style-filled-warning',
        itemLeadingIcon: 'style-filled-warning text-(--b24ui-background)',
        itemLeadingDot: 'style-filled-warning bg-(--b24ui-background)'
      },
      'air-secondary': {
        segment: 'style-tinted',
        itemLeadingIcon: 'style-tinted text-(--b24ui-background)',
        itemLeadingDot: 'style-tinted bg-(--b24ui-background)'
      }
    },
    size: {
      xs: {
        status: 'text-(length:--ui-font-size-xs)/(--ui-font-line-height-sm)',
        list: 'text-(length:--ui-font-size-xs)/(--ui-font-line-height-sm)',
        itemLeadingIcon: 'size-3',
        itemLeadingDot: 'size-1.5'
      },
      sm: {
        status: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        list: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        itemLeadingIcon: 'size-4',
        itemLeadingDot: 'size-2'
      },
      md: {
        status: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        list: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        itemLeadingIcon: 'size-4',
        itemLeadingDot: 'size-2'
      },
      lg: {
        status: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        list: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        itemLeadingIcon: 'size-5',
        itemLeadingDot: 'size-2.5'
      }
    },
    orientation: {
      horizontal: {
        root: 'w-full flex flex-col',
        base: 'w-full flex-row',
        status: 'flex-row w-(--percent) transition-[width]'
      },
      vertical: {
        root: 'h-full flex flex-row-reverse',
        base: 'h-full flex-col',
        status: 'flex-col min-w-[32px] h-(--percent) transition-[height]'
      }
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'xs',
      class: { base: 'h-[2px]' }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: { base: 'h-[4px]' }
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: { base: 'h-2' }
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: { base: 'h-[12px]' }
    },
    {
      orientation: 'vertical',
      size: 'xs',
      class: { base: 'w-[2px]' }
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: { base: 'w-[4px]' }
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: { base: 'w-2' }
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: { base: 'w-[12px]' }
    }
  ],
  defaultVariants: {
    color: 'air-primary',
    size: 'md'
  }
}
