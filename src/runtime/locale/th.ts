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
      label: 'วันที่ของกิจกรรม',
      monthPicker: 'ตัวเลือกเดือน',
      nextMonth: 'เดือนถัดไป',
      nextYear: 'ปีถัดไป',
      prevMonth: 'เดือนก่อนหน้า',
      prevYear: 'ปีก่อนหน้า',
      yearPicker: 'ตัวเลือกปี'
    },
    carousel: {
      dots: 'เลือกสไลด์ที่จะแสดง',
      goto: 'ไปที่{slide}',
      next: 'ถัดไป',
      prev: 'ก่อนหน้า'
    },
    chatMessages: {
      autoScroll: 'เลื่อนลงล่างสุด'
    },
    chatPrompt: {
      placeholder: 'พิมพ์ข้อความของคุณที่นี่…'
    },
    chatPromptSubmit: {
      label: 'ส่ง',
      reload: 'ลองอีกครั้ง',
      stop: 'หยุดการสร้าง'
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
      placeholder: 'ป้อนคำสั่งหรือค้นหา…',
      results: 'ผลลัพธ์'
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
    dateTimePicker: {
      backToDate: 'กลับไปที่วันที่',
      openPicker: 'เปิดตัวเลือก',
      hours: 'ชั่วโมง',
      minutes: 'นาที',
      presets: {
        today: 'วันนี้',
        tomorrow: 'พรุ่งนี้',
        endOfWeek: 'สิ้นสุดสัปดาห์',
        inAWeek: 'ในหนึ่งสัปดาห์',
        endOfMonth: 'สิ้นเดือน'
      }
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
      noMatch: 'ไม่พบรายการที่ตรงกัน',
      trigger: 'แสดงตัวเลือก'
    },
    inputNumber: {
      decrement: 'ลดลง',
      increment: 'เพิ่มขึ้น',
      roledescription: 'ช่องตัวเลข'
    },
    listbox: {
      noData: 'ไม่มีข้อมูล',
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน',
      search: 'ค้นหา…'
    },
    modal: {
      close: 'ปิด'
    },
    drawer: {
      close: 'ปิด'
    },
    pagination: {
      first: 'หน้าแรก',
      last: 'หน้าสุดท้าย',
      next: 'หน้าต่อไป',
      page: 'หน้า {page}',
      prev: 'หน้าที่แล้ว'
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
    },
    breadcrumb: {
      label: 'เส้นทางนำทาง'
    },
    inputDate: {
      day: 'วัน',
      dayPeriod: 'ก่อนเที่ยง/หลังเที่ยง',
      era: 'สมัย',
      hour: 'ชั่วโมง',
      minute: 'นาที',
      month: 'เดือน',
      second: 'วินาที',
      timeZoneName: 'เขตเวลา',
      year: 'ปี'
    },
    inputRating: {
      rate: 'ให้คะแนน {value} จาก {length}'
    },
    inputTime: {
      dayPeriod: 'ก่อนเที่ยง/หลังเที่ยง',
      hour: 'ชั่วโมง',
      minute: 'นาที',
      second: 'วินาที',
      timeZoneName: 'เขตเวลา'
    },
    pinInput: {
      input: 'รหัส PIN ตัวที่ {index} จาก {length}'
    },
    skeleton: {
      label: 'กำลังโหลด'
    },
    range: {
      max: 'สูงสุด',
      min: 'ต่ำสุด',
      thumb: 'ตัวเลื่อน',
      value: 'ค่าที่ {index} จาก {total}'
    },
    stepper: {
      label: 'ความคืบหน้า'
    },
    toaster: {
      label: 'การแจ้งเตือน',
      viewport: 'การแจ้งเตือน ({hotkey})'
    }
  }
})
