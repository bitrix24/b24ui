<template>
  <tr
    class="[&:first-child>th:first-child]:rounded-tl-[calc(var(--ui-radius)*1.5)] [&:first-child>th:last-child]:rounded-tr-[calc(var(--ui-radius)*1.5)] [&:last-child>td:first-child]:rounded-bl-[calc(var(--ui-radius)*1.5)] [&:last-child>td:last-child]:rounded-br-[calc(var(--ui-radius)*1.5)]"
  >
    <slot />
  </tr>
</template>
