<script setup lang="ts">
import { camelCase } from 'scule'
import * as theme from '#build/b24ui'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'
import BoardIcon from '@bitrix24/b24icons-vue/outline/BoardIcon'

const props = defineProps<{
  /**
   * The container element to find slots in.
   */
  container: HTMLElement | null
  /**
   * The positioned ancestor for highlight positioning.
   * If not provided, uses container.
   */
  positionContainer?: HTMLElement | null
  /**
   * Override the component slug taken from the route.
   */
  slug?: string
  /**
   * Whether the component is a prose component.
   */
  prose?: boolean
}>()

const route = useRoute()
const { track } = useAnalytics()

const camelName = computed(() => camelCase(props.slug ?? route.path.split('/').slice(0, -1).pop() ?? ''))
const componentTheme = computed(() => ((props.prose ? theme.prose : theme) as any)[camelName.value])

// Get all slot names from theme definition
const themeSlots = computed(() => Object.keys(componentTheme.value?.slots ?? {}))

const open = ref(false)
const highlightedSlot = ref<string | null>(null)
const highlightStyle = ref<{ left: string, top: string, width: string, height: string } | null>(null)
const isPortalHighlight = ref(false)
const popoverContentRef = useTemplateRef('popoverContentRef')

function getSlotClasses(slotName: string): string {
  const baseClasses = componentTheme.value?.slots?.[slotName] || ''
  return Array.isArray(baseClasses) ? baseClasses.filter(Boolean).join(' ') : baseClasses
}

function findSlotElement(slotName: string): { element: Element, inPortal: boolean } | null {
  if (!props.container) return null

  // First check in container
  const containerSlot = props.container.querySelector(`[data-slot="${slotName}"]`)
  if (containerSlot) {
    return { element: containerSlot, inPortal: false }
  }

  // Then check in Reka UI portals (excluding our own popover's portal)
  for (const child of document.body.children) {
    const hasRekaAttr = Array.from(child.attributes).some(attr => attr.name.startsWith('data-reka-'))
    if (hasRekaAttr) {
      // Skip the portal that contains our popover content
      if (popoverContentRef.value && child.contains(popoverContentRef.value)) {
        continue
      }
      const portalSlot = child.querySelector(`[data-slot="${slotName}"]`)
      if (portalSlot) {
        return { element: portalSlot, inPortal: true }
      }
    }
  }

  return null
}

function getSlotPosition(slotName: string): { style: { left: string, top: string, width: string, height: string }, inPortal: boolean } | null {
  const result = findSlotElement(slotName)
  if (!result) return null

  const targetRect = result.element.getBoundingClientRect()

  if (result.inPortal) {
    // Use fixed positioning for portal elements
    return {
      style: {
        left: `${targetRect.left}px`,
        top: `${targetRect.top}px`,
        width: `${targetRect.width}px`,
        height: `${targetRect.height}px`
      },
      inPortal: true
    }
  }

  // Use relative positioning for container elements
  const positionEl = props.positionContainer ?? props.container
  const positionRect = positionEl!.getBoundingClientRect()

  return {
    style: {
      left: `${targetRect.left - positionRect.left}px`,
      top: `${targetRect.top - positionRect.top}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`
    },
    inPortal: false
  }
}

// Initialize position to first rendered slot (so first hover can animate from there)
function initializePosition() {
  for (const slotName of themeSlots.value) {
    const position = getSlotPosition(slotName)
    if (position) {
      highlightStyle.value = position.style
      isPortalHighlight.value = position.inPortal
      break
    }
  }
}

function highlightSlot(slotName: string) {
  const position = getSlotPosition(slotName)
  if (!position) return

  highlightedSlot.value = slotName
  highlightStyle.value = position.style
  isPortalHighlight.value = position.inPortal
}

function clearHighlight() {
  highlightedSlot.value = null
}

