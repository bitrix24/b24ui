<script setup lang="ts">
import { withoutTrailingSlash, withTrailingSlash } from 'ufo'

const route = useRoute()

const { data: surround } = await useAsyncData(`${route.path}-surround`, async () => {
  const surround = await queryCollectionItemSurroundings('docs', withoutTrailingSlash(route.path), {
    fields: ['description']
  })
  if (surround[0]) {
    surround[0].path = withTrailingSlash(surround[0].path)
  }
  if (surround[1]) {
    surround[1].path = withTrailingSlash(surround[1].path)
  }

  return surround
})
</script>

<template>
  <B24ContentSurround :surround="(surround as any)" />
</template>
