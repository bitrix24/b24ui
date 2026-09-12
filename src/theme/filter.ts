/**
 * Filter
 * A composite filter (search + chips + presets + fields editor) modelled after
 * the native Bitrix24 filter. View-only: all state flows through props/events.
 * ---
 * @see InputTags
 * @see Popover
 * @see Drawer
 * @see CommandPalette
 * @see NavigationMenu
 */

export default {
  slots: {
    root: 'relative w-full',
    bar: 'flex items-center gap-2 w-full',
    barCounter: 'ms-1',
    panel: 'flex flex-col md:flex-row gap-4 p-3 min-w-[640px] max-w-[920px]',
    presets: 'flex flex-col gap-2 w-full md:w-[220px] md:border-e md:border-(--ui-color-divider-vibrant-accent-more) md:pe-3',
    presetsHeader: 'text-(length:--ui-font-size-2xs) text-(--ui-color-design-plain-na-content-secondary) uppercase tracking-wider px-2',
    presetsList: 'flex flex-col gap-0.5',
    presetItem: [
      'group relative flex items-center gap-2 w-full px-2 py-1.5',
      'text-(length:--ui-font-size-sm) text-(--ui-color-base-1)',
      'rounded-(--ui-border-radius-xs) cursor-pointer',
      'hover:bg-(--ui-color-design-tinted-bg)',
      'transition-colors'
    ].join(' '),
    presetItemActive: 'bg-(--ui-color-design-tinted-bg-alt) text-(--ui-color-design-tinted-content)',
    presetItemLabel: 'flex-1 truncate uppercase text-(length:--ui-font-size-2xs)',
    presetPinIcon: 'shrink-0 size-3.5 text-(--b24ui-icon-color-secondary)',
    presetActions: 'shrink-0 opacity-0 group-hover:opacity-100 transition-opacity',
    presetsFooter: 'mt-auto pt-2 border-t border-(--ui-color-divider-vibrant-accent-more)',
    fieldsEditor: 'flex flex-col gap-3 flex-1 min-w-0',
    fieldsList: 'flex flex-col gap-2 max-h-[60vh] overflow-auto',
    field: [
      'group relative flex items-start gap-2 px-1 py-1',
      'rounded-(--ui-border-radius-xs)',
      'hover:bg-(--ui-color-design-tinted-bg)/40'
    ].join(' '),
    fieldDragHandle: [
      'shrink-0 mt-7 size-5',
      'opacity-0 group-hover:opacity-100',
      'cursor-grab active:cursor-grabbing',
      'text-(--b24ui-icon-color-secondary)',
      'transition-opacity'
    ].join(' '),
    fieldBody: 'flex-1 min-w-0 flex flex-col gap-1',
    fieldLabel: 'text-(length:--ui-font-size-xs) text-(--ui-color-design-plain-na-content-secondary)',
    fieldControl: 'flex items-center gap-2 w-full',
    fieldRemove: [
      'shrink-0 mt-6 size-5',
      'opacity-0 group-hover:opacity-100',
      'text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover)',
      'transition-opacity'
    ].join(' '),
    fieldMenuTrigger: [
      'shrink-0 mt-6 size-5',
      'opacity-0 group-hover:opacity-100',
      'text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover)',
      'transition-opacity'
    ].join(' '),
    addFieldRow: 'flex items-center gap-3 pt-1',
    actions: 'flex items-center gap-2 pt-3 border-t border-(--ui-color-divider-vibrant-accent-more)',
    submitButton: '',
    resetButton: '',
    emptyFields: 'flex items-center justify-center py-8 text-(length:--ui-font-size-sm) text-(--ui-color-design-plain-na-content-secondary)'
  },
  variants: {
    size: {
      sm: {
        panel: 'text-(length:--ui-font-size-xs)',
        field: 'gap-1.5'
      },
      md: {
        panel: 'text-(length:--ui-font-size-sm)'
      },
      lg: {
        panel: 'text-(length:--ui-font-size-md)'
      }
    },
    open: {
      true: {
        bar: ''
      }
    },
    loading: {
      true: {
        actions: 'opacity-80 pointer-events-none'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
