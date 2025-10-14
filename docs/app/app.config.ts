export default defineAppConfig({
  toaster: {
    position: 'top-right' as const,
    duration: 5000,
    max: 5,
    expand: true
  },
  b24ui: {},
  colorMode: true,
  colorModeTypeLight: 'edge-dark' as const
})
