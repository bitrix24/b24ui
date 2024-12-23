<script setup lang="ts">
import theme from '#build/b24ui/separator'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

usePageMeta.setPageTitle('Separator')
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="default">
      <div class="mt-4 flex flex-col gap-4">
        <div>
          <p class="font-b24-secondary text-black dark:text-base-150 text-h6 font-semibold">
            Bitrix24 UI
          </p>
          <p class="font-b24-primary text-sm text-base-500">
            An open source UI components corresponding to the Bitrix24 interface.
          </p>
        </div>

        <B24Separator :icon="Bitrix24Icon" type="dashed" />

        <div class="h-24 flex gap-4 items-center">
          <div class="flex-1 text-center text-black dark:text-base-150">
            Blog
          </div>

          <B24Separator
            :avatar="{ src: '/avatar/assistant.png' }"
            decorative
            orientation="vertical"
          />

          <div class="flex-1 text-center text-black dark:text-base-150">
            Docs
          </div>

          <B24Separator decorative orientation="vertical">
            <B24Avatar size="md" src="/avatar/employee.png" />
          </B24Separator>

          <div class="flex-1 text-center text-black dark:text-base-150">
            Source
          </div>
        </div>

        <B24Separator label="As simple as it gets" type="dotted" />
      </div>
    </ExampleCard>

    <ExampleCard title="size">
      <div class="mt-4 flex flex-col gap-4">
        <B24Separator label="xs" size="xs" />
        <B24Separator label="sm" size="sm" />
        <B24Separator label="md" size="md"/>
        <B24Separator label="lg" size="lg" />
        <B24Separator label="xl" size="xl" />
      </div>
    </ExampleCard>

    <ExampleCard title="color">
      <div class="mt-4 flex flex-col gap-4">
        <B24Separator label="default" size="xl" color="default" />
        <B24Separator label="danger" size="xl" color="danger" />
        <B24Separator label="success" size="xl" color="success" />
        <B24Separator label="warning" size="xl" color="warning" />
        <B24Separator label="primary" size="xl" color="primary" />
        <B24Separator label="secondary" size="xl" color="secondary" />
        <B24Separator label="ai" size="xl" color="ai" />
      </div>
    </ExampleCard>

    <ExampleCard title="type">
      <div class="mt-4 flex flex-col gap-4">
        <B24Separator label="solid" type="solid" size="md" />
        <B24Separator label="dashed" type="dashed" size="md" />
        <B24Separator label="dotted" type="dotted" size="md" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
