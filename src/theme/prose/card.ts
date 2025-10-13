/**
 * ProseCard
 * ---
 * @todo fix color
 */

export default {
  slots: {
    base: [
      'group relative block my-5 p-4 sm:p-6 border border-default rounded-md bg-default',
      'transition-colors'
    ].join(' '),
    icon: 'size-6 mb-2 block',
    title: 'text-highlighted font-semibold',
    description: 'text-[15px] text-(--b24ui-typography-description-color) *:first:mt-0 *:last:mb-0 *:my-1',
    externalIcon: [
      'size-4 align-top absolute right-2 top-2 text-dimmed pointer-events-none',
      'transition-colors'
    ].join(' ')
  },
  variants: {
    color: {
      'air-primary': {
        icon: 'text-highlighted'
      }
    },
    to: {
      true: ''
    },
    title: {
      true: {
        description: 'mt-1'
      }
    }
  },
  compoundVariants: [
    {
      color: 'air-primary',
      to: true,
      class: {
        base: 'hover:bg-elevated/50 hover:border-inverted',
        externalIcon: 'group-hover:text-highlighted'
      }
    }
  ],
  defaultVariants: {
    color: 'air-primary'
  }
}
