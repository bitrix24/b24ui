/**
 * Breadcrumb
 * A breadcrumb navigation component.
 * ---
 * @memo: standard for links
 */
export default {
  slots: {
    root: 'relative min-w-0',
    list: 'flex items-center gap-[6px]',
    item: 'flex min-w-0',
    link: [
      'group',
      'relative',
      'flex items-center gap-[6px]',
      'text-(length:--ui-font-size-sm)',
      'min-w-0',
      '-mt-px',
      'focus-visible:outline-(--ui-color-accent-main-primary)'
    ].join(' '),
    linkLeadingIcon: 'shrink-0 size-[20px]',
    linkLeadingAvatar: 'shrink-0',
    linkLeadingAvatarSize: '2xs',
    linkLabel: 'truncate',
    separator: 'flex',
    separatorIcon: 'shrink-0 size-[20px] text-(--ui-color-base-6)'
  },
  variants: {
    active: {
      true: {
        link: [
          'text-(--ui-color-design-selection-content)',
          'hover:text-(--ui-color-accent-main-primary-alt-2)',
          'hover:underline',
          'font-(--ui-font-weight-semibold)'
        ].join(' ')
      },
      false: {
        link: [
          'text-(--b24ui-typography-legend-color)',
          'font-(--ui-font-weight-medium)'
        ].join(' ')
      }
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-30'
      }
    },
    to: {
      true: ''
    }
  },
  compoundVariants: [{
    disabled: false,
    active: false,
    to: true,
    class: {
      link: [
        'hover:text-(--ui-color-accent-main-primary-alt-2)',
        'hover:underline',
        'transition-colors'
      ].join(' ')
    }
  }]
}
