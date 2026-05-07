/**
 * DateTimePicker
 * Two-step popover (date → time) date/time selector with optional preset list.
 * ---
 * @memo composes B24Popover, B24InputDate, B24Calendar and B24Button
 */

export default {
  slots: {
    root: '',
    content: 'p-0 overflow-hidden',
    body: 'flex flex-col-reverse sm:flex-row',
    main: 'flex flex-col p-2 min-w-[16rem]',
    presets: [
      'flex flex-row sm:flex-col gap-2',
      'sm:border-l sm:border-(--ui-color-divider-default)',
      'p-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[20rem]'
    ].join(' '),
    preset: [
      'group/preset',
      'flex flex-col items-start text-start',
      'rounded-(--ui-border-radius-md)',
      'border border-(--ui-color-divider-default)',
      'px-3 py-1.5',
      'min-w-[9rem]',
      'cursor-pointer select-none',
      'hover:bg-(--ui-color-bg-content-secondary)',
      'transition-colors',
      'data-[active=true]:border-(--b24ui-background)',
      'data-[active=true]:text-(--b24ui-background)'
    ].join(' '),
    presetLabel: 'text-(length:--ui-font-size-md) font-(--ui-font-weight-medium)',
    presetHint: [
      'text-(length:--ui-font-size-xs)',
      'text-(--ui-color-design-plain-na-content-secondary)'
    ].join(' '),
    timeHeader: [
      'flex items-center gap-2',
      'pb-2 mb-2',
      'border-b border-(--ui-color-divider-default)'
    ].join(' '),
    timeHeaderLabel: 'flex-1 text-center font-(--ui-font-weight-semi-bold)',
    timeBody: 'flex gap-4 px-1',
    timeColumn: 'flex flex-col gap-1 min-w-[6.5rem]',
    timeColumnTitle: [
      'text-center pb-1',
      'text-(length:--ui-font-size-xs)',
      'text-(--ui-color-design-plain-na-content-secondary)'
    ].join(' '),
    timeGrid: 'grid grid-cols-4 gap-1',
    timeMinutesGrid: 'grid grid-cols-2 gap-1',
    timeCell: [
      'inline-flex items-center justify-center',
      'size-7 rounded-full',
      'text-(length:--ui-font-size-sm)',
      'cursor-pointer select-none',
      'hover:bg-(--b24ui-background-hover)',
      'hover:text-(--b24ui-color)',
      'data-[selected=true]:bg-(--b24ui-background)',
      'data-[selected=true]:text-(--b24ui-color)',
      'transition'
    ].join(' '),
    footer: 'flex items-center gap-2 px-2 pt-2 pb-1 text-(--ui-color-design-plain-na-content-secondary)',
    footerIcon: 'size-4 shrink-0',
    footerValue: 'text-(length:--ui-font-size-sm)'
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
      xs: {},
      sm: {},
      md: {},
      lg: {}
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'air-primary'
  }
}
