/**
 * EditorToolbar
 * A customizable toolbar for editor actions with multiple display modes: fixed, bubble, or floating.
 * ---
 */

export default {
  slots: {
    root: 'focus:outline-none',
    base: 'flex items-stretch gap-1.5',
    group: 'flex items-center gap-0.5',
    separator: 'w-px self-stretch bg-(--ui-color-design-tinted-na-stroke)'
  },
  variants: {
    layout: {
      bubble: {
        base: 'bg-(--popup-window-background-color) border border-(--ui-color-divider-default) rounded-md p-1'
      },
      floating: {
        base: 'bg-(--popup-window-background-color) border border-(--ui-color-divider-default) rounded-md p-1'
      },
      fixed: {
        base: ''
      }
    }
  }
}
