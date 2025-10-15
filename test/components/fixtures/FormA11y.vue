<template>
  <B24Form>
    <B24FormField id="emailField" name="email" label="Email">
      <B24Input id="email" />
    </B24FormField>
    <B24FormField id="passwordField" name="password" label="Password">
      <B24Input id="password" />
    </B24FormField>

    <B24Form name="nested" nested>
      <B24FormField id="nestedField" name="field" label="Nested Field">
        <B24Input id="nested" />
      </B24FormField>
    </B24Form>
  </B24Form>
</template>
