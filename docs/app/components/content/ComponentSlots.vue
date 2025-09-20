<script setup lang="ts">
import { upperFirst, camelCase, kebabCase } from 'scule'

const props = defineProps<{
  prose?: boolean
  slug?: string
}>()

const route = useRoute()

const camelName = camelCase(props.slug ?? route.path.split('/').filter(Boolean).pop() ?? '')
const name = `${props.prose ? 'Prose' : 'B24'}${upperFirst(camelName)}`

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
          Slot
        </ProseTh>
        <ProseTh>
          Type
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="slot in (meta?.meta?.slots || [])" :key="slot.name">
        <ProseTd>
          <ProseCode>
            {{ slot.name }}
          </ProseCode>
        </ProseTd>
        <ProseTd>
          <HighlightInlineType v-if="slot.type" :type="slot.type.replace(/b24ui:\s*\{[^}]*\}/g, 'b24ui: {}')" />

          <MDC v-if="slot.description" :value="slot.description" class="text-toned mt-1" :cache-key="`${kebabCase(route.path)}-${slot.name}-description`" />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
