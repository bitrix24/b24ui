import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Bahasa Melayu',
  code: 'ms',
  locale: 'ms',
  messages: {
    alert: {
      close: 'Tutup'
    },
    authForm: {
      hidePassword: 'Sembunyi kata laluan',
      showPassword: 'Tunjukkan kata laluan',
      submit: 'Teruskan'
    },
    banner: {
      close: 'Tutup'
    },
    calendar: {
      nextMonth: 'Bulan depan',
      nextYear: 'Tahun depan',
      prevMonth: 'Bulan lepas',
      prevYear: 'Tahun lepas'
    },
    carousel: {
      dots: 'Pilih slaid untuk dipaparkan',
      goto: 'Pergi ke {slide}',
      next: 'Seterusnya',
      prev: 'Sebelumnya'
    },
    chatPrompt: {
      placeholder: 'Taip mesej anda di sini...'
    },
    chatPromptSubmit: {
      label: 'Hantar'
    },
    colorMode: {
      dark: 'Gelap',
      light: 'Terang',
      switchToDark: 'Tukar kepada mod gelap',
      switchToLight: 'Tukar kepada mod terang',
      system: 'Sistem'
    },
    commandPalette: {
      back: 'Kembali',
      close: 'Tutup',
      noData: 'Tiada data',
      noMatch: 'Tiada padanan ditemui',
      placeholder: 'Taip arahan atau cari...'
    },
    contentSearch: {
      links: 'Hasil',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Cari...'
    },
    contentToc: {
      title: 'Pada halaman ini'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Cari...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Runtuhkan bar sisi',
      expand: 'Kembangkan bar sisi'
    },
    dashboardSidebarToggle: {
      close: 'Tutup bar sisi',
      open: 'Buka bar sisi'
    },
    error: {
      clear: 'Cuba lagi'
    },
    fileUpload: {
      removeFile: 'Buang {filename}'
    },
    header: {
      close: 'Tutup menu',
      open: 'Buka menu'
    },
    inputMenu: {
      create: 'Cipta "{label}"',
      noData: 'Tiada data',
      noMatch: 'Tiada padanan ditemui'
    },
    inputNumber: {
      decrement: 'Kurangkan',
      increment: 'Tambah'
    },
    modal: {
      close: 'Tutup'
    },
    pricingTable: {
      caption: 'Perbandingan rancangan harga'
    },
    prose: {
      codeCollapse: {
        closeText: 'Sembunyi',
        name: 'kod',
        openText: 'Tunjukkan'
      },
      collapsible: {
        closeText: 'Sembunyi',
        name: 'ciri-ciri',
        openText: 'Tunjukkan'
      },
      pre: {
        copy: 'Salin'
      }
    },
    selectMenu: {
      create: 'Cipta "{label}"',
      noData: 'Tiada data',
      noMatch: 'Tiada padanan ditemui',
      search: 'Cari...'
    },
    slideover: {
      close: 'Tutup'
    },
    table: {
      noData: 'Tiada data'
    },
    toast: {
      close: 'Tutup'
    },
    sidebarLayout: {
      open: 'Buka navigasi',
      close: 'Tutup navigasi',
      slideoverTitle: 'Navigasi',
      slideoverDescription: 'Navigasi kandungan'
    }
  }
})