function getSlotRenderLocation(slotName: string): 'container' | 'portal' | 'none' {
  const result = findSlotElement(slotName)
  if (!result) return 'none'
  return result.inPortal ? 'portal' : 'container'
}

// Initialize position when popover opens, clear when closes
watch(open, (isOpen) => {
  if (isOpen) {
    track('Theme Visualizer Opened', { component: camelName.value })
    initializePosition()
  } else {
    clearHighlight()
    highlightStyle.value = null
  }
})
</script>

<template>
  <template v-if="themeSlots.length">
    <B24Popover
      v-model:open="open"
      :content="{ align: 'start' }"
      :b24ui="{ content: 'w-[256px] max-h-[288px] overflow-y-auto scrollbar-thin' }"
      :dismissible="false"
    >
      <B24Button
        :icon="open ? CrossMIcon : BoardIcon"
        size="sm"
        class="absolute -top-[11px] -right-[11px] z-1 rounded-full lg:opacity-0 lg:group-hover/component:opacity-100 ring-(--ui-color-design-tinted-na-bg) transition-opacity duration-200"
        :class="[open && 'lg:opacity-100 bg-(--ui-color-bg-content-secondary)']"
      />

      <template #content>
        <div
          ref="popoverContentRef"
          class="px-2.5 py-1.5 text-(length:--ui-font-size-xs) font-(--ui-font-weight-semi-bold) text-(--b24ui-typography-label-color) border-b border-(--ui-color-divider-default)"
        >
          Theme slots
        </div>
        <div class="p-1">
          <div
            v-for="slotName in themeSlots"
            :key="slotName"
            class="p-1.5 cursor-default hover:bg-(--ui-color-bg-content-secondary) transition-colors rounded"
            :class="[highlightedSlot === slotName && 'bg-(--ui-color-bg-content-secondary)']"
            @mouseenter="highlightSlot(slotName)"
            @mouseleave="clearHighlight"
          >
            <div class="flex items-center gap-2">
              <code
                class="text-(length:--ui-font-size-xs) font-(--ui-font-weight-medium)"
                :class="[
                  getSlotRenderLocation(slotName) !== 'none'
                    ? 'text-(--b24ui-typography-label-color)'
                    : 'text-(--b24ui-typography-description-color)'
                ]"
              >{{ slotName }}</code>
              <span v-if="getSlotRenderLocation(slotName) === 'portal'" class="text-[10px] text-(--b24ui-typography-description-color)">(in portal)</span>
              <span v-else-if="getSlotRenderLocation(slotName) === 'none'" class="text-[10px] text-(--b24ui-typography-description-color)">(not rendered)</span>
            </div>
            <div v-if="getSlotClasses(slotName)" class="mt-0.5 text-[10px] text-(--b24ui-typography-description-color) line-clamp-2 font-[family-name:var(--ui-font-family-system-mono)]">
              {{ getSlotClasses(slotName) }}
            </div>
          </div>
        </div>
      </template>
    </B24Popover>

    <Teleport to="body" :disabled="!isPortalHighlight">
      <div
        v-if="highlightStyle"
        :style="highlightStyle"
        class="pointer-events-none border-2 border-dashed border-(--ui-color-design-filled-alert-stroke) rounded transition-all duration-150"
        :class="[
          highlightedSlot ? 'opacity-100' : 'opacity-0',
          isPortalHighlight ? 'fixed z-2147483647' : 'absolute z-1'
        ]"
      >
        <div
          v-if="highlightedSlot"
          class="absolute -top-6 -left-0.5 px-1.5 py-0.5 text-(length:--ui-font-size-xs) font-(--ui-font-weight-medium) font-[family-name:var(--ui-font-family-system-mono)] bg-(--ui-color-design-filled-alert-bg) text-(--ui-color-design-filled-alert-content-secondary) rounded whitespace-nowrap"
        >
          {{ highlightedSlot }}
        </div>
      </div>
    </Teleport>
  </template>
</template>
