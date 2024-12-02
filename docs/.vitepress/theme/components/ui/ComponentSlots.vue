<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'
import B24UIMeta from '@bitrix24/b24ui-nuxt/meta'

const $props = withDefaults(defineProps<{
  component: string
}>(), {})

const camelName = camelCase($props.component)
const name = `B24${upperFirst(camelName)}`
const meta = B24UIMeta[name] || {}

// @todo style
// @todo add ProseCode
// @todo add <HighlightInlineType v-if="slot.type" :type="slot.type" />
// @todo add <MDC v-if="slot.description" :value="slot.description" class="text-[var(--ui-text-toned)] mt-1" />
</script>

<template>
  <ProseTable>
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
    <tbody>
      <ProseTr
        v-for="slot in (meta?.meta?.slots || [])"
        :key="slot.name"
      >
        <ProseTd translate="no">
          <ProseCode>{{ slot.name }}</ProseCode>
        </ProseTd>
        <ProseTd translate="no">
          <div v-if="slot.type">
            {{ slot.type }}
          </div>

          <div v-if="slot.description">
            {{ slot.description }}
          </div>
        </ProseTd>
      </ProseTr>
    </tbody>
  </ProseTable>
</template>
