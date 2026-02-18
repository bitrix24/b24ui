<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'

const route = useRoute()
const appConfig = useAppConfig()
const { open, isOpen } = useAssistant()
const input = ref('')
const isVisible = ref(true)
const inputRef = ref<{ inputRef: HTMLInputElement } | null>(null)
// const isDocsRoute = computed(() => route.meta.layout === 'docs')
const isDocsRoute = computed(() => route.path.startsWith('/docs/'))
const isFloatingInputEnabled = computed(() => appConfig.bxAssistant?.floatingInput !== false)
const focusInputShortcut = computed(() => appConfig.bxAssistant?.shortcuts?.focusInput || 'meta_i')
const placeholder = computed(() => 'Ask a question...')

const shortcutDisplayKeys = computed(() => {
  const shortcut = focusInputShortcut.value
  const parts = shortcut.split('_')
  return parts.map((part: string) => part === 'meta' ? 'meta' : part.toUpperCase())
})

function handleSubmit() {
  if (!input.value.trim()) return

  const message = input.value
  isVisible.value = false

  setTimeout(() => {
    open(message, true)
    input.value = ''
    isVisible.value = true
  }, 200)
}

const shortcuts = computed(() => ({
  [focusInputShortcut.value]: {
    usingInput: true,
    handler: () => {
      if (!isDocsRoute.value || !isFloatingInputEnabled.value) return
      inputRef.value?.inputRef?.focus()
    }
  },
  escape: {
    usingInput: true,
    handler: () => {
      inputRef.value?.inputRef?.blur()
    }
  }
}))

defineShortcuts(shortcuts)
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="isFloatingInputEnabled && isDocsRoute && isVisible && !isOpen"
      key="floating-input"
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :exit="{ y: 100, opacity: 0 }"
      :transition="{ duration: 0.2, ease: 'easeOut' }"
      class="pointer-events-none fixed inset-x-0 z-10 bottom-[max(1.5rem,env(safe-area-inset-bottom))] px-4 sm:px-80"
      style="will-change: transform"
    >
      <form
        class="pointer-events-none flex w-full justify-center"
        @submit.prevent="handleSubmit"
      >
        <div class="pointer-events-auto w-full max-w-96">
          <B24Input
            ref="inputRef"
            v-model="input"
            :placeholder="placeholder"
            size="lg"
            maxlength="1000"
            :b24ui="{
              root: 'group w-full! min-w-0 sm:max-w-96 transition-all duration-300 ease-out [@media(hover:hover)]:hover:scale-105 [@media(hover:hover)]:focus-within:scale-105',
              base: 'base-mode bg-(--ui-color-bg-content-primary) shadow-lg rounded-xl text-base',
              trailing: 'pe-2'
            }"
            @keydown.enter.exact.prevent="handleSubmit"
          >
            <template #trailing>
              <div class="flex items-center gap-2">
                <div class="hidden sm:flex group-focus-within:hidden items-center gap-1">
                  <B24Kbd
                    v-for="key in shortcutDisplayKeys"
                    :key="key"
                    :value="key"
                  />
                </div>

                <B24Button
                  type="submit"
                  :icon="ArrowTopLIcon"
                  color="air-primary-copilot"
                  size="xs"
                  :disabled="!input.trim()"
                />
              </div>
            </template>
          </B24Input>
        </div>
      </form>
    </motion.div>
  </AnimatePresence>
</template>
