/**
 * ProseCodeGroup
 * ---
 * @todo fix color
 */

export default {
  slots: {
    root: 'relative group *:not-first:!my-0 *:not-first:!static my-5',
    list: [
      'relative',
      'flex items-center gap-1',
      'border border-(--ui-color-design-tinted-na-stroke)',
      'bg-(--ui-color-bg-content-secondary)',
      'border-b-0',
      'rounded-t-md',
      'overflow-x-auto',
      'p-2'
    ].join(' '),
    indicator: [
      'absolute',
      'left-0 inset-y-2',
      'w-(--reka-tabs-indicator-size)',
      'translate-x-(--reka-tabs-indicator-position)',
      'transition-[translate,width]',
      'duration-200',
      'bg-(--ui-color-design-selection-bg)',
      'rounded-md',
      'shadow-xs'
    ].join(' '),
    trigger: [
      'relative',
      'inline-flex items-center gap-1.5',
      'text-(--b24ui-typography-legend-color)',
      'data-[state=active]:text-(--b24ui-typography-legend-color)',
      'hover:bg-(--ui-color-design-selection-bg)',
      'px-2 py-1.5',
      'text-sm',
      'rounded-md',
      'disabled:cursor-not-allowed disabled:opacity-30',
      'focus-visible:ring-2',
      'focus-visible:ring-inset',
      'focus-visible:ring-(--ui-color-accent-soft-element-blue)',
      'focus:outline-none',
      'transition-colors'
    ].join(' '),
    triggerIcon: 'size-4 shrink-0',
    triggerLabel: 'truncate'
  }
}
