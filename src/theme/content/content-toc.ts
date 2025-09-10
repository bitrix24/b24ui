/**
 * ContentToc
 */
export default {
  slots: {
    root: '',
    container: [
      'border-b border-dashed border-default',
      'lg:border-0',
      'flex flex-col'
    ].join(' '),
    top: '',
    bottom: 'hidden lg:flex lg:flex-col gap-[24px]',
    trigger: [
      'group',
      'pb-[12px]',
      'cursor-pointer lg:cursor-initial',
      'focus-visible:outline-(--ui-color-accent-main-primary)',
      'focus-visible:outline-2',
      'focus-visible:rounded-[4px]',
      'text-(--b24ui-typography-label-color)',
      'text-(length:--ui-font-size-md) leading-(--ui-font-line-height-md)',
      'font-(--ui-font-weight-semi-bold)',
      'flex-1',
      'flex items-center gap-[6px]'
    ].join(' '),
    title: 'truncate',
    trailing: 'ms-auto inline-flex gap-[6px] items-center',
    trailingIcon: [
      'size-[20px]',
      'transform transition-transform duration-200',
      'shrink-0',
      'group-data-[state=open]:rotate-180',
      'lg:hidden'
    ].join(' '),
    content: [
      'motion-safe:data-[state=open]:animate-[collapsible-down_200ms_ease-out]',
      'motion-safe:data-[state=closed]:animate-[collapsible-up_200ms_ease-out]',
      'overflow-hidden',
      'focus:outline-none'
    ].join(' '),
    list: 'min-w-0',
    listWithChildren: 'ms-[12px]',
    item: 'min-w-0',
    itemWithChildren: '',
    link: [
      'group relative',
      'text-(length:--ui-font-size-sm)',
      'flex items-center',
      'focus-visible:outline-(--ui-color-accent-main-primary)',
      'focus-visible:outline-1',
      'focus-visible:rounded-[4px]',
      'text-(--ui-color-accent-main-link)',
      'underline-offset-2',
      'hover:text-(--ui-color-accent-main-primary-alt)',
      'hover:underline',
      'pb-[8px]'
    ].join(' '),
    linkText: 'truncate',
    indicator: [
      'absolute',
      'ms-2.5',
      'transition-[translate,height]',
      'duration-200',
      'h-[15px]',
      'translate-y-(--indicator-position)',
      'w-px',
      'rounded-full'
    ]
  },
  variants: {
    color: {
      neutral: ''
    },
    highlightColor: {
      neutral: {
        indicator: 'bg-inverted'
      }
    },
    active: {
      false: {
        link: [
          'text-muted',
          'hover:text-default',
          'transition-colors'
        ].join(' ')
      }
    },
    highlight: {
      true: {
        list: [
          'ms-2.5 ps-4',
          'border-s border-default'
        ].join(' '),
        item: '-ms-px'
      }
    },
    body: {
      true: {
        bottom: 'mt-6'
      }
    }
  },
  compoundVariants: [
    {
      color: 'air-primary',
      active: true,
      class: {
        link: 'text-highlighted',
        linkLeadingIcon: 'text-highlighted'
      }
    }
  ],
  defaultVariants: {
    color: 'air-primary',
    highlightColor: 'air-primary'
  }
}
