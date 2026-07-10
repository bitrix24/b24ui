/**
 * ContentToc
 * A sticky table of contents component with dynamic active section highlighting.
 * ---
 * @memo not use color, highlight, highlightColor
 */
export default {
  slots: {
    root: 'flex flex-col lg:overflow-hidden',
    container: [
      'border-dashed border-b-(length:--ui-border-width-thick) border-(--ui-color-divider-vibrant-default)',
      'lg:border-0',
      'flex flex-col lg:min-h-0'
    ].join(' '),
    top: 'lg:shrink-0',
    bottom: 'hidden lg:flex lg:flex-col lg:shrink-0 gap-[24px]',
    trigger: [
      'group',
      'pb-[12px]',
      'cursor-pointer lg:cursor-text',
      'focus-visible:outline-(--ui-color-accent-main-primary)',
      'focus-visible:outline-2',
      'focus-visible:rounded-[4px]',
      'text-legend',
      'text-(length:--ui-font-size-lg)/(--ui-font-line-height-3xs)',
      'font-(--ui-font-weight-semi-bold)',
      'flex-1',
      'flex items-center gap-[6px]',
      'lg:shrink-0'
    ].join(' '),
    title: 'line-clamp-1 lg:line-clamp-2', // truncate
    trailing: 'ms-auto inline-flex gap-[6px] items-center',
    trailingIcon: [
      'size-[20px]',
      'transform transition-transform duration-200',
      'shrink-0',
      'group-data-[state=open]:rotate-180',
      'lg:hidden'
    ].join(' '),
    content: [
      'relative',
      'motion-safe:data-[state=open]:animate-[collapsible-down_200ms_ease-out]',
      'motion-safe:data-[state=closed]:animate-[collapsible-up_200ms_ease-out]',
      'overflow-hidden',
      'focus:outline-none',
      'lg:min-h-0 lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-transparent'
    ].join(' '),
    list: 'min-w-0',
    listWithChildren: 'ms-[12px]',
    item: 'min-w-0',
    itemWithChildren: '',
    link: [
      'group relative',
      'text-(length:--ui-font-size-lg)/(--ui-font-line-height-3xs)',
      'flex items-center',
      'focus-visible:outline-(--ui-color-accent-main-primary)',
      'focus-visible:outline-1',
      'focus-visible:rounded-[4px]',
      'text-description',
      'underline-offset-2',
      'hover:text-label',
      'hover:underline',
      'pb-[12px]'
    ].join(' '),
    linkText: 'line-clamp-2' // truncate
  },
  variants: {
    active: {
      false: {
        link: [
          'text-description',
          'hover:text-label',
          'transition-colors'
        ].join(' ')
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
      active: true,
      class: {
        link: 'text-label',
        linkLeadingIcon: 'text-label'
      }
    }
  ],
  defaultVariants: {}
}
