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
      goto: 'Đi đến {slide}',
      next: 'Tiếp',
      prev: 'Trước'
    },
    chatPrompt: {
      placeholder: 'Nhập tin nhắn của bạn tại đây…'
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
      noMatch: 'Không tìm thấy kết quả',
      placeholder: 'Nhập lệnh hoặc tìm kiếm…'
    },
    dateTimePicker: {
      backToDate: 'Quay lại ngày',
      openPicker: 'Mở bộ chọn',
      hours: 'Giờ',
      minutes: 'Phút',
      presets: {
        today: 'Hôm nay',
        tomorrow: 'Ngày mai',
        endOfWeek: 'Cuối tuần',
        inAWeek: 'Một tuần sau',
        endOfMonth: 'Cuối tháng'
      }
    },
    contentSearch: {
      links: 'Kết quả',
      search: 'Kết quả',
      theme: 'Chủ đề'
    },
    contentSearchButton: {
      label: 'Tìm kiếm…'
    },
    contentToc: {
      title: 'Trong trang này'
    },
    dropdownMenu: {
      noMatch: 'Không có dữ liệu phù hợp',
      search: 'Tìm kiếm…'
    },
    dashboardSearch: {
      theme: 'Chủ đề'
    },
    dashboardSearchButton: {
      label: 'Tìm kiếm…'
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
      noMatch: 'Không tìm thấy kết quả'
    },
    inputNumber: {
      decrement: 'Giảm',
      increment: 'Tăng'
    },
    modal: {
      close: 'Đóng'
    },
    pricingTable: {
      caption: 'So sánh gói giá'
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
        copy: 'Sao chép mã vào bộ nhớ tạm'
      },
      prompt: {
        copy: 'Sao chép prompt',
        openIn: 'Mở trong {name}'
      }
    },
    chatReasoning: {
      thinking: 'Đang suy nghĩ…',
      thought: 'Đã suy nghĩ',
      thoughtFor: 'Đã suy nghĩ trong {duration}'
    },
    sidebar: {
      close: 'Đóng',
      toggle: 'Chuyển đổi'
    },
    selectMenu: {
      create: 'Tạo "{label}"',
      noData: 'Không có dữ liệu',
      noMatch: 'Không tìm thấy kết quả',
      search: 'Tìm kiếm…'
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
