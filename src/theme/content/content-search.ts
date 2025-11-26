/**
 * ContentSearch
 * A ready-to-use Command Palette component for your documentation.
 * ---
 */

export default {
  slots: {
    modal: 'p-0 pt-0 pb-[10px]',
    input: ''
  },
  variants: {
    fullscreen: {
      false: {
        modal: 'sm:max-w-[768px] h-full sm:h-[436px]'
      }
    }
  }
}
