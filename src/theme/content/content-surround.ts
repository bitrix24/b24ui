/**
 * ContentSurround
 *  A pair of "Previous" and "Next" buttons for sequential page navigation.
 * ---
 * @see Card outline
 */

export default {
  slots: {
    root: 'grid grid-cols-1 sm:grid-cols-2 gap-[32px]',
    link: [
      'group',
      'block',
      'backdrop-blur-md',
      'rounded-(--ui-border-radius-md)',
      'px-[24px] py-[32px]',
      'bg-(--ui-color-design-outline-bg)',
      'border border-(--ui-color-design-outline-stroke) border-(length:--ui-design-outline-stroke-weight)',
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
      'ring-(--ui-color-design-outline-stroke) ring-(length:--ui-design-outline-stroke-weight)',
      'group-hover:ring-[color-mix(in_srgb,_var(--ui-color-design-selection-stroke)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
      'transition'
    ].join(' '),
    linkLeadingIcon: [
      'size-[20px]',
      'shrink-0',
      'text-(--ui-color-design-outline-content-icon)',
      'group-hover:text-(--ui-color-design-outline-content-icon-alt)',
      'transition-[color,translate]'
    ].join(' '),
    linkTitle: [
      'font-(--ui-font-weight-bold)',
      'text-(length:--ui-font-size-lg)/(--ui-font-line-height-lg)',
      'text-(--ui-color-design-outline-content)',
      'mb-[4px]',
      'truncate'
    ].join(' '),
    linkDescription: [
      'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
      'text-(--ui-color-design-outline-content-secondary)',
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
