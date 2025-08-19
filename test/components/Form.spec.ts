import { reactive, ref, nextTick, watch } from 'vue'
import { describe, it, expect, test, beforeEach, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import * as z from 'zod'
import * as yup from 'yup'
import Joi from 'joi'
import * as valibot from 'valibot'
import { object, string, nonempty, refine } from 'superstruct'
import ComponentRender from '../component-render'
import type { FormProps, FormSlots } from '../../src/runtime/components/Form.vue'
import { renderForm } from '../utils/form'

import {
  B24Form,
  B24Input,
  B24FormField
} from '#components'
import { flushPromises } from '@vue/test-utils'

interface CustomValidationError {
  name: string
  message: string
}

describe('Form', () => {
  it.each([
    // Props
    ['with state', { props: { state: {} } }],
    // Slots
    ['with default slot', { props: { state: {} }, slots: { default: () => 'Form slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props: FormProps<any>, slots?: Partial<FormSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, B24Form)
    expect(html).toMatchSnapshot()
  })

  it.each([
    ['zod', {
      schema: z.object({
        email: z.string(),
        password: z.string().min(8, 'Must be at least 8 characters')
      })
    }
    ],
    ['yup', {
      schema: yup.object({
        email: yup.string(),
        password: yup.string().min(8, 'Must be at least 8 characters')
      })
    }
    ],
    ['joi', {
      schema: Joi.object({
        email: Joi.string(),
        password: Joi.string().min(8).messages({
          'string.min': 'Must be at least {#limit} characters'
        })
      })
    }
    ],
    ['valibot', {
      schema: valibot.object({
        email: valibot.string(),
        password: valibot.pipe(valibot.string(), valibot.minLength(8, 'Must be at least 8 characters'))
      })
    }
    ],
    ['superstruct', {
      schema: object({
        email: nonempty(string()),
        password: refine(string(), 'Password', (value) => {
          if (value.length >= 8) return true
          return 'Must be at least 8 characters'
        })
      })
    }],
    ['custom', {
      async validate(state: any) {
        /**
         * @todo test this
         */
        const errs: CustomValidationError[] = []
        // const errs = []
        if (!state.email)
          errs.push({ name: 'email', message: 'Email is required' })
        if (state.password?.length < 8)
          errs.push({
            name: 'password',
            message: 'Must be at least 8 characters'
          })

        return errs
      }
    }
    ]
  ])('%s validation works', async (_nameOrHtml: string, options: Partial<FormProps<any>>) => {
    const onSubmit = vi.fn()

    const wrapper = await renderForm({
      props: { ...options, onSubmit },
      slotTemplate: `
          <B24FormField name="email">
            <B24Input id="email" v-model="state.email" />
          </B24FormField>
          <B24FormField name="password">
            <B24Input id="password" v-model="state.password" />
          </B24FormField>
        `
    })

    const form = wrapper.find('form')
    const emailInput = wrapper.find('#email')
    const passwordInput = wrapper.find('#password')

    await emailInput.setValue('bob@dylan.com')
    await passwordInput.setValue('short')

    await form.trigger('submit.prevent')
    await flushPromises()
    // @ts-expect-error object is possibly undefined
    expect(wrapper.emitted('error')[0][0].errors).toMatchObject([
      {
        id: 'password',
        name: 'password',
        message: 'Must be at least 8 characters'
      }
    ])

    expect(wrapper.html()).toMatchSnapshot('with error')

    await passwordInput.setValue('validpassword')
    await form.trigger('submit.prevent')
    await flushPromises()

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      data: { email: 'bob@dylan.com', password: 'validpassword' }
    }))

    expect(wrapper.html()).toMatchSnapshot('without error')
  })

  describe('api', async () => {
    let wrapper: any
    let form: any
    let state: any

    beforeEach(async () => {
      wrapper = await mountSuspended({
        components: {
          B24FormField,
          B24Form,
          B24Input
        },
        setup() {
          const form = ref()
          const state = reactive({})
          const schema = z.object({
            email: z.string().email(),
            password: z.string().min(8)
          })

          const onError = vi.fn()
          const onSubmit = vi.fn()

          return { state, schema, form, onSubmit, onError }
        },
        template: `
          <B24Form ref="form" :state="state" :schema="schema" @submit="onSubmit" @error="onError">
            <B24FormField id="emailField" name="email">
              <B24Input id="emailInput" v-model="state.email" />
            </B24FormField>
            <B24FormField id="passwordField" name="password">
              <B24Input id="passwordInput" v-model="state.password" />
            </B24FormField>
          </B24Form>
        `
      })
      form = wrapper.setupState.form
      state = wrapper.setupState.state
    })

    test('setErrors works', async () => {
      form.value.setErrors([{
        name: 'email',
        message: 'this is an error'
      }])

      expect(form.value.errors).toMatchObject([{
        id: 'emailInput',
        name: 'email',
        message: 'this is an error'
      }])

      await nextTick()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('this is an error')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('')
    })

    // @todo test this
    // test('setErrors with regex works', async () => {
    //   form.value.setErrors([{ id: 'emailInput', name: 'email', message: 'this is an error' }])
    //
    //   expect(form.value.errors).toMatchObject([{ id: 'emailInput', name: 'email', message: 'this is an error' }])
    //
    //   form.value.setErrors([{ id: 'passwordInput', name: 'password', message: 'this is another error' }], /email/)
    //
    //   expect(form.value.errors).toMatchObject([{ id: 'passwordInput', name: 'password', message: 'this is another error' }])
    //
    //   await nextTick()
    //
    //   const emailField = wrapper.find('#emailField')
    //   expect(emailField.text()).toBe('')
    //
    //   const passwordField = wrapper.find('#passwordField')
    //   expect(passwordField.text()).toBe('this is another error')
    // })

    test('clear works', async () => {
      form.value.setErrors([{
        id: 'emailInput',
        name: 'email',
        message: 'this is an error'
      }])

      form.value.clear()

      expect(form.value.errors).toMatchObject([])

      await flushPromises()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('')
    })

    test('clear with name works', async () => {
      form.value.setErrors([
        { id: 'emailInput', name: 'email', message: 'this is an error' },
        { id: 'passwordInput', name: 'password', message: 'this is another error' }
      ])

      form.value.clear('email')

      expect(form.value.errors).toMatchObject([
        { id: 'passwordInput', name: 'password', message: 'this is another error' }
      ])

      await nextTick()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('this is another error')
    })

    // @todo test this
    // test('clear with regex works', async () => {
    //   form.value.setErrors([
    //     { id: 'emailInput', name: 'email', message: 'this is an error' },
    //     { id: 'passwordInput', name: 'password', message: 'this is another error' }
    //   ])
    //
    //   form.value.clear(/email/)
    //
    //   expect(form.value.errors).toMatchObject([
    //     { id: 'passwordInput', name: 'password', message: 'this is another error' }
    //   ])
    //
    //   await nextTick()
    //
    //   const emailField = wrapper.find('#emailField')
    //   expect(emailField.text()).toBe('')
    //
    //   const passwordField = wrapper.find('#passwordField')
    //   expect(passwordField.text()).toBe('this is another error')
    // })

    test('submit error works', async () => {
      await form.value.submit()

      expect(form.value.errors).toMatchObject([
        { id: 'emailInput', name: 'email', message: 'Invalid input: expected string, received undefined' },
        { id: 'passwordInput', name: 'password', message: 'Invalid input: expected string, received undefined' }
      ])

      expect(wrapper.setupState.onSubmit).not.toHaveBeenCalled()
      expect(wrapper.setupState.onError).toHaveBeenCalledTimes(1)
      expect(wrapper.setupState.onError).toHaveBeenCalledWith(expect.objectContaining({
        errors: [
          { id: 'emailInput', name: 'email', message: 'Invalid input: expected string, received undefined' },
          { id: 'passwordInput', name: 'password', message: 'Invalid input: expected string, received undefined' }
        ]
      }))

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('Invalid input: expected string, received undefined')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('Invalid input: expected string, received undefined')
    })

    test('validate on submit works', async () => {
      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'

      await form.value.submit()

      expect(wrapper.setupState.onSubmit).toHaveBeenCalledTimes(1)
      expect(wrapper.setupState.onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        type: 'submit',
        data: {
          email: 'bob@dylan.com',
          password: 'strongpassword'
        }
      }))

      expect(wrapper.setupState.onError).toHaveBeenCalledTimes(0)
    })

    test('validate works', async () => {
      await expect(form.value.validate).rejects.toThrow('Form validation exception')

      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'

      expect(await form.value.validate()).toMatchObject({
        email: 'bob@dylan.com',
        password: 'strongpassword'
      })
    })

    test('getErrors works', async () => {
      await form.value.submit()
      const errors = form.value.getErrors()

      expect(errors).toMatchObject([
        { id: 'emailInput', name: 'email', message: 'Invalid input: expected string, received undefined' },
        { id: 'passwordInput', name: 'password', message: 'Invalid input: expected string, received undefined' }
      ])
    })

    // @test this
    // test('getErrors with regex works', async () => {
    //   await form.value.submit()
    //   const errors = form.value.getErrors(/email/)
    //
    //   expect(errors).toMatchObject([
    //     { id: 'emailInput', name: 'email', message: 'Invalid input: expected string, received undefined' }
    //   ])
    // })

    test('touchedFields works', async () => {
      const emailInput = wrapper.find('#emailInput')

      emailInput.trigger('focus')
      await flushPromises()

      expect(form.value.touchedFields.has('email')).toBe(true)
      expect(form.value.touchedFields.has('password')).toBe(false)
    })

    test('touchedFields works', async () => {
      const emailInput = wrapper.find('#emailInput')

      emailInput.trigger('change')
      await flushPromises()

      expect(form.value.dirtyFields.has('email')).toBe(true)
      expect(form.value.touchedFields.has('email')).toBe(true)

      expect(form.value.dirtyFields.has('password')).toBe(false)
      expect(form.value.touchedFields.has('password')).toBe(false)
    })

    test('blurredFields works', async () => {
      const emailInput = wrapper.find('#emailInput')

      emailInput.trigger('blur')
      await flushPromises()

      expect(form.value.blurredFields.has('email')).toBe(true)
      expect(form.value.blurredFields.has('password')).toBe(false)
    })

    test('reactivity: touchedFields works on focus', async () => {
      const emailInput = wrapper.find('#emailInput')

      const mockWatchCallback = vi.fn()
      watch(() => form.value.touchedFields, mockWatchCallback, { deep: true })

      emailInput.trigger('focus')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalledTimes(1)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('email')).toBe(true)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('password')).toBe(false)
    })

    test('reactivity: touchedFields works on change', async () => {
      const emailInput = wrapper.find('#emailInput')

      const mockWatchCallback = vi.fn()
      watch(() => form.value.touchedFields, mockWatchCallback, { deep: true })

      emailInput.trigger('change')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalledTimes(1)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('email')).toBe(true)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('password')).toBe(false)
    })

    test('reactivity: blurredFields works', async () => {
      const emailInput = wrapper.find('#emailInput')

      const mockWatchCallback = vi.fn()
      watch(() => form.value.blurredFields, mockWatchCallback, { deep: true })

      emailInput.trigger('blur')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalledTimes(1)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('email')).toBe(true)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('password')).toBe(false)
    })

    test('reactivity: dirtyFields works', async () => {
      const emailInput = wrapper.find('#emailInput')
      const mockWatchCallback = vi.fn()
      watch(() => form.value.dirtyFields, mockWatchCallback, { deep: true })

      emailInput.trigger('change')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalledTimes(1)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('email')).toBe(true)
      expect(mockWatchCallback.mock?.calls[0]?.[0]?.has('password')).toBe(false)
    })

    test('reactivity: dirty works', async () => {
      const emailInput = wrapper.find('#emailInput')
      expect(form.value.dirty).toBe(false)

      emailInput.trigger('change')
      await flushPromises()

      expect(form.value.dirty).toBe(true)
    })
  })

  describe('nested', async () => {
    let wrapper: any
    let form: any
    let state: any

    beforeEach(async () => {
      wrapper = await mountSuspended({
        components: {
          B24FormField,
          B24Form,
          B24Input
        },
        setup() {
          const form = ref()
          const state = reactive({ nested: {} })
          const schema = z.object({
            email: z.string().email(),
            password: z.string().min(8)
          })

          const showNested = ref(true)
          const nestedSchema = z.object({
            field: z.string().min(1)
          })

          const onError = vi.fn()
          const onSubmit = vi.fn()

          return { state, schema, nestedSchema, form, onSubmit, onError, showNested }
        },
        template: `
          <B24Form ref="form" :state="state" :schema="schema" @submit="onSubmit" @error="onError">
            <B24FormField id="emailField" name="email">
              <B24Input id="emailInput" v-model="state.email" />
            </B24FormField>
            <B24FormField id="passwordField" name="password">
              <B24Input id="passwordInput" v-model="state.password" />
            </B24FormField>

            <B24Form v-if="showNested" ref="nestedForm" :state="state.nested" :schema="nestedSchema">
              <B24FormField id="nestedField" name="field">
                <B24Input id="nestedInput" v-model="state.nested.field" />
              </B24FormField>
            </B24Form>
          </B24Form>
        `
      })
      form = wrapper.setupState.form
      state = wrapper.setupState.state
    })

    test('submit error works', async () => {
      await form.value.submit()

      expect(wrapper.setupState.onSubmit).not.toHaveBeenCalled()
      expect(wrapper.setupState.onError).toHaveBeenCalledTimes(1)
      const onErrorCallArgs = wrapper.setupState.onError.mock.lastCall[0]
      expect(onErrorCallArgs.children[0].errors).toMatchObject([{ id: 'nestedInput', name: 'field', message: 'Invalid input: expected string, received undefined' }])
      expect(onErrorCallArgs.errors).toMatchObject([
        { id: 'emailInput', name: 'email', message: 'Invalid input: expected string, received undefined' },
        { id: 'passwordInput', name: 'password', message: 'Invalid input: expected string, received undefined' }
      ])

      const nestedField = wrapper.find('#nestedField')
      expect(nestedField.text()).toBe('Invalid input: expected string, received undefined')
    })

    test('submit event contains nested attributes', async () => {
      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'
      state.nested.field = 'nested'

      await form.value.submit()
      expect(wrapper.setupState.onSubmit).toHaveBeenCalledWith(expect.objectContaining({ data: { email: 'bob@dylan.com', password: 'strongpassword', nested: { field: 'nested' } } }))
    })

    test('submit works when child is disabled', async () => {
      await form.value.submit()
      expect(wrapper.setupState.onError).toHaveBeenCalledTimes(1)
      vi.resetAllMocks()

      wrapper.setupState.showNested.value = false
      await nextTick()

      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'

      await form.value.submit()
      expect(wrapper.setupState.onSubmit).toHaveBeenCalledTimes(1)
      expect(wrapper.setupState.onError).toHaveBeenCalledTimes(0)
    })
  })

  describe('apply transform', async () => {
    it.each([
      [
        'zod',
        z.object({
          value: z.string().transform(value => value.toUpperCase())
        }),
        { value: 'test' },
        { value: 'TEST' }
      ],
      [
        'yup',
        yup.object({
          value: yup.string().transform(value => value.toUpperCase())
        }),
        { value: 'test' },
        { value: 'TEST' }
      ],
      [
        'joi',
        Joi.object({
          value: Joi.string().custom(value => value.toUpperCase())
        }),
        { value: 'test' },
        { value: 'TEST' }
      ],
      [
        'valibot',
        valibot.object({
          value: valibot.pipe(valibot.string(), valibot.transform(v => v.toUpperCase()))
        }),
        { value: 'test' },
        { value: 'TEST' }
      ]
    ])(
      '%s schema transform works',
      async (_name: string, schema: any, input: any, expected: any) => {
        const wrapper = await mountSuspended({
          components: {
            B24FormField,
            B24Form,
            B24Input
          },
          setup() {
            const form = ref()
            const state = reactive({})
            const onSubmit = vi.fn()
            return { state, schema, form, onSubmit }
          },
          template: `
          <B24Form ref="form" :state="state" :schema="schema" @submit="onSubmit">
            <B24FormField name="value">
              <B24Input id="input" v-model="state.value" />
            </B24FormField>
          </B24Form>
        `
        })
        const form = wrapper.setupState.form

        const inputEl = wrapper.find('#input')
        inputEl.setValue(input.value)

        form.value.submit()
        await flushPromises()

        expect(wrapper.setupState.onSubmit).toHaveBeenCalledWith(expect.objectContaining({
          data: expected
        }))
      }
    )
  })

  test('form field errorPattern works', async () => {
    const wrapper = await mountSuspended({
      components: {
        B24FormField,
        B24Form,
        B24Input
      },
      setup() {
        const form = ref()
        const state = reactive({})
        function validate() {
          return [{ name: 'email.1', message: 'Error message' }]
        }
        return { state, validate, form }
      },
      template: `
          <B24Form ref="form" :state="state" :validate="validate">
            <B24FormField id="emailField" :error-pattern="/(email)\\..*/">
              <B24Input id="emailInput" v-model="state.email" />
            </B24FormField>
          </B24Form>
        `
    })

    const form = wrapper.setupState.form
    form.value.submit()
    await flushPromises()
    expect(wrapper.html()).toContain('Error message')
  })
})
