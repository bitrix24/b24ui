<script setup lang="ts">
const contextSidebar = useSidebarLayout()

const handleActionByContext = async () => {
  if (contextSidebar) {
    contextSidebar.setLoading(true)
    try {
      // Performing an asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 2_000))
    } finally {
      contextSidebar.setLoading(false)
    }
  }
}
</script>

<template>
  <B24Button label="Action" color="air-primary" @click="handleActionByContext" />
</template>
