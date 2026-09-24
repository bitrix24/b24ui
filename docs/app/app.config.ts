export default defineAppConfig({
  toaster: {
    position: 'top-right' as const,
    duration: 5000,
    max: 5,
    expand: true
  },
  b24ui: {},
  colorMode: true,
  colorModeInitialValue: 'edge-dark' as const, // edge-dark | edge-light | light
  colorModeTypeLight: 'edge-dark' as const // edge-dark | edge-light | light
})
