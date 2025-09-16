export default {
  slots: {
    root: 'min-h-[calc(100vh-var(--topbar-height))] flex flex-col items-center justify-center text-center',
    statusCode: 'text-(length:--ui-font-size-sm) font-(--ui-font-weight-semibold) text-(--b24ui-typography-legend-color)',
    statusMessage: 'mt-2 text-(length:--ui-font-size-4xl)/(--ui-font-line-height-md) sm:text-(length:--ui-font-size-5xl)/(--ui-font-line-height-md) font-(--ui-font-weight-bold) text-(--b24ui-typography-label-color) text-balance',
    message: 'mt-4 text-(length:--ui-font-size-2xl)/(--ui-font-line-height-md) text-(--b24ui-typography-description-color) text-balance',
    links: 'mt-8 flex items-center justify-center gap-6'
  }
}
