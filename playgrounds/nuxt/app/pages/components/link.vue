<script setup lang="ts">
const attrs = reactive({
  to: '/components/link',
  active: false,
  disabled: false,
  raw: false,
  isAction: false
})

const classes = reactive({
  activeClass: 'font-(--ui-font-weight-bold) text-(--ui-color-copilot-accent-primary)',
  inactiveClass: 'text-(--ui-color-accent-main-alert)'
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Input v-model="attrs.to" class="min-w-52" type="url" placeholder="to" />
      <B24Input v-model="classes.activeClass" class="min-w-52" placeholder="activeClass" />
      <B24Input v-model="classes.inactiveClass" class="min-w-52" placeholder="inactiveClass" />

      <B24Switch v-model="attrs.active" label="Active" />
      <B24Switch v-model="attrs.disabled" label="Disabled" />
      <B24Switch v-model="attrs.raw" label="Raw" />
      <B24Switch v-model="attrs.isAction" label="isAction" />
    </template>

    <template #default="{ cardVariant, cardBorderClass }">
      <B24Card
        :variant="cardVariant"
        :class="[cardBorderClass, 'mx-auto']"
      >
        <template #header>
          <ProseH5 class="mb-0">
            {{ attrs.to ? 'As link (tag <a>)' : 'As tag <button>' }}
          </ProseH5>
        </template>

        <div class="flex flex-col items-start gap-3 text-(length:--ui-font-size-sm)">
          <B24Link v-bind="attrs">
            {{ `${attrs.to ? 'Link' : 'Button'} preview` }}
          </B24Link>
          <B24Link v-bind="{ ...attrs, ...classes }">
            {{ `${attrs.to ? 'Link' : 'Button'} preview (with classes)` }}
          </B24Link>
        </div>
      </B24Card>
    </template>
  </PlaygroundPage>
</template>
