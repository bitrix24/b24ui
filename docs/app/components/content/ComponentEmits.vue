<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'

const props = defineProps<{
  prose?: boolean
}>()

const route = useRoute()

const camelName = camelCase(route.path.split('/').filter(Boolean).pop() ?? '')
const name = props.prose ? `Prose${upperFirst(camelName)}` : `B24${upperFirst(camelName)}`

const meta = await fetchComponentMeta(name as any)
</script>

<template>
  <ProseTable
    :zebra="false"
    :row-hover="false"
    :class="[
      'overflow-x-auto w-full',
      'border border-(--ui-color-design-tinted-na-stroke)',
      '[&>table>tbody>tr>th]:align-top',
      '[&>table>tbody>tr>td]:align-top',

      '[&>table>thead>tr>th]:border-e',
      '[&>table>thead>tr>th]:last:border-e-0',
      '[&>table>thead>tr>th]:border-(--ui-color-design-tinted-na-stroke)',

      '[&>table>tbody>tr>td]:border-e',
      '[&>table>tbody>tr>td]:last:border-e-0',
      '[&>table>tbody>tr>td]:border-(--ui-color-design-tinted-na-stroke)',

      '[&>table>tbody>tr>th]:border-e',
      '[&>table>tbody>tr>th]:last:border-e-0',
      '[&>table>tbody>tr>th]:border-(--ui-color-design-tinted-na-stroke)'
    ]"
  >
    <ProseThead>
      <ProseTr>
        <ProseTh>
          Event
        </ProseTh>
        <ProseTh>
          Type
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="event in (meta?.meta?.events || [])" :key="event.name">
        <ProseTd>
          <ProseCode>
            {{ event.name }}
          </ProseCode>
        </ProseTd>
        <ProseTd>
          <HighlightInlineType v-if="event.type" :type="event.type" />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
