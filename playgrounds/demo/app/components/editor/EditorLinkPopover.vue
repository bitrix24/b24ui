<script setup lang="ts">
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import LowerRightArrowIcon from '@bitrix24/b24icons-vue/outline/LowerRightArrowIcon'
import GoToLIcon from '@bitrix24/b24icons-vue/outline/GoToLIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const props = defineProps<{
  editor: any
  autoOpen?: boolean
}>()

const open = ref(false)
const url = ref('')

const active = computed(() => props.editor.isActive('link'))
const disabled = computed(() => {
  if (!props.editor.isEditable) return true
  const { selection } = props.editor.state
  return selection.empty && !props.editor.isActive('link')
})

watch(() => props.editor, (editor, _, onCleanup) => {
  if (!editor) return

  const updateUrl = () => {
    const { href } = editor.getAttributes('link')
    url.value = href || ''
  }

  updateUrl()
  editor.on('selectionUpdate', updateUrl)

  onCleanup(() => {
    editor.off('selectionUpdate', updateUrl)
  })
}, { immediate: true })

watch(active, (isActive) => {
  if (isActive && props.autoOpen) {
    open.value = true
  }
})

function setLink() {
  if (!url.value) return

  const { selection } = props.editor.state
  const isEmpty = selection.empty
  const hasCode = props.editor.isActive('code')

  let chain = props.editor.chain().focus()

  // When linking code, extend the code mark range first to select the full code
  if (hasCode && !isEmpty) {
    chain = chain.extendMarkRange('code').setLink({ href: url.value })
  } else {
    chain = chain.extendMarkRange('link').setLink({ href: url.value })

    if (isEmpty) {
      chain = chain.insertContent({ type: 'text', text: url.value })
    }
  }

  chain.run()
  open.value = false
}

function removeLink() {
  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .unsetLink()
    .setMeta('preventAutolink', true)
    .run()

  url.value = ''
  open.value = false
}

function openLink() {
  if (!url.value) return
  window.open(url.value, '_blank', 'noopener,noreferrer')
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    setLink()
  }
}
</script>

<template>
  <B24Popover v-model:open="open" :ui="{ content: 'p-0.5' }">
    <B24Tooltip text="Link">
      <B24Button
        :icon="LinkIcon"
        color="air-tertiary-no-accent"
        active-color="air-primary"
        size="sm"
        :active="active"
        :disabled="disabled"
      />
    </B24Tooltip>

    <template #content>
      <B24Input
        v-model="url"
        autofocus
        name="url"
        type="url"
        size="sm"
        variant="none"
        placeholder="Paste a link..."
        @keydown="handleKeyDown"
      >
        <div class="flex items-center mr-0.5">
          <B24Button
            :icon="LowerRightArrowIcon"
            color="air-tertiary-accent"
            size="sm"
            :disabled="!url && !active"
            title="Apply link"
            @click="setLink"
          />

          <B24Separator orientation="vertical" class="h-6 mx-1" />

          <B24Button
            :icon="GoToLIcon"
            color="air-tertiary-no-accent"
            size="sm"
            :disabled="!url && !active"
            title="Open in new window"
            @click="openLink"
          />

          <B24Button
            :icon="TrashcanIcon"
            color="air-tertiary-no-accent"
            size="sm"
            :disabled="!url && !active"
            title="Remove link"
            @click="removeLink"
          />
        </div>
      </B24Input>
    </template>
  </B24Popover>
</template>
