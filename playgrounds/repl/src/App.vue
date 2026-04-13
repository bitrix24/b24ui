<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const {
  importMap: vueImportMap,
  vueVersion
} = useVueImportMap({
  runtimeDev: 'https://esm.sh/vue@3/dist/vue.esm-browser.js',
  runtimeProd: 'https://esm.sh/vue@3/dist/vue.esm-browser.prod.js',
  serverRenderer: 'https://esm.sh/@vue/server-renderer@3/dist/server-renderer.esm-browser.js'
})

const builtinImportMap = computed(() => ({
  imports: {
    ...vueImportMap.value.imports,
    '@bitrix24/b24ui-builtin': '/bitrix24-b24ui.js',
    'zod': 'https://esm.sh/zod@4?external=vue'
  }
}))

const store = useStore(
  {
    builtinImportMap,
    vueVersion,
    showOutput: ref(false),
    outputMode: ref('preview')
  },
  location.hash
)

const defaultCode = `<script setup lang="ts">
import { z } from 'zod'
import { reactive } from 'vue'

const months = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1).padStart(2, '0'),
  value: String(i + 1).padStart(2, '0')
}))

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => ({
  label: String(currentYear + i),
  value: String(currentYear + i)
}))

const schema = z.object({
  name: z.string({ error: 'Name is required' }).nonempty('Name is required'),
  cardNumber: z
    .string({ error: 'Card number is required' })
    .nonempty('Card number is required')
    .regex(/^[\\d\\s]{16,19}$/, 'Enter a valid 16-digit card number'),
  cvv: z
    .string({ error: 'CVV is required' })
    .nonempty('CVV is required')
    .regex(/^\\d{3,4}$/, 'Enter a valid CVV'),
  month: z.string({ error: 'Month is required' }).nonempty('Select a month'),
  year: z.string({ error: 'Year is required' }).nonempty('Select a year'),
  sameAsShipping: z.boolean().default(true),
  comments: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  cardNumber: undefined,
  cvv: undefined,
  month: undefined,
  year: undefined,
  sameAsShipping: true,
  comments: undefined
})
<\/script>

<template>
  <B24App>
    <div class="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col justify-center antialiased font-sans isolate">
      <B24Card class="max-w-md mx-auto" variant="tinted-no-accent">
        <B24Form :schema="schema" :state="state" class="space-y-6">
          <B24PageCard title="Payment method" description="All transactions are secure and encrypted" variant="tinted-warning" />

          <B24FormField name="name" label="Name" required>
            <B24Input v-model="state.name" placeholder="John Doe" class="w-full" />
          </B24FormField>

          <div class="grid grid-cols-3 gap-4">
            <B24FormField name="cardNumber" label="Card number" help="Enter your 16-digit number." required class="col-span-2">
              <B24Input v-model="state.cardNumber" placeholder="1234 5678 9012 3456" class="w-full" />
            </B24FormField>

            <B24FormField name="cvv" label="CVV" required>
              <B24Input v-model="state.cvv" placeholder="123" class="w-full" />
            </B24FormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <B24FormField name="month" label="Month" required>
              <B24Select v-model="state.month" :items="months" placeholder="MM" value-key="value" class="w-full" />
            </B24FormField>

            <B24FormField name="year" label="Year" required>
              <B24Select v-model="state.year" :items="years" placeholder="YYYY" value-key="value" class="w-full" />
            </B24FormField>
          </div>

          <B24Separator />

          <B24PageCard title="Billing address" description="The billing address associated with your payment method" variant="filled-copilot" />

          <B24FormField name="sameAsShipping">
            <B24Checkbox v-model="state.sameAsShipping" label="Same as shipping address" />
          </B24FormField>

          <B24Separator />

          <B24FormField name="comments" label="Comments">
            <B24Textarea v-model="state.comments" placeholder="Add any additional comments" :rows="3" class="w-full" />
          </B24FormField>

          <div class="flex gap-3">
            <B24Button type="submit" label="Submit" color="air-primary" />
            <B24Button type="button" label="Cancel" color="air-secondary-no-accent" />
          </div>
        </B24Form>
      </B24Card>
    </div>
  </B24App>
</template>`

if (!location.hash) {
  store.setFiles({
    'src/App.vue': defaultCode
  }, 'src/App.vue')
}

watchEffect(() => history.replaceState({}, '', store.serialize()))

const previewOptions = {
  headHTML: [
    '<script>window.__VUE_PROD_DEVTOOLS__=false<\/script>',
    '<link rel="stylesheet" href="/bitrix24-b24ui.css">',
    '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>',
    '<style type="text/tailwindcss">@layer base { .light, :root { --air-theme-bg-color: #ffffff; } .dark { --air-theme-bg-color: #000000; } }</style>'
  ].join(''),
  customCode: {
    importCode: 'import b24Ui from \'@bitrix24/b24ui-builtin\'',
    useCode: 'app.use(b24Ui)'
  }
}
</script>

<template>
  <B24App>
    <div class="h-dvh flex flex-col">
      <B24Header title="Bitrix24 UI Playground" :b24ui="{ container: 'max-w-full' }">
        <template #left>
          <Logo class="w-auto h-6 shrink-0" />
        </template>

        <template #right>
          <B24ColorModeButton />

          <B24Tooltip text="Open on GitHub">
            <B24Button
              aria-label="Bitrix24 UI on GitHub"
              color="air-tertiary-no-accent"
              to="https://github.com/bitrix24/b24ui"
              target="_blank"
              :icon="GitHubIcon"
              size="sm"
              :b24ui="{ baseLine: '[--ui-btn-icon-size:16px]' }"
            />
          </B24Tooltip>
        </template>
      </B24Header>

      <Repl
        :store="store"
        :editor="CodeMirror"
        :show-compile-output="false"
        :show-ts-config="false"
        :show-import-map="false"
        :clear-console="false"
        :preview-options="previewOptions"
        class="flex-1"
      />
    </div>
  </B24App>
</template>

<style>
.vue-repl,
.dark .vue-repl {
  --bg: var(--ui-color-bg-content-primary);
  --bg-soft: var(--ui-color-divider-less);
  --border: var(--ui-color-divider-default);
  --text-light: var(--ui-color-design-plain-na-content-secondary);
  --color-branding: var(--ui-color-accent-main-primary);
  --color-branding-dark: var(--ui-color-accent-main-primary);

  & .file-selector {
    padding-inline: calc(var(--spacing) * 4);

    @media (width >= 40rem) {
      padding-inline: calc(var(--spacing) * 6);
    }

    @media (width >= 64rem) {
      padding-inline: calc(var(--spacing) * 8);
    }
  }

  & .add,
  & .import-map-wrapper,
  & .tab-buttons {
    display: none;
  }

  & .output-container {
    height: 100%;
  }
}

.CodeMirror,
.dark .CodeMirror {
  --base: var(--b24ui-typography-label-color);
  --comment: var(--ui-color-base-60);
  --selected-bg: var(--ui-color-accent-soft-element-blue);
  --selected-bg-non-focus: var(--ui-color-accent-soft-element-blue);
}
</style>
