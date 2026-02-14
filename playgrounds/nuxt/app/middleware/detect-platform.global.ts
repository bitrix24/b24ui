export default defineNuxtRouteMiddleware((to) => {
  let userAgent = ''

  if (import.meta.server) {
    userAgent = useRequestHeader('user-agent') || ''
  } else {
    userAgent = navigator.userAgent
  }

  // @todo fix this
  console.warn({ userAgent, to })
  // alert(JSON.stringify({ userAgent, to }, null, 2))
  const isNativeApp = userAgent.includes('MyCoolApp')
  const platformValue = isNativeApp ? 'mobile' : 'web'

  useHead({
    htmlAttrs: {
      'data-platform': platformValue
    }
  })

  const platform = useState('platform', () => platformValue)
  platform.value = platformValue
})
