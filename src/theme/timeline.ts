/**
 * TimeLine
 * A component for displaying a chronological sequence of events, with dates, titles, and supporting icons or avatars.
 * ---
 * @see src/theme/stepper.ts
 */

export default {
  slots: {
    root: 'flex gap-1.5',
    item: 'group relative flex flex-1 gap-3',
    container: 'relative flex items-center gap-1.5',
    indicator: [
      'group-data-[state=completed]:text-(--b24ui-color) group-data-[state=active]:text-(--b24ui-color) text-(--b24ui-typography-description-color)',
      'group-data-[state=completed]:bg-(--b24ui-background) group-data-[state=active]:bg-(--b24ui-background-active)'
    ].join(' '),
    separator: 'flex-1 rounded-(--ui-border-radius-circle) bg-(--ui-color-base-6)',
    wrapper: 'w-full',
    date: 'text-(--b24ui-typography-label-color) text-(length:--ui-font-size-xs)/(--ui-font-line-height-md)',
    title: 'font-(--ui-font-weight-medium) text-(--b24ui-typography-legend-color) text-(length:--ui-font-size-sm)',
    description: 'text-(--b24ui-typography-description-color) text-wrap text-(length:--ui-font-size-sm)'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex-row w-full',
        item: 'flex-col',
        separator: 'h-0.5'
      },
      vertical: {
        root: 'flex-col',
        container: 'flex-col',
        separator: 'w-0.5'
      }
    },
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' }
    },
    size: {
      '3xs': '',
      '2xs': '',
      'xs': '',
      'sm': '',
      'md': '',
      'lg': '',
      'xl': '',
      '2xl': ''
    },
    reverse: {
      false: {
        separator: 'group-data-[state=completed]:bg-(--b24ui-background-active)'
      },
      true: {
        separator: 'group-data-[state=active]:bg-(--b24ui-background) group-data-[state=completed]:bg-(--b24ui-background)'
      }
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: '3xs',
      class: {
        wrapper: 'pe-4.5'
      }
    },
    {
      orientation: 'horizontal',
      size: '2xs',
      class: {
        wrapper: 'pe-5'
      }
    },
    {
      orientation: 'horizontal',
      size: 'xs',
      class: {
        wrapper: 'pe-5.5'
      }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        wrapper: 'pe-6'
      }
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: {
        wrapper: 'pe-6.5'
      }
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        wrapper: 'pe-7'
      }
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: {
        wrapper: 'pe-7.5'
      }
    },
    {
      orientation: 'horizontal',
      size: '2xl',
      class: {
        wrapper: 'pe-8'
      }
    },
    {
      orientation: 'horizontal',
      size: '3xl',
      class: {
        wrapper: 'pe-8.5'
      }
    },
    {
      orientation: 'vertical',
      size: '3xs',
      class: {
        wrapper: '-mt-0.5 pb-4.5'
      }
    },
    {
      orientation: 'vertical',
      size: '2xs',
      class: {
        wrapper: 'pb-5'
      }
    },
    {
      orientation: 'vertical',
      size: 'xs',
      class: {
        wrapper: 'mt-0.5 pb-5.5'
      }
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        wrapper: 'mt-1 pb-6'
      }
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: {
        wrapper: 'mt-1.5 pb-6.5'
      }
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: {
        wrapper: 'mt-2 pb-7'
      }
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: {
        wrapper: 'mt-2.5 pb-7.5'
      }
    },
    {
      orientation: 'vertical',
      size: '2xl',
      class: {
        wrapper: 'mt-3 pb-8'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'air-primary'
  }
}
