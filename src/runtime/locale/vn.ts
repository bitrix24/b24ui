import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Tiếng Việt',
  code: 'vn',
  locale: 'vi',
  messages: {
    alert: {
      close: 'Đóng'
    },
    authForm: {
      hidePassword: 'Ẩn mật khẩu',
      showPassword: 'Hiện mật khẩu',
      submit: 'Tiếp tục'
    },
    banner: {
      close: 'Đóng'
    },
    calendar: {
      nextMonth: 'Tháng sau',
      nextYear: 'Năm sau',
      prevMonth: 'Tháng trước',
      prevYear: 'Năm trước'
    },
    carousel: {
      dots: 'Chọn slide để hiển thị',
      goto: 'Đi tới {slide}',
      next: 'Tiếp theo',
      prev: 'Quay lại'
    },
    chatPrompt: {
      placeholder: 'Nhập tin nhắn của bạn ở đây...'
    },
    chatPromptSubmit: {
      label: 'Gửi'
    },
    colorMode: {
      dark: 'Tối',
      light: 'Sáng',
      switchToDark: 'Chuyển sang chế độ tối',
      switchToLight: 'Chuyển sang chế độ sáng',
      system: 'Hệ thống'
    },
    commandPalette: {
      back: 'Quay lại',
      close: 'Đóng',
      noData: 'Không có dữ liệu',
      noMatch: 'Không tìm thấy kết quả phù hợp',
      placeholder: 'Nhập lệnh hoặc tìm kiếm...'
    },
    contentSearch: {
      links: 'Kết quả',
      theme: 'Chủ đề'
    },
    contentSearchButton: {
      label: 'Tìm kiếm...'
    },
    contentToc: {
      title: 'Trên trang này'
    },
    dashboardSearch: {
      theme: 'Chủ đề'
    },
    dashboardSearchButton: {
      label: 'Tìm kiếm...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Thu gọn thanh bên',
      expand: 'Mở rộng thanh bên'
    },
    dashboardSidebarToggle: {
      close: 'Đóng thanh bên',
      open: 'Mở thanh bên'
    },
    error: {
      clear: 'Thử lại'
    },
    fileUpload: {
      removeFile: 'Xóa {filename}'
    },
    header: {
      close: 'Đóng menu',
      open: 'Mở menu'
    },
    inputMenu: {
      create: 'Tạo "{label}"',
      noData: 'Không có dữ liệu',
      noMatch: 'Không tìm thấy kết quả phù hợp'
    },
    inputNumber: {
      decrement: 'Giảm',
      increment: 'Tăng'
    },
    modal: {
      close: 'Đóng'
    },
    pricingTable: {
      caption: 'So sánh các gói dịch vụ'
    },
    prose: {
      codeCollapse: {
        closeText: 'Ẩn',
        name: 'mã',
        openText: 'Hiện'
      },
      collapsible: {
        closeText: 'Ẩn',
        name: 'thuộc tính',
        openText: 'Hiện'
      },
      pre: {
        copy: 'Sao chép'
      }
    },
    selectMenu: {
      create: 'Tạo "{label}"',
      noData: 'Không có dữ liệu',
      noMatch: 'Không tìm thấy kết quả phù hợp',
      search: 'Tìm kiếm...'
    },
    slideover: {
      close: 'Đóng'
    },
    table: {
      noData: 'Không có dữ liệu'
    },
    toast: {
      close: 'Đóng'
    },
    sidebarLayout: {
      open: 'Mở điều hướng',
      close: 'Đóng điều hướng',
      slideoverTitle: 'Điều hướng',
      slideoverDescription: 'Điều hướng nội dung'
    }
  }
})
