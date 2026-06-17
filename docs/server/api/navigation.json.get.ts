// This route will be pre-rendered as /api/navigation.json
import { queryCollectionNavigation } from '@nuxt/content/server'

// const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework', 'category', 'description', 'badge']))
export default defineEventHandler((event) => {
  return queryCollectionNavigation(event, 'docs', ['framework', 'category', 'description'])
})
