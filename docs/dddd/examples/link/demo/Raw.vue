<template>
  <B24Link
    to="https://bitrix24.github.io/b24ui/components/link.html"
    target="_blank"
    raw
    active
    active-class="font-bold text-ai-500"
    inactive-class="text-red-500"
  >
    Link (active)
  </B24Link>
  <B24Link
    to="wrong_path"
    target="_blank"
    raw
    active-class="font-bold text-ai-500"
    inactive-class="text-red-500"
  >
    Link (not active)
  </B24Link>
</template>
