/**
 * ContentSurround
 */

export default {
  slots: {
    root: 'grid grid-cols-1 sm:grid-cols-2 gap-[32px]',
    link: [
      'group',
      'block',
      'style-blurred-bg',
      'rounded-(--ui-border-radius-md)',
      'px-[24px] py-[32px]',
      'bg-(--ui-color-design-outline-bg)',
      'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
      'border-(length:--ui-design-outline-stroke-weight)',
      'border-(--ui-color-design-outline-stroke)',
      'hover:border-[color-mix(in_srgb,_var(--ui-color-design-outline-stroke)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
      'cursor-pointer',
      'focus-visible:outline-(--ui-color-accent-main-primary)',
      'transition-colors'
    ].join(' '),
    linkLeading: [
      'inline-flex items-center',
      'rounded-full',
      'select-none',
      'mb-[16px] p-[6px]',
      'bg-(--ui-color-design-outline-bg)',
      'group-hover:bg-[color-mix(in_srgb,_var(--ui-color-design-selection-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
      'ring-(length:--ui-design-outline-stroke-weight)',
      'ring-(--ui-color-design-outline-stroke)',
      'group-hover:ring-[color-mix(in_srgb,_var(--ui-color-design-selection-stroke)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
      'transition'
    ].join(' '),
    linkLeadingIcon: [
      'size-[20px]',
      'shrink-0',
      'text-(--ui-color-design-plain-content-icon-secondary)',
      'group-hover:text-(--ui-color-accent-soft-element-blue)',
      'transition-[color,translate]'
    ].join(' '),
    linkTitle: [
      'font-(--ui-font-weight-bold)',
      'text-(length:--ui-font-size-lg) leading-(--ui-font-line-height-lg)',
      'text-(--b24ui-typography-label-color)',
      'mb-[4px]',
      'truncate'
    ].join(' '),
    linkDescription: [
      'text-(length:--ui-font-size-sm) leading-(--ui-font-line-height-sm)',
      'text-(--b24ui-typography-description-color)',
      'text-pretty line-clamp-2'
    ].join(' ')
  },
  variants: {
    direction: {
      left: {
        linkLeadingIcon: 'group-active:-translate-x-0.5'
      },
      right: {
        link: 'text-right',
        linkLeadingIcon: 'group-active:translate-x-0.5'
      }
    }
  }
}
