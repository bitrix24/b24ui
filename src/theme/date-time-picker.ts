/**
 * DateTimePicker
 * Two-step picker: a calendar, then an hour/minute grid, with an optional
 * preset column beside them.
 * ---
 * @memo Composes B24Popover (desktop) / B24Drawer (mobile), B24Calendar and a
 *       read-only B24Input as the default trigger.
 * @see src/theme/calendar.ts
 */

export default {
  slots: {
    root: '',
    /** Popover content; padding lives on the inner parts so the preset column can reach the edge. */
    content: 'p-0 overflow-hidden',
    /** Presets sit below the calendar on narrow screens and beside it from `sm` up. */
    body: 'flex flex-col-reverse sm:flex-row',
    /** Click target wrapping the read-only input, so the whole field opens the picker. */
    trigger: 'cursor-pointer',
    triggerInput: 'pointer-events-none w-full',
    main: 'flex flex-col p-2 min-w-64',
    presets: [
      'flex flex-row sm:flex-col gap-2 p-2',
      'sm:border-l sm:border-(--ui-color-divider-default)',
      'overflow-x-auto sm:overflow-x-visible',
      // Same cap the menus use, so an application moving the token moves this too.
      'sm:overflow-y-auto sm:max-h-[var(--max-height-popup-menu)]'
    ].join(' '),
    preset: [
      'flex flex-col items-start text-start',
      'min-w-36 px-3 py-1.5',
      'rounded-(--ui-border-radius-md)',
      'border border-(--ui-color-divider-default)',
      'cursor-pointer select-none transition-colors',
      'hover:bg-(--ui-color-bg-content-secondary)',
      'focus-visible:outline-(--ui-color-design-outline-focused-stroke) focus-visible:outline-1',
      'data-[active=true]:border-(--b24ui-background)',
      'data-[active=true]:text-(--b24ui-background)'
    ].join(' '),
    presetLabel: 'text-(length:--ui-font-size-md) font-(--ui-font-weight-medium) text-(--b24ui-typography-label-color)',
    presetHint: 'text-(length:--ui-font-size-xs) text-(--ui-color-design-plain-na-content-secondary)',
    timeHeader: 'flex items-center gap-2 pb-2 mb-2 border-b border-(--ui-color-divider-default)',
    timeHeaderLabel: 'flex-1 text-center font-(--ui-font-weight-semi-bold) text-(--b24ui-typography-legend-color)',
    timeBody: 'flex gap-4 px-1',
    timeColumn: 'flex flex-col gap-1 min-w-26',
    timeColumnTitle: 'text-center pb-1 text-(length:--ui-font-size-xs) text-(--ui-color-design-plain-na-content-secondary)',
    timeHoursGrid: 'grid grid-cols-4 gap-1',
    timeMinutesGrid: 'grid grid-cols-2 gap-1',
    timeCell: [
      'inline-flex items-center justify-center',
      'size-7 rounded-(--ui-border-radius-circle)',
      'text-(length:--ui-font-size-sm)',
      'cursor-pointer select-none transition',
      'hover:bg-(--b24ui-background-hover) hover:text-(--b24ui-color)',
      'focus-visible:outline-(--ui-color-design-outline-focused-stroke) focus-visible:outline-1',
      // The real-world current cell: a hint only, never the selected styling.
      'data-[now=true]:bg-(--ui-color-bg-content-secondary)',
      'data-[selected=true]:bg-(--b24ui-background) data-[selected=true]:text-(--b24ui-color)'
    ].join(' '),
    /** Footer of the calendar step; also the control that moves to the time step. */
    footer: [
      'mt-2 flex items-center gap-2 px-2 py-1',
      'rounded-(--ui-border-radius-md)',
      'text-(--b24ui-background)',
      'cursor-pointer select-none transition-colors',
      'hover:bg-(--ui-color-bg-content-secondary)',
      'focus-visible:outline-(--ui-color-design-outline-focused-stroke) focus-visible:outline-1'
    ].join(' '),
    footerIcon: 'size-4 shrink-0',
    footerValue: 'text-(length:--ui-font-size-sm) font-(--ui-font-weight-medium)'
  },
  variants: {
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' }
    },
    size: {
      xs: { timeCell: 'size-6 text-(length:--ui-font-size-xs)', preset: 'min-w-32 px-2 py-1' },
      sm: { timeCell: 'size-6', preset: 'min-w-34 px-2.5 py-1' },
      md: {},
      lg: { timeCell: 'size-8', preset: 'min-w-40 px-3.5 py-2' }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'air-primary'
  }
}
