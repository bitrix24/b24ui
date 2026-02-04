<script setup lang="ts">
const props = defineProps<{
  type: string
}>()

const type = computed(() => {
  let type = props.type
  if (type.includes(', "as" | "asChild" | "forceMount">')) {
    type = type.replace(`, "as" | "asChild" | "forceMount">`, ``).replace('Omit<', '')
  }
  if (type.includes(', "as" | "asChild">')) {
    type = type.replace(', "as" | "asChild">', '').replace('Omit<', '')
  }
  if (type.startsWith('undefined |')) {
    type = type.replace('undefined |', '')
  }
  if (type.endsWith('| undefined')) {
    type = type.replace('| undefined', '')
  }

  /**
   * @memo customize color property
   * @todo test all colors
   * @see docs/server/utils/transformMDC.ts
   */
  if (type.includes('air-primary') && type.includes('air-primary-success')) {
    // @todo remove whet unset default / danger / ...
    let isInnerColor = false

    if (type.includes('color')) {
      isInnerColor = true
      type = type.replace('color?: ', '')
    }
    type = type.replace('| undefined', '').replace('"default" | ', '').replace('"danger" | ', '').replace('"success" | ', '').replace('"warning" | ', '').replace('"primary" | ', '').replace('"secondary" | ', '').replace('"collab" | ', '').replace('"ai" | ', '').replace('| "ai"', '').replace('"link" | ', '').trim()
    const priorityMap = new Map([
      ['air-primary', 1],
      ['air-primary-success', 2],
      ['air-primary-alert', 3],
      ['air-primary-warning', 4],
      ['air-primary-copilot', 5],
      ['air-secondary', 6],
      ['air-secondary-alert', 7],
      ['air-secondary-accent', 8],
      ['air-secondary-accent-1', 9],
      ['air-secondary-accent-2', 10],
      ['air-secondary-no-accent', 11],
      ['air-tertiary', 12],
      ['air-tertiary-accent', 13],
      ['air-tertiary-no-accent', 14],
      ['air-selection', 15],
      ['air-boost', 16]
    ])
    const items = type.split(' | ').map((item: string) => item.replace(/"/g, ''))
    const sortedItems = items.sort((a: string, b: string) => {
      const priorityA = priorityMap.get(a) || Number.MAX_SAFE_INTEGER
      const priorityB = priorityMap.get(b) || Number.MAX_SAFE_INTEGER
      return priorityA - priorityB
    })
    type = sortedItems.map((item: string) => `"${item}"`).join(' | ')
    if (isInnerColor) {
      type = `color?: ${type}`
    }
  }

  return type
})

const ast = ref<any>(null)

onMounted(async () => {
  ast.value = await parseMarkdown(`\`\` ${type.value} \`\`{lang="ts-type"}`)
})
</script>

<template>
  <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />
  <ProseCode v-else>
    {{ type }}
  </ProseCode>
</template>
