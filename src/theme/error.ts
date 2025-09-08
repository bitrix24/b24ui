export default {
  slots: {
    root: 'min-h-[calc(100vh-var(--topbar-height))] flex flex-col items-center justify-center text-center',
    statusCode: 'text-base font-semibold text-(--b24ui-typography-legend-color)',
    statusMessage: 'mt-2 text-4xl sm:text-5xl font-bold text-(--b24ui-typography-label-color) text-balance',
    message: 'mt-4 text-lg text-(--b24ui-typography-description-color) text-balance',
    links: 'mt-8 flex items-center justify-center gap-6'
  }
}
