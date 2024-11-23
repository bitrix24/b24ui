#!/usr/bin/env node
import { defineCommand, runMain } from 'citty'
import make from './commands/make/index.mjs'

const main = defineCommand({
  meta: {
    name: 'bitrix24-ui',
    description: 'Bitrix24 UI CLI'
  },
  subCommands: {
    make
  }
})

runMain(main)
