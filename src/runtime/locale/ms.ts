import type { Messages } from '../types/locale'
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
      showPassword: 'Tunjuk kata laluan',
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
      placeholder: 'Taip mesej anda di sini…'
    },
    chatPromptSubmit: {
      label: 'Hantar'
    },
    colorMode: {
      dark: 'Gelap',
      light: 'Terang',
      switchToDark: 'Tukar ke mod gelap',
      switchToLight: 'Tukar ke mod terang',
      system: 'Sistem'
    },
    commandPalette: {
      back: 'Kembali',
      close: 'Tutup',
      noData: 'Tiada data',
      noMatch: 'Tiada padanan ditemui',
      placeholder: 'Masukkan arahan atau cari…'
    },
    contentSearch: {
      links: 'Keputusan',
      search: 'Keputusan',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Cari…'
    },
    contentToc: {
      title: 'Di halaman ini'
    },
    dropdownMenu: {
      noMatch: 'Tiada data yang sepadan',
      search: 'Cari…'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Cari…'
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
      increment: 'Tambahkan'
    },
    listbox: {
      noData: 'Tiada data',
      noMatch: 'Tiada data yang sepadan',
      search: 'Cari…'
    },
    modal: {
      close: 'Tutup'
    },
    drawer: {
      close: 'Tutup'
    },
    pricingTable: {
      caption: 'Perbandingan pelan harga'
    },
    prose: {
      codeCollapse: {
        closeText: 'Sembunyi',
        name: 'kod',
        openText: 'Tunjuk'
      },
      collapsible: {
        closeText: 'Sembunyi',
        name: 'sifat',
        openText: 'Tunjuk'
      },
      pre: {
        copy: 'Salin kod ke papan klip'
      },
      prompt: {
        copy: 'Salin arahan',
        openIn: 'Buka dalam {name}'
      }
    },
    chatReasoning: {
      thinking: 'Berfikir…',
      thought: 'Selesai berfikir',
      thoughtFor: 'Berfikir selama {duration}'
    },
    sidebar: {
      close: 'Tutup',
      toggle: 'Togol'
    },
    selectMenu: {
      create: 'Cipta "{label}"',
      noData: 'Tiada data',
      noMatch: 'Tiada padanan ditemui',
      search: 'Cari…'
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
