<template>
  <B24Button
    :active="true"
    :b24ui="{ baseLine: 'justify-center w-[200px]' }"
    active-class="italic"
    inactive-class="tracking-widest"
  >
    Active
  </B24Button>

  <B24Button
    :active="false"
    :b24ui="{ baseLine: 'justify-center w-[200px]' }"
    active-class="italic"
    inactive-class="tracking-widest"
  >
    Inactive
  </B24Button>
</template>
