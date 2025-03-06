<template>
  <B24Button
    :active="true"
    :b24ui="{ baseLine: 'justify-center w-[200px]' }"
    color="success"
    depth="normal"
    active-color="danger"
    active-depth="dark"
  >
    Active
  </B24Button>

  <B24Button
    :active="false"
    color="success"
    depth="normal"
    :b24ui="{ baseLine: 'justify-center w-[200px]' }"
    active-color="danger"
    active-depth="dark"
  >
    Inactive
  </B24Button>
</template>
