import { defineCommand } from 'citty'
import component from './component.mjs'
import locale from './locale.mjs'

export default defineCommand({
  meta: {
    name: 'make',
    description: 'Commands to create new Bitrix24 UI entities.'
  },
  subCommands: {
    component,
    locale
  }
})
