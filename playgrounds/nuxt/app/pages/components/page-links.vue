<script setup lang="ts">
import type { PageLink } from '@bitrix24/b24ui-nuxt'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import DocumentSignIcon from '@bitrix24/b24icons-vue/main/DocumentSignIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

usePageMeta.setPageTitle('PageLinks')

const isUseBg = ref(true)

const links = computed<PageLink[]>(() => [{
  label: 'Edit this page',
  icon: DocumentSignIcon,
  to: `https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/page-links.md`,
  target: '_blank'
}, {
  label: 'Star on GitHub',
  icon: AiStarsIcon,
  to: 'https://github.com/bitrix24/b24ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: RocketIcon,
  to: 'https://github.com/bitrix24/b24ui/releases'
}])
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="matrix" :use-bg="isUseBg" class="sm:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="flex flex-col gap-10 min-h-0">
        <B24PageLinks title="Community" :links="links" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
