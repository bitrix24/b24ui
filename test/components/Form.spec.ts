import { nextTick, watch } from 'vue'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import * as z from 'zod'
import * as yup from 'yup'
import Joi from 'joi'
import * as valibot from 'valibot'
import { object, string, nonempty, refine } from 'superstruct'
import ComponentRender from '../component-render'
import type { FormProps, FormSlots } from '../../src/runtime/components/Form.vue'
import { renderForm } from '../utils/form'
import { B24Form } from '#components'
import { flushPromises } from '@vue/test-utils'

describe('Form', () => {
  it.each([
    ['with state', { props: { state: {} } }],
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
        const errs = []
        if (!state.email)
          // @ts-expect-error Not test parameter of type never
          errs.push({ name: 'email', message: 'Email is required' })
        if (state.password?.length < 8)
          // @ts-expect-error Not test parameter of type never
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
      fixture: 'FormBasic',
      props: { ...options, onSubmit }
    })

    const form = wrapper.find('form')
    const email = wrapper.find('#email')
    const password = wrapper.find('#password')

    await email.setValue('bob@dylan.com')
    await password.setValue('short')

    await form.trigger('submit.prevent')
    await flushPromises()

    const formComponent = wrapper.findComponent({ name: 'Form' })
    // @ts-expect-error object is possibly undefined
    expect(formComponent.emitted('error')[0][0].errors).toMatchObject([
      {
        id: 'password',
        name: 'password',
        message: 'Must be at least 8 characters'
      }
    ])

    expect(wrapper.html()).toMatchSnapshot('with error')

    await password.setValue('validpassword')
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

    const onSubmit = vi.fn()
    const onError = vi.fn()

    beforeEach(async () => {
      vi.clearAllMocks()
      wrapper = await renderForm({
        fixture: 'FormBasic',
        props: {
          schema: z.object({
            email: z.email(),
            password: z.string().min(8)
          }),
          onSubmit,
          onError
        }
      })
      form = wrapper.setupState.form.value
      state = wrapper.setupState.state
    })

    it('setErrors works', async () => {
      form.setErrors([{
        name: 'email',
        message: 'this is an error'
      }])

      expect(form.errors).toMatchObject([{
        id: 'email',
        name: 'email',
        message: 'this is an error'
      }])

      await nextTick()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('this is an error')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('')
    })

    it('setErrors with regex works', async () => {
      form.setErrors([{ id: 'email', name: 'email', message: 'this is an error' }])

      expect(form.errors).toMatchObject([{ id: 'email', name: 'email', message: 'this is an error' }])

      form.setErrors([{ id: 'password', name: 'password', message: 'this is another error' }], /email/)
      expect(form.errors).toMatchObject([{ id: 'password', name: 'password', message: 'this is another error' }])

      await nextTick()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('this is another error')
    })

    it('clear works', async () => {
      form.setErrors([{
        id: 'email',
        name: 'email',
        message: 'this is an error'
      }])

      form.clear()

      expect(form.errors).toMatchObject([])

      await flushPromises()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('')
    })

    it('clear with name works', async () => {
      form.setErrors([
        { id: 'email', name: 'email', message: 'this is an error' },
        { id: 'password', name: 'password', message: 'this is another error' }
      ])

      form.clear('email')

      expect(form.errors).toMatchObject([
        { id: 'password', name: 'password', message: 'this is another error' }
      ])

      await nextTick()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('this is another error')
    })

    it('clear with regex works', async () => {
      form.setErrors([
        { id: 'email', name: 'email', message: 'this is an error' },
        { id: 'password', name: 'password', message: 'this is another error' }
      ])

      form.clear(/email/)

      expect(form.errors).toMatchObject([
        { id: 'password', name: 'password', message: 'this is another error' }
      ])

      await nextTick()

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('this is another error')
    })

    it('submit error works', async () => {
      await form.submit()

      expect(form.errors).toMatchObject([
        { id: 'email', name: 'email', message: 'Invalid input: expected string, received undefined' },
        { id: 'password', name: 'password', message: 'Invalid input: expected string, received undefined' }
      ])

      expect(onSubmit).not.toHaveBeenCalled()
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(expect.objectContaining({
        errors: [
          { id: 'email', name: 'email', message: 'Invalid input: expected string, received undefined' },
          { id: 'password', name: 'password', message: 'Invalid input: expected string, received undefined' }
        ]
      }))

      const emailField = wrapper.find('#emailField')
      expect(emailField.text()).toBe('Invalid input: expected string, received undefined')

      const passwordField = wrapper.find('#passwordField')
      expect(passwordField.text()).toBe('Invalid input: expected string, received undefined')
    })

    it('validate on submit works', async () => {
      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'

      await form.submit()

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        type: 'submit',
        data: {
          email: 'bob@dylan.com',
          password: 'strongpassword'
        }
      }))

      expect(onError).toHaveBeenCalledTimes(0)
    })

    it('validate works', async () => {
      await expect(form.validate).rejects.toThrow('Form validation exception')

      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'

      expect(await form.validate()).toMatchObject({
        email: 'bob@dylan.com',
        password: 'strongpassword'
      })
    })

    it('getErrors works', async () => {
      await form.submit()
      const errors = form.getErrors()

      expect(errors).toMatchObject([
        { id: 'email', name: 'email', message: 'Invalid input: expected string, received undefined' },
        { id: 'password', name: 'password', message: 'Invalid input: expected string, received undefined' }
      ])
    })

    it('getErrors with regex works', async () => {
      await form.submit()
      const errors = form.getErrors(/email/)

      expect(errors).toMatchObject([
        { id: 'email', name: 'email', message: 'Invalid input: expected string, received undefined' }
      ])
    })

    it('touchedFields works', async () => {
      const email = wrapper.find('#email')

      email.trigger('focus')
      await flushPromises()

      expect(form.touchedFields.has('email')).toBe(true)
      expect(form.touchedFields.has('password')).toBe(false)
    })

    it('touchedFields works', async () => {
      const email = wrapper.find('#email')

      email.trigger('change')
      await flushPromises()

      expect(form.dirtyFields.has('email')).toBe(true)
      expect(form.touchedFields.has('email')).toBe(true)

      expect(form.dirtyFields.has('password')).toBe(false)
      expect(form.touchedFields.has('password')).toBe(false)
    })

    it('blurredFields works', async () => {
      const email = wrapper.find('#email')

      email.trigger('blur')
      await flushPromises()

      expect(form.blurredFields.has('email')).toBe(true)
      expect(form.blurredFields.has('password')).toBe(false)
    })

    it('reactivity: touchedFields works on focus', async () => {
      const email = wrapper.find('#email')

      const mockWatchCallback = vi.fn()
      watch(() => form.touchedFields, mockWatchCallback, { deep: true })

      email.trigger('focus')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalled()
    })

    it('reactivity: touchedFields works on change', async () => {
      const email = wrapper.find('#email')

      const mockWatchCallback = vi.fn()
      watch(() => form.touchedFields, mockWatchCallback, { deep: true })

      email.trigger('change')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalled()
    })

    it('reactivity: blurredFields works', async () => {
      const email = wrapper.find('#email')

      const mockWatchCallback = vi.fn()
      watch(() => form.blurredFields, mockWatchCallback, { deep: true })

      email.trigger('blur')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalled()
    })

    it('reactivity: dirtyFields works', async () => {
      const email = wrapper.find('#email')
      const mockWatchCallback = vi.fn()
      watch(() => form.dirtyFields, mockWatchCallback, { deep: true })

      email.trigger('change')
      await flushPromises()
      expect(mockWatchCallback).toHaveBeenCalled()
    })

    it('reactivity: dirty works', async () => {
      const email = wrapper.find('#email')
      expect(form.dirty).toBe(false)

      email.trigger('change')
      await flushPromises()

      expect(form.dirty).toBe(true)
    })
  })

  describe('nested', async () => {
    let wrapper: any
    let form: any
    let state: any

    const onSubmit = vi.fn()
    const onError = vi.fn()

    beforeEach(async () => {
      vi.clearAllMocks()
      wrapper = await renderForm({
        fixture: 'FormNested',
        props: {
          onSubmit,
          onError
        }
      })
      form = wrapper.setupState.form.value
      state = wrapper.setupState.state
    })

    it('submit error works', async () => {
      await form.submit()

      expect(onSubmit).not.toHaveBeenCalled()
      expect(onError).toHaveBeenCalledTimes(1)
      const onErrorCallArgs = onError.mock.lastCall?.[0]
      expect(onErrorCallArgs.errors).toMatchObject([
        { id: 'email', name: 'email', message: 'Invalid input: expected string, received undefined' },
        { id: 'password', name: 'password', message: 'Invalid input: expected string, received undefined' },
        { id: 'nested', name: 'nested.field', message: 'Invalid input: expected string, received undefined' }
      ])

      const nestedField = wrapper.find('#nestedField')
      expect(nestedField.text()).toBe('Invalid input: expected string, received undefined')
    })

    it('submit event contains nested attributes', async () => {
      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'
      state.nested.field = 'nested'

      await form.submit()
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ data: { email: 'bob@dylan.com', password: 'strongpassword', nested: { field: 'nested' } } }))
    })

    it('submit works when child is disabled', async () => {
      await form.submit()
      expect(onError).toHaveBeenCalledTimes(1)
      vi.resetAllMocks()

      wrapper.setupState.showNested.value = false
      await nextTick()

      state.email = 'bob@dylan.com'
      state.password = 'strongpassword'

      await form.submit()
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledTimes(0)
    })
  })
  describe('nested API operations', async () => {
    let wrapper: any
    let form: any

    const onSubmit = vi.fn()
    const onError = vi.fn()

    beforeEach(async () => {
      vi.clearAllMocks()
      wrapper = await renderForm({ fixture: 'FormNested', props: { onSubmit, onError } })
      form = wrapper.setupState.form.value
    })

    it('getErrors returns nested errors', async () => {
      await form.submit()
      const errors = form.getErrors()
      expect(errors).toMatchObject([
        { id: 'email', name: 'email' },
        { id: 'password', name: 'password' },
        { id: 'nested', name: 'nested.field' }
      ])
    })

    it('getErrors works with nested paths', async () => {
      await form.submit()
      const nestedErrors = form.getErrors(/nested\./)
      expect(nestedErrors).toMatchObject([
        { id: 'nested', name: 'nested.field' }
      ])
    })

    it('clear with nested forms works', async () => {
      await form.submit()
      form.clear()
      expect(form.errors).toMatchObject({})
    })

    it('setErrors works with nested paths', async () => {
      form.setErrors([
        { name: 'nested.field', message: 'Nested error' }
      ])
      expect(form.errors).toMatchObject([
        { id: 'nested', name: 'nested.field', message: 'Nested error' }
      ])
      await flushPromises()
      expect(wrapper.html()).toContain('Nested error')
    })

    it('clear with nested forms works on root path', async () => {
      await form.submit()
      form.clear('password')
      expect(form.errors).toMatchObject([
        { id: 'email', name: 'email' },
        { id: 'nested', name: 'nested.field' }
      ])
    })

    it('clear works with nested paths', async () => {
      await form.submit()
      form.clear('nested.field')

      expect(form.errors).toMatchObject([
        { id: 'email', name: 'email' },
        { id: 'password', name: 'password' }
      ])
    })

    it('clear works on nested form name', async () => {
      await form.submit()
      form.clear('nested')
      expect(form.errors).toMatchObject([
        { id: 'email', name: 'email' },
        { id: 'password', name: 'password' }
      ])
    })

    it('clear works with nested regex patterns', async () => {
      await form.submit()
      form.clear(/nested.*/)
      expect(form.errors).toMatchObject([
        { id: 'email', name: 'email' },
        { id: 'password', name: 'password' }
      ])
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
        const onSubmit = vi.fn()
        const wrapper = await renderForm({
          fixture: 'FormTransform',
          props: {
            schema,
            onSubmit
          }
        })
        const form = wrapper.setupState.form.value
        const inputEl = wrapper.find('#input')
        inputEl.setValue(input.value)

        form.submit()
        await flushPromises()

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
          data: expected
        }))
      }
    )
  })

  it('form field errorPattern works', async () => {
    const wrapper = await renderForm({ fixture: 'FormErrorPattern' })
    const form = wrapper.setupState.form.value
    form.submit()
    await flushPromises()
    expect(wrapper.html()).toContain('Error message')
  })

  it('works with empty fields', async () => {
    const wrapper = await renderForm({ fixture: 'FormEmptyFields' })
    const form = wrapper.setupState.form.value
    form.setErrors([
      { name: 'field1', message: 'Error on field1' },
      { name: 'field2', message: 'Error on field2' },
      { message: 'General error' }
    ])
    await nextTick()
    await flushPromises()

    expect(wrapper.html()).toContain('Error on field1')
    expect(wrapper.html()).toContain('Error on field2')
    expect(wrapper.html()).toContain('General error')
  })
})
