import { reactive } from 'vue'
import type { Reactive } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { FormProps } from '../../src/runtime/components/Form.vue'
import {
  B24Form,
  B24Input,
  B24FormField,
  B24RadioGroup,
  B24Textarea,
  B24Checkbox,
  B24Select,
  B24SelectMenu,
  B24InputMenu,
  // B24InputNumber,
  B24Switch,
  B24Range
  // B24PinInput
} from '#components'

export async function renderForm(options: {
  state?: Reactive<any>
  props: Partial<FormProps<any>>
  slotVars?: object
  slotTemplate: string
}) {
  const state = options.state ?? reactive({})

  return await mountSuspended(B24Form, {
    props: {
      id: 42,
      state,
      ...options.props
    },
    slots: {
      default: {
        // @ts-expect-error - Object literal may only specify known properties, and setup does not exist in type
        setup() {
          return { state, ...options.slotVars }
        },
        components: {
          B24FormField,
          B24Form,
          B24Input,
          B24RadioGroup,
          B24Textarea,
          B24Checkbox,
          B24Select,
          B24SelectMenu,
          B24InputMenu,
          // B24InputNumber,
          B24Switch,
          B24Range
          // B24PinInput
        },
        template: options.slotTemplate
      }
    }
  })
}
