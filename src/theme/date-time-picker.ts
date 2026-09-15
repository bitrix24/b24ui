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
    /**
     * The popover or drawer content. Everything this component draws lives
     * here, because both wrappers teleport it out of the component — there is
     * no root element of its own to hang anything on.
     */
    content: 'p-0 overflow-hidden',
    /** Presets sit below the calendar on narrow screens and beside it from `sm` up. */
    body: 'flex flex-col-reverse sm:flex-row',
    /** Click target wrapping the read-only input, so the whole field opens the picker. */
    /** The readonly input that doubles as the popover trigger. */
    trigger: 'cursor-pointer w-full',
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
    // No rule under the header: the columns below are already separated by one,
    // and a second short line floating inside the padding read as a mistake.
    timeHeader: 'flex items-center gap-1 pb-3',
    timeHeaderBack: [
      'inline-flex items-center justify-center shrink-0 size-7',
      'rounded-(--ui-border-radius-circle)',
      'cursor-pointer transition-colors',
      'hover:bg-(--ui-color-bg-content-secondary)',
      'focus-visible:outline-(--ui-color-design-outline-focused-stroke) focus-visible:outline-1'
    ].join(' '),
    timeHeaderBackIcon: 'size-5 text-(--ui-color-design-plain-na-content-secondary)',
    timeHeaderLabel: 'flex-1 text-center pe-7 font-(--ui-font-weight-semi-bold) text-(--b24ui-typography-legend-color)',
    timeBody: 'flex',
    /** The rule between hours and minutes; `first:` keeps it off the left edge. */
    timeColumn: [
      'flex flex-col gap-1 px-3 first:pl-1 last:pr-1',
      'border-l border-(--ui-color-divider-default) first:border-l-0'
    ].join(' '),
    timeColumnTitle: 'text-center pb-2 text-(length:--ui-font-size-xs) text-(--ui-color-design-plain-na-content-secondary)',
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
      // After `data-[now]`, so a cell that is both reads as selected.
      'data-[selected=true]:bg-(--b24ui-background) data-[selected=true]:text-(--b24ui-color)',
      'data-[selected=true]:font-(--ui-font-weight-medium)'
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
    /**
     * On `content`, not on `root`. The popover and the drawer both teleport
     * their content out of this component, so a class on the root never
     * reaches the grid or the presets: `--b24ui-background` resolved to an
     * empty string inside the popover, which left the selected hour and minute
     * transparent and the active preset bordered in the default grey. `root`
     * is not rendered at all, so it could not have worked either way.
     */
    color: {
      'air-primary': { content: 'style-filled' },
      'air-primary-success': { content: 'style-filled-success' },
      'air-primary-alert': { content: 'style-filled-alert' },
      'air-primary-copilot': { content: 'style-filled-copilot' },
      'air-primary-warning': { content: 'style-filled-warning' }
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
