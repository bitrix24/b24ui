<script setup lang="ts">
const { screen } = useDevice()

const variantByScreen = computed(() => {
  switch (screen.value.current) {
    case 'xs': return 'filled'
    case 'sm': return 'outline-accent-2'
    case 'md': return 'tinted-no-accent'
    case 'lg': return 'tinted-warning'
    case 'xl': return 'tinted-alert'
  }

  return 'selection'
})
</script>

<template>
  <div>
    <B24Card :variant="variantByScreen">
      <div v-if="screen.current === 'xs'">
        Extra small screen (&lt; 640px)
      </div>
      <div v-else-if="screen.current === 'sm'">
        Small screen (640px – 767px)
      </div>
      <div v-else-if="screen.current === 'md'">
        Medium screen (768px – 1023px)
      </div>
      <div v-else-if="screen.current === 'lg'">
        Large screen (1024px – 1279px)
      </div>
      <div v-else-if="screen.current === 'xl'">
        Extra large screen (1280px – 1535px)
      </div>
      <div v-else>
        2XL screen (&ge; 1536px)
      </div>
    </B24Card>
  </div>
</template>
