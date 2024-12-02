<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'
import B24UIMeta from '@bitrix24/b24ui-nuxt/meta'

const $props = withDefaults(defineProps<{
  component: string
}>(), {})

const camelName = camelCase($props.component)
const name = `B24${upperFirst(camelName)}`
const meta = B24UIMeta[name] || {}
</script>

<template>
  <ProseTable>
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
    <tbody>
      <ProseTr
        v-for="event in (meta?.meta?.events || [])"
        :key="event.name"
      >
        <ProseTd translate="no">
          <ProseCode>{{ event.name }}</ProseCode>
        </ProseTd>
        <ProseTd translate="no">
          <ProseCode v-if="event.type">
            {{ event.type }}
          </ProseCode>
        </ProseTd>
      </ProseTr>
    </tbody>
  </ProseTable>
</template>
