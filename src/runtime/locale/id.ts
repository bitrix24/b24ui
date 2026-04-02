import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Bahasa Indonesia',
  code: 'id',
  locale: 'id',
  messages: {
    alert: {
      close: 'Tutup'
    },
    authForm: {
      hidePassword: 'Sembunyikan kata sandi',
      showPassword: 'Tampilkan kata sandi',
      submit: 'Lanjutkan'
    },
    banner: {
      close: 'Tutup'
    },
    calendar: {
      nextMonth: 'Bulan depan',
      nextYear: 'Tahun depan',
      prevMonth: 'Bulan sebelumnya',
      prevYear: 'Tahun sebelumnya'
    },
    carousel: {
      dots: 'Pilih slide untuk ditampilkan',
      goto: 'Pergi ke {slide}',
      next: 'Selanjutnya',
      prev: 'Sebelumnya'
    },
    chatPrompt: {
      placeholder: 'Masukkan pesan Anda di sini...'
    },
    chatPromptSubmit: {
      label: 'Kirim'
    },
    colorMode: {
      dark: 'Gelap',
      light: 'Terang',
      switchToDark: 'Beralih ke mode gelap',
      switchToLight: 'Beralih ke mode terang',
      system: 'Sistem'
    },
    commandPalette: {
      back: 'Kembali',
      close: 'Tutup',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ada hasil yang cocok',
      placeholder: 'Masukkan perintah atau cari...'
    },
    contentSearch: {
      links: 'Hasil',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Cari...'
    },
    contentToc: {
      title: 'Di halaman ini'
    },
    dropdownMenu: {
      noMatch: 'Tidak ada data yang cocok',
      search: 'Cari…'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Cari...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Ciutkan bilah sisi',
      expand: 'Bentangkan bilah sisi'
    },
    dashboardSidebarToggle: {
      close: 'Tutup bilah sisi',
      open: 'Buka bilah sisi'
    },
    error: {
      clear: 'Coba lagi'
    },
    fileUpload: {
      removeFile: 'Hapus {filename}'
    },
    header: {
      close: 'Tutup menu',
      open: 'Buka menu'
    },
    inputMenu: {
      create: 'Buat "{label}"',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ada hasil yang cocok'
    },
    inputNumber: {
      decrement: 'Kurangi',
      increment: 'Tambah'
    },
    modal: {
      close: 'Tutup'
    },
    pricingTable: {
      caption: 'Perbandingan paket harga'
    },
    prose: {
      codeCollapse: {
        closeText: 'Sembunyikan',
        name: 'kode',
        openText: 'Tampilkan'
      },
      collapsible: {
        closeText: 'Sembunyikan',
        name: 'properti',
        openText: 'Tampilkan'
      },
      pre: {
        copy: 'Salin'
      }
    },
    selectMenu: {
      create: 'Buat "{label}"',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ada hasil yang cocok',
      search: 'Cari...'
    },
    slideover: {
      close: 'Tutup'
    },
    table: {
      noData: 'Tidak ada data'
    },
    toast: {
      close: 'Tutup'
    },
    sidebarLayout: {
      open: 'Buka navigasi',
      close: 'Tutup navigasi',
      slideoverTitle: 'Navigasi',
      slideoverDescription: 'Navigasi konten'
    }
  }
})
