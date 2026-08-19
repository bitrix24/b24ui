/**
 * Splitter
 * Resizable panel group
 * ---
 * @link https://reka-ui.com/docs/components/splitter
 */

export default {
  slots: {
    root: '',
    panel: 'flex',
    handle: [
      'group relative shrink-0',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-color-accent-soft-element-blue)',
      'data-[panel-resize-handle-enabled=false]:cursor-default'
    ].join(' ')
  },
  variants: {
    orientation: {
      horizontal: {
        handle: 'w-2 cursor-col-resize'
      },
      vertical: {
        handle: 'h-2 cursor-row-resize'
      }
    }
  }
}
