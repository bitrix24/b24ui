import type { Messages } from '../types/locale'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'ภาษาไทย',
  code: 'th',
  locale: 'th',
  messages: {
    alert: {
      close: 'ปิด'
    },
    authForm: {
      hidePassword: 'ซ่อนรหัสผ่าน',
      showPassword: 'แสดงรหัสผ่าน',
      submit: 'ดำเนินการต่อ'
    },
    banner: {
      close: 'ปิด'
    },
    calendar: {
      nextMonth: 'เดือนถัดไป',
      nextYear: 'ปีถัดไป',
      prevMonth: 'เดือนก่อนหน้า',
      prevYear: 'ปีก่อนหน้า'
    },
    carousel: {
      dots: 'เลือกสไลด์ที่จะแสดง',
      goto: 'ไปที่{slide}',
      next: 'ถัดไป',
      prev: 'ก่อนหน้า'
    },
    chatPrompt: {
      placeholder: 'พิมพ์ข้อความของคุณที่นี่…'
    },
    chatPromptSubmit: {
      label: 'ส่ง'
    },
    colorMode: {
      dark: 'มืด',
      light: 'สว่าง',
      switchToDark: 'เปลี่ยนเป็นโหมดมืด',
      switchToLight: 'เปลี่ยนเป็นโหมดสว่าง',
      system: 'ระบบ'
    },
    commandPalette: {
      back: 'กลับ',
      close: 'ปิด',
      noData: 'ไม่มีข้อมูล',
      noMatch: 'ไม่พบรายการที่ตรงกัน',
      placeholder: 'ป้อนคำสั่งหรือค้นหา…'
    },
    contentSearch: {
      links: 'ผลลัพธ์',
      search: 'ผลลัพธ์',
      theme: 'ธีม'
    },
    contentSearchButton: {
      label: 'ค้นหา…'
    },
    contentToc: {
      title: 'ในหน้านี้'
    },
    dropdownMenu: {
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน',
      search: 'ค้นหา…'
    },
    dashboardSearch: {
      theme: 'ธีม'
    },
    dashboardSearchButton: {
      label: 'ค้นหา…'
    },
    dashboardSidebarCollapse: {
      collapse: 'ย่อแถบด้านข้าง',
      expand: 'ขยายแถบด้านข้าง'
    },
    dashboardSidebarToggle: {
      close: 'ปิดแถบด้านข้าง',
      open: 'เปิดแถบด้านข้าง'
    },
    error: {
      clear: 'ลองอีกครั้ง'
    },
    fileUpload: {
      removeFile: 'ลบ{filename}'
    },
    header: {
      close: 'ปิดเมนู',
      open: 'เปิดเมนู'
    },
    inputMenu: {
      create: 'สร้าง"{label}"',
      noData: 'ไม่มีข้อมูล',
      noMatch: 'ไม่พบรายการที่ตรงกัน'
    },
    inputNumber: {
      decrement: 'ลดลง',
      increment: 'เพิ่มขึ้น'
    },
    listbox: {
      noData: 'ไม่มีข้อมูล',
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน',
      search: 'ค้นหา…'
    },
    modal: {
      close: 'ปิด'
    },
    pricingTable: {
      caption: 'เปรียบเทียบแผนราคา'
    },
    prose: {
      codeCollapse: {
        closeText: 'ซ่อน',
        name: 'โค้ด',
        openText: 'แสดง'
      },
      collapsible: {
        closeText: 'ซ่อน',
        name: 'คุณสมบัติ',
        openText: 'แสดง'
      },
      pre: {
        copy: 'คัดลอกโค้ดไปยังคลิปบอร์ด'
      },
      prompt: {
        copy: 'คัดลอกพรอมต์',
        openIn: 'เปิดใน{name}'
      }
    },
    chatReasoning: {
      thinking: 'กำลังคิด…',
      thought: 'คิดแล้ว',
      thoughtFor: 'ใช้เวลาคิด{duration}'
    },
    sidebar: {
      close: 'ปิด',
      toggle: 'สลับ'
    },
    selectMenu: {
      create: 'สร้าง"{label}"',
      noData: 'ไม่มีข้อมูล',
      noMatch: 'ไม่พบรายการที่ตรงกัน',
      search: 'ค้นหา…'
    },
    slideover: {
      close: 'ปิด'
    },
    table: {
      noData: 'ไม่มีข้อมูล'
    },
    toast: {
      close: 'ปิด'
    },
    sidebarLayout: {
      open: 'เปิดการนำทาง',
      close: 'ปิดการนำทาง',
      slideoverTitle: 'การนำทาง',
      slideoverDescription: 'การนำทางเนื้อหา'
    }
  }
})
