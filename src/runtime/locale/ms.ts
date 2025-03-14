import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Bahasa Melayu',
  code: 'ms',
  locale: 'ms',
  messages: {
    inputMenu: {
      noMatch: 'Tiada data yang sepadan',
      noData: 'Tiada data',
      create: 'Cipta "{label}"'
    },
    calendar: {
      prevYear: 'Tahun sebelumnya',
      nextYear: 'Tahun seterusnya',
      prevMonth: 'Bulan sebelumnya',
      nextMonth: 'Bulan seterusnya'
    },
    inputNumber: {
      increment: 'Tambah',
      decrement: 'Kurang'
    },
    commandPalette: {
      placeholder: 'Taip arahan atau cari...',
      noMatch: 'Tiada data yang sepadan',
      noData: 'Tiada data',
      close: 'Tutup'
    },
    selectMenu: {
      noMatch: 'Tiada data yang sepadan',
      noData: 'Tiada data',
      create: 'Cipta "{label}"',
      search: 'Cari...'
    },
    toast: {
      close: 'Tutup'
    },
    carousel: {
      prev: 'Sebelum',
      next: 'Seterusnya',
      goto: 'Pergi ke slaid {slide}'
    },
    modal: {
      close: 'Tutup'
    },
    slideover: {
      close: 'Tutup'
    },
    alert: {
      close: 'Tutup'
    },
    table: {
      noData: 'Tiada data'
    }
  }
})
