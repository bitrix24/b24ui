export function useFooter() {
  const links = [
    {
      label: 'Templates',
      to: '/templates/'
    },
    {
      label: 'Showcase',
      to: '/showcase/'
    }
  ]

  return {
    links
  }
}
